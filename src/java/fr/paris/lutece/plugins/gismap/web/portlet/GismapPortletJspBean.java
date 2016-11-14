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
import fr.paris.lutece.plugins.gismap.business.ViewHome;
import fr.paris.lutece.plugins.gismap.business.portlet.GismapPortlet;
import fr.paris.lutece.plugins.gismap.business.portlet.GismapPortletHome;
import fr.paris.lutece.plugins.gismap.web.GismapJspBean;
import fr.paris.lutece.portal.business.portlet.PortletType;
import fr.paris.lutece.portal.business.portlet.PortletTypeHome;
import fr.paris.lutece.portal.service.message.AdminMessage;
import fr.paris.lutece.portal.service.message.AdminMessageService;
import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.portal.service.plugin.PluginService;
import fr.paris.lutece.portal.service.util.AppLogService;
import fr.paris.lutece.portal.web.portlet.PortletJspBean;
import fr.paris.lutece.util.ReferenceList;
import fr.paris.lutece.util.html.HtmlTemplate;

/**
 * This class provides the user interface to manage form Portlet
 */
public class GismapPortletJspBean extends PortletJspBean
{
    // //////////////////////////////////////////////////////////////////////////
    // Constants
    /**
     * Right to manage gismap
     */
    public static final String  RIGHT_MANAGE_GISMAP            = GismapJspBean.RIGHT_MANAGE_GISMAP;

    private static final long   serialVersionUID               = -2619049973871862337L;
    private static final String MARK_ID_FORM                   = "id_form";
    private static final String MARK_GISMAP_LIST               = "gismap_list";
    private static final String PARAMETER_ID_DIRECTORY         = "id_directory";
    private static final String MESSAGE_YOU_MUST_CHOOSE_A_FORM = "form.message.mandatory.form";

    // //////////////////////////////////////////////////////////////////////////
    // Class attributes

    /**
     * Returns the Download portlet creation form
     *
     * @param request The HTTP request
     * @return The HTML form
     */
    @Override
    public String getCreate( HttpServletRequest request )
    {
        HashMap<String, Object> model = new HashMap<String, Object>( );
        String strIdPage = request.getParameter( PARAMETER_PAGE_ID );
        String strIdPortletType = request.getParameter( PARAMETER_PORTLET_TYPE_ID );
        PortletType portletType = PortletTypeHome.findByPrimaryKey( strIdPortletType );
        Plugin plugin = PluginService.getPlugin( portletType.getPluginName( ) );
        View listView = ViewHome.findByPrimaryKey( 1 );

        ReferenceList refList = null;

        model.put( MARK_GISMAP_LIST, refList );

        HtmlTemplate template = getCreateTemplate( strIdPage, strIdPortletType, model );

        return template.getHtml( );
    }

    /**
     * Returns the Download portlet modification form
     *
     * @param request The Http request
     * @return The HTML form
     */
    @Override
    public String getModify( HttpServletRequest request )
    {
        return null;
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
            strErrorUrl = AdminMessageService.getMessageUrl( request, MESSAGE_YOU_MUST_CHOOSE_A_FORM, AdminMessage.TYPE_STOP );
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
        return null;
    }
}
