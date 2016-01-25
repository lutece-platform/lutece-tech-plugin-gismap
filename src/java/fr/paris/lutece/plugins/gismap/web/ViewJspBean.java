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

import fr.paris.lutece.plugins.gismap.business.HtmlView;
import fr.paris.lutece.plugins.gismap.business.ViewHome;
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
 * This class provides the user interface to manage View features ( manage, create, modify, remove )
 */
@Controller( controllerJsp = "ManageViews.jsp", controllerPath = "jsp/admin/plugins/gismap/", right = "GISMAP_MANAGEMENT" )
public class ViewJspBean extends ManageGismapJspBean
{

    ////////////////////////////////////////////////////////////////////////////
    // Constants

    // templates
    private static final String TEMPLATE_MANAGE_VIEWS = "/admin/plugins/gismap/manage_views.html";
    private static final String TEMPLATE_CREATE_VIEW = "/admin/plugins/gismap/create_view.html";
    private static final String TEMPLATE_MODIFY_VIEW = "/admin/plugins/gismap/modify_view.html";


    // Parameters
    private static final String PARAMETER_ID_VIEW = "id";

    // Properties for page titles
    private static final String PROPERTY_PAGE_TITLE_MANAGE_VIEWS = "gismap.manage_views.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_MODIFY_VIEW = "gismap.modify_view.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_CREATE_VIEW = "gismap.create_view.pageTitle";

    // Markers
    private static final String MARK_VIEW_LIST = "view_list";
    private static final String MARK_VIEW = "view";

    private static final String JSP_MANAGE_VIEWS = "jsp/admin/plugins/gismap/ManageViews.jsp";

    // Properties
    private static final String MESSAGE_CONFIRM_REMOVE_VIEW = "gismap.message.confirmRemoveView";
    private static final String PROPERTY_DEFAULT_LIST_VIEW_PER_PAGE = "gismap.listViews.itemsPerPage";
 
    private static final String VALIDATION_ATTRIBUTES_PREFIX = "gismap.model.entity.view.attribute.";

    // Views
    private static final String VIEW_MANAGE_VIEWS = "manageViews";
    private static final String VIEW_CREATE_VIEW = "createView";
    private static final String VIEW_MODIFY_VIEW = "modifyView";

    // Actions
    private static final String ACTION_CREATE_VIEW = "createView";
    private static final String ACTION_MODIFY_VIEW = "modifyView";
    private static final String ACTION_REMOVE_VIEW = "removeView";
    private static final String ACTION_CONFIRM_REMOVE_VIEW = "confirmRemoveView";

    // Infos
    private static final String INFO_VIEW_CREATED = "gismap.info.view.created";
    private static final String INFO_VIEW_UPDATED = "gismap.info.view.updated";
    private static final String INFO_VIEW_REMOVED = "gismap.info.view.removed";
    
    // Session variable to store working values
    private HtmlView _view;
    
    
    @View( value = VIEW_MANAGE_VIEWS, defaultView = true )
    public String getManageViews( HttpServletRequest request )
    {
        _view = null;
        List<HtmlView> listViews = (List<HtmlView>) ViewHome.getViewsList(  );
        Map<String, Object> model = getPaginatedListModel( request, MARK_VIEW_LIST, listViews, JSP_MANAGE_VIEWS );

        return getPage( PROPERTY_PAGE_TITLE_MANAGE_VIEWS, TEMPLATE_MANAGE_VIEWS, model );
    }

    /**
     * Returns the form to create a view
     *
     * @param request The Http request
     * @return the html code of the view form
     */
    @View( VIEW_CREATE_VIEW )
    public String getCreateView( HttpServletRequest request )
    {
        _view = ( _view != null ) ? _view : new HtmlView(  );

        Map<String, Object> model = getModel(  );
        model.put( MARK_VIEW, _view );

        return getPage( PROPERTY_PAGE_TITLE_CREATE_VIEW, TEMPLATE_CREATE_VIEW, model );
    }

    /**
     * Process the data capture form of a new view
     *
     * @param request The Http Request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_CREATE_VIEW )
    public String doCreateView( HttpServletRequest request )
    {
        populate( _view, request );

        // Check constraints
        if ( !validateBean( _view, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirectView( request, VIEW_CREATE_VIEW );
        }

        ViewHome.create( _view );
        addInfo( INFO_VIEW_CREATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_VIEWS );
    }

    /**
     * Manages the removal form of a view whose identifier is in the http
     * request
     *
     * @param request The Http request
     * @return the html code to confirm
     */
    @Action( ACTION_CONFIRM_REMOVE_VIEW )
    public String getConfirmRemoveView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );
        UrlItem url = new UrlItem( getActionUrl( ACTION_REMOVE_VIEW ) );
        url.addParameter( PARAMETER_ID_VIEW, nId );

        String strMessageUrl = AdminMessageService.getMessageUrl( request, MESSAGE_CONFIRM_REMOVE_VIEW,
                url.getUrl(  ), AdminMessage.TYPE_CONFIRMATION );

        return redirect( request, strMessageUrl );
    }

    /**
     * Handles the removal form of a view
     *
     * @param request The Http request
     * @return the jsp URL to display the form to manage views
     */
    @Action( ACTION_REMOVE_VIEW )
    public String doRemoveView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );
        ViewHome.remove( nId );
        addInfo( INFO_VIEW_REMOVED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_VIEWS );
    }

    /**
     * Returns the form to update info about a view
     *
     * @param request The Http request
     * @return The HTML form to update info
     */
    @View( VIEW_MODIFY_VIEW )
    public String getModifyView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );

        if ( _view == null || ( _view.getId(  ) != nId ))
        {
            _view = ViewHome.findByPrimaryKey( nId );
        }

        Map<String, Object> model = getModel(  );
        model.put( MARK_VIEW, _view );

        return getPage( PROPERTY_PAGE_TITLE_MODIFY_VIEW, TEMPLATE_MODIFY_VIEW, model );
    }

    /**
     * Process the change form of a view
     *
     * @param request The Http request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_MODIFY_VIEW )
    public String doModifyView( HttpServletRequest request )
    {
        populate( _view, request );

        // Check constraints
        if ( !validateBean( _view, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirect( request, VIEW_MODIFY_VIEW, PARAMETER_ID_VIEW, _view.getId( ) );
        }

        ViewHome.update( _view );
        addInfo( INFO_VIEW_UPDATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_VIEWS );
    }
}
