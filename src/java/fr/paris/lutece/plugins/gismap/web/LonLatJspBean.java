/*
 * Copyright (c) 2002-2015, Mairie de Paris
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

 
package fr.paris.lutece.plugins.gismap.web;

import fr.paris.lutece.plugins.gismap.business.LonLat;
import fr.paris.lutece.plugins.gismap.business.LonLatHome;
import fr.paris.lutece.portal.service.message.AdminMessage;
import fr.paris.lutece.portal.service.message.AdminMessageService;
import fr.paris.lutece.portal.util.mvc.admin.annotations.Controller;
import fr.paris.lutece.portal.util.mvc.commons.annotations.Action;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.util.url.UrlItem;

import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpServletRequest;


/**
 * This class provides the user interface to manage LonLat features ( manage, create, modify, remove )
 */
@Controller( controllerJsp = "ManageLonLats.jsp", controllerPath = "jsp/admin/plugins/gismap/", right = "GISMAP_MANAGEMENT" )
public class LonLatJspBean extends ManageGismapJspBean
{

    ////////////////////////////////////////////////////////////////////////////
    // Constants

    // templates
    private static final String TEMPLATE_MANAGE_LONLATS = "/admin/plugins/gismap/manage_lonlats.html";
    private static final String TEMPLATE_CREATE_LONLAT = "/admin/plugins/gismap/create_lonlat.html";
    private static final String TEMPLATE_MODIFY_LONLAT = "/admin/plugins/gismap/modify_lonlat.html";


    // Parameters
    private static final String PARAMETER_ID_LONLAT = "id";

    // Properties for page titles
    private static final String PROPERTY_PAGE_TITLE_MANAGE_LONLATS = "gismap.manage_lonlats.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_MODIFY_LONLAT = "gismap.modify_lonlat.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_CREATE_LONLAT = "gismap.create_lonlat.pageTitle";

    // Markers
    private static final String MARK_LONLAT_LIST = "lonlat_list";
    private static final String MARK_LONLAT = "lonlat";

    private static final String JSP_MANAGE_LONLATS = "jsp/admin/plugins/gismap/ManageLonLats.jsp";

    // Properties
    private static final String MESSAGE_CONFIRM_REMOVE_LONLAT = "gismap.message.confirmRemoveLonLat";
    private static final String PROPERTY_DEFAULT_LIST_LONLAT_PER_PAGE = "gismap.listLonLats.itemsPerPage";
 
    private static final String VALIDATION_ATTRIBUTES_PREFIX = "gismap.model.entity.lonlat.attribute.";

    // Views
    private static final String VIEW_MANAGE_LONLATS = "manageLonLats";
    private static final String VIEW_CREATE_LONLAT = "createLonLat";
    private static final String VIEW_MODIFY_LONLAT = "modifyLonLat";

    // Actions
    private static final String ACTION_CREATE_LONLAT = "createLonLat";
    private static final String ACTION_MODIFY_LONLAT = "modifyLonLat";
    private static final String ACTION_REMOVE_LONLAT = "removeLonLat";
    private static final String ACTION_CONFIRM_REMOVE_LONLAT = "confirmRemoveLonLat";

    // Infos
    private static final String INFO_LONLAT_CREATED = "gismap.info.lonlat.created";
    private static final String INFO_LONLAT_UPDATED = "gismap.info.lonlat.updated";
    private static final String INFO_LONLAT_REMOVED = "gismap.info.lonlat.removed";
    
    // Session variable to store working values
    private LonLat _lonlat;
    
    
    @View( value = VIEW_MANAGE_LONLATS, defaultView = true )
    public String getManageLonLats( HttpServletRequest request )
    {
        _lonlat = null;
        List<LonLat> listLonLats = (List<LonLat>) LonLatHome.getLonLatsList(  );
        Map<String, Object> model = getPaginatedListModel( request, MARK_LONLAT_LIST, listLonLats, JSP_MANAGE_LONLATS );

        return getPage( PROPERTY_PAGE_TITLE_MANAGE_LONLATS, TEMPLATE_MANAGE_LONLATS, model );
    }

    /**
     * Returns the form to create a lonlat
     *
     * @param request The Http request
     * @return the html code of the lonlat form
     */
    @View( VIEW_CREATE_LONLAT )
    public String getCreateLonLat( HttpServletRequest request )
    {
        _lonlat = ( _lonlat != null ) ? _lonlat : new LonLat(  );

        Map<String, Object> model = getModel(  );
        model.put( MARK_LONLAT, _lonlat );

        return getPage( PROPERTY_PAGE_TITLE_CREATE_LONLAT, TEMPLATE_CREATE_LONLAT, model );
    }

    /**
     * Process the data capture form of a new lonlat
     *
     * @param request The Http Request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_CREATE_LONLAT )
    public String doCreateLonLat( HttpServletRequest request )
    {
        populate( _lonlat, request );

        // Check constraints
        if ( !validateBean( _lonlat, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirectView( request, VIEW_CREATE_LONLAT );
        }

        LonLatHome.create( _lonlat );
        addInfo( INFO_LONLAT_CREATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_LONLATS );
    }

    /**
     * Manages the removal form of a lonlat whose identifier is in the http
     * request
     *
     * @param request The Http request
     * @return the html code to confirm
     */
    @Action( ACTION_CONFIRM_REMOVE_LONLAT )
    public String getConfirmRemoveLonLat( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_LONLAT ) );
        UrlItem url = new UrlItem( getActionUrl( ACTION_REMOVE_LONLAT ) );
        url.addParameter( PARAMETER_ID_LONLAT, nId );

        String strMessageUrl = AdminMessageService.getMessageUrl( request, MESSAGE_CONFIRM_REMOVE_LONLAT,
                url.getUrl(  ), AdminMessage.TYPE_CONFIRMATION );

        return redirect( request, strMessageUrl );
    }

    /**
     * Handles the removal form of a lonlat
     *
     * @param request The Http request
     * @return the jsp URL to display the form to manage lonlats
     */
    @Action( ACTION_REMOVE_LONLAT )
    public String doRemoveLonLat( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_LONLAT ) );
        LonLatHome.remove( nId );
        addInfo( INFO_LONLAT_REMOVED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_LONLATS );
    }

    /**
     * Returns the form to update info about a lonlat
     *
     * @param request The Http request
     * @return The HTML form to update info
     */
    @View( VIEW_MODIFY_LONLAT )
    public String getModifyLonLat( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_LONLAT ) );

        if ( _lonlat == null || ( _lonlat.getId(  ) != nId ))
        {
            _lonlat = LonLatHome.findByPrimaryKey( nId );
        }

        Map<String, Object> model = getModel(  );
        model.put( MARK_LONLAT, _lonlat );

        return getPage( PROPERTY_PAGE_TITLE_MODIFY_LONLAT, TEMPLATE_MODIFY_LONLAT, model );
    }

    /**
     * Process the change form of a lonlat
     *
     * @param request The Http request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_MODIFY_LONLAT )
    public String doModifyLonLat( HttpServletRequest request )
    {
        populate( _lonlat, request );

        // Check constraints
        if ( !validateBean( _lonlat, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirect( request, VIEW_MODIFY_LONLAT, PARAMETER_ID_LONLAT, _lonlat.getId( ) );
        }

        LonLatHome.update( _lonlat );
        addInfo( INFO_LONLAT_UPDATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_LONLATS );
    }
}
