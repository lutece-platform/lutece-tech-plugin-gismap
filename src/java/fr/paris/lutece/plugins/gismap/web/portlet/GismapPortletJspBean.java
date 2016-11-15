/*
 * Copyright (c) 2002-2014, Mairie de Paris
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice
 *     and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice
 *     and the following disclaimer in the documentation and/or other materials
 *     provided with the distribution.
 *
 *  3. Neither the name of 'Mairie de Paris' nor 'Lutece' nor the names of its
 *     contributors may be used to endorse or promote products derived from
 *     this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * License 1.0
 */
package fr.paris.lutece.plugins.gismap.web.portlet;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.plugins.gismap.business.View;
import fr.paris.lutece.plugins.gismap.business.portlet.GismapPortlet;
import fr.paris.lutece.plugins.gismap.business.portlet.GismapPortletHome;
import fr.paris.lutece.plugins.gismap.utils.GismapUtils;
import fr.paris.lutece.plugins.gismap.web.GismapJspBean;
import fr.paris.lutece.portal.business.portlet.PortletHome;
import fr.paris.lutece.portal.service.message.AdminMessage;
import fr.paris.lutece.portal.service.message.AdminMessageService;
import fr.paris.lutece.portal.service.util.AppLogService;
import fr.paris.lutece.portal.web.portlet.PortletJspBean;
import fr.paris.lutece.util.ReferenceList;
import fr.paris.lutece.util.html.HtmlTemplate;

/**
 * This class provides the user interface to manage view Portlet
 */
public class GismapPortletJspBean extends PortletJspBean
{
    // //////////////////////////////////////////////////////////////////////////
    // Constants
    /**
     * Right to manage gismap
     */
    public static final String  RIGHT_MANAGE_GISMAP                 = GismapJspBean.RIGHT_MANAGE_GISMAP;

    private static final long   serialVersionUID                    = -2619049973871862337L;
    private static final String MARK_ID_VIEW                        = "id_view";
    private static final String MARK_GISMAP_LIST                    = "gismap_list";
    private static final String PARAMETER_ID_DIRECTORY              = "id_directory";
    private static final String MESSAGE_YOU_MUST_CHOOSE_A_DIRECTORY = "gismap.message.mandatory.directory";

    // //////////////////////////////////////////////////////////////////////////
    // Class attributes

    /**
     * Returns the Download portlet creation view
     *
     * @param request The HTTP request
     * @return The HTML view
     */
    @Override
    public String getCreate( HttpServletRequest request )
    {
        HashMap<String, Object> model = new HashMap<>( );
        String strIdPage = request.getParameter( PARAMETER_PAGE_ID );
        String strIdPortletType = request.getParameter( PARAMETER_PORTLET_TYPE_ID );

        ReferenceList refList = GismapUtils.getViewList( );
        model.put( MARK_GISMAP_LIST, refList );
        HtmlTemplate template = getCreateTemplate( strIdPage, strIdPortletType, model );

        return template.getHtml( );
    }

    /**
     * Returns the Download portlet modification view
     *
     * @param request The Http request
     * @return The HTML view
     */
    @Override
    public String getModify( HttpServletRequest request )
    {
        View view;
        HashMap<String, Object> model = new HashMap<>( );
        String strPortletId = request.getParameter( PARAMETER_PORTLET_ID );
        int nPortletId = -1;

        try
        {
            nPortletId = Integer.parseInt( strPortletId );
        } catch ( NumberFormatException ne )
        {
            AppLogService.error( ne );
        }

        GismapPortlet portlet = ( GismapPortlet ) PortletHome.findByPrimaryKey( nPortletId );
        view = GismapPortletHome.getViewByPortletId( nPortletId );

        ReferenceList refList = GismapUtils.getViewList( );
        model.put( MARK_GISMAP_LIST, refList );
        model.put( MARK_ID_VIEW, view.getId( ) );

        HtmlTemplate template = getModifyTemplate( portlet, model );

        return template.getHtml( );
    }

    /**
     * Process portlet's creation
     *
     * @param request The Http request
     * @return The Jsp management URL of the process result
     */
    @Override
    public String doCreate( HttpServletRequest request )
    {
        GismapPortlet portlet = new GismapPortlet( );
        String strPageId = request.getParameter( PARAMETER_PAGE_ID );
        String strDirectoryId = request.getParameter( PARAMETER_ID_DIRECTORY );
        int nPageId = -1;
        int nDirectoryId = -1;

        // get portlet common attributes
        String strErrorUrl = setPortletCommonData( request, portlet );

        try
        {
            nPageId = Integer.parseInt( strPageId );
            nDirectoryId = Integer.parseInt( strDirectoryId );
        } catch ( NumberFormatException ne )
        {
            AppLogService.error( ne );
        }

        if ( ( strErrorUrl == null ) && ( nDirectoryId == -1 ) )
        {
            strErrorUrl = AdminMessageService.getMessageUrl( request, MESSAGE_YOU_MUST_CHOOSE_A_DIRECTORY, AdminMessage.TYPE_STOP );
        }

        if ( strErrorUrl != null )
        {
            return strErrorUrl;
        }

        portlet.setPageId( nPageId );
        portlet.setDirectoryId( nDirectoryId );

        // Creating portlet
        GismapPortletHome.getInstance( ).create( portlet );

        // Displays the page with the new Portlet
        return getPageUrl( nPageId );
    }

    /**
     * Process portlet's modification
     *
     * @param request The http request
     * @return Management's Url
     */
    @Override
    public String doModify( HttpServletRequest request )
    {
        // recovers portlet attributes
        String strPortletId = request.getParameter( PARAMETER_PORTLET_ID );
        String strDirectoryId = request.getParameter( PARAMETER_ID_DIRECTORY );
        int nPortletId = -1;
        int nDirectoryId = -1;

        try
        {
            nPortletId = Integer.parseInt( strPortletId );
            nDirectoryId = Integer.parseInt( strDirectoryId );
        } catch ( NumberFormatException ne )
        {
            AppLogService.error( ne );
        }

        GismapPortlet portlet = ( GismapPortlet ) PortletHome.findByPrimaryKey( nPortletId );

        // retrieve portlet common attributes
        String strErrorUrl = setPortletCommonData( request, portlet );

        if ( ( strErrorUrl == null ) && ( nDirectoryId == -1 ) )
        {
            strErrorUrl = AdminMessageService.getMessageUrl( request, MESSAGE_YOU_MUST_CHOOSE_A_DIRECTORY, AdminMessage.TYPE_STOP );
        }

        if ( strErrorUrl != null )
        {
            return strErrorUrl;
        }

        portlet.setDirectoryId( nDirectoryId );
        // updates the portlet
        portlet.update( );

        // displays the page withe the potlet updated
        return getPageUrl( portlet.getPageId( ) );
    }
}
