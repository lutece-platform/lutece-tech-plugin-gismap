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

import fr.paris.lutece.plugins.gismap.business.HtlmView;
import fr.paris.lutece.plugins.gismap.business.HtlmViewHome;
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
 * This class provides the user interface to manage HtlmView features ( manage, create, modify, remove )
 */
@Controller( controllerJsp = "ManageHtlmViews.jsp", controllerPath = "jsp/admin/plugins/gismap/", right = "GISMAP_MANAGEMENT" )
public class HtlmViewJspBean extends ManageGismapJspBean
{

    ////////////////////////////////////////////////////////////////////////////
    // Constants

    // templates
    private static final String TEMPLATE_MANAGE_HTLMVIEWS = "/admin/plugins/gismap/manage_htlmviews.html";
    private static final String TEMPLATE_CREATE_HTLMVIEW = "/admin/plugins/gismap/create_htlmview.html";
    private static final String TEMPLATE_MODIFY_HTLMVIEW = "/admin/plugins/gismap/modify_htlmview.html";


    // Parameters
    private static final String PARAMETER_ID_HTLMVIEW = "id";

    // Properties for page titles
    private static final String PROPERTY_PAGE_TITLE_MANAGE_HTLMVIEWS = "gismap.manage_htlmviews.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_MODIFY_HTLMVIEW = "gismap.modify_htlmview.pageTitle";
    private static final String PROPERTY_PAGE_TITLE_CREATE_HTLMVIEW = "gismap.create_htlmview.pageTitle";

    // Markers
    private static final String MARK_HTLMVIEW_LIST = "htlmview_list";
    private static final String MARK_HTLMVIEW = "htlmview";

    private static final String JSP_MANAGE_HTLMVIEWS = "jsp/admin/plugins/gismap/ManageHtlmViews.jsp";

    // Properties
    private static final String MESSAGE_CONFIRM_REMOVE_HTLMVIEW = "gismap.message.confirmRemoveHtlmView";
    private static final String PROPERTY_DEFAULT_LIST_HTLMVIEW_PER_PAGE = "gismap.listHtlmViews.itemsPerPage";
 
    private static final String VALIDATION_ATTRIBUTES_PREFIX = "gismap.model.entity.htlmview.attribute.";

    // Views
    private static final String VIEW_MANAGE_HTLMVIEWS = "manageHtlmViews";
    private static final String VIEW_CREATE_HTLMVIEW = "createHtlmView";
    private static final String VIEW_MODIFY_HTLMVIEW = "modifyHtlmView";

    // Actions
    private static final String ACTION_CREATE_HTLMVIEW = "createHtlmView";
    private static final String ACTION_MODIFY_HTLMVIEW = "modifyHtlmView";
    private static final String ACTION_REMOVE_HTLMVIEW = "removeHtlmView";
    private static final String ACTION_CONFIRM_REMOVE_HTLMVIEW = "confirmRemoveHtlmView";

    // Infos
    private static final String INFO_HTLMVIEW_CREATED = "gismap.info.htlmview.created";
    private static final String INFO_HTLMVIEW_UPDATED = "gismap.info.htlmview.updated";
    private static final String INFO_HTLMVIEW_REMOVED = "gismap.info.htlmview.removed";
    
    // Session variable to store working values
    private HtlmView _htlmview;
    
    
    @View( value = VIEW_MANAGE_HTLMVIEWS, defaultView = true )
    public String getManageHtlmViews( HttpServletRequest request )
    {
        _htlmview = null;
        List<HtlmView> listHtlmViews = (List<HtlmView>) HtlmViewHome.getHtlmViewsList(  );
        Map<String, Object> model = getPaginatedListModel( request, MARK_HTLMVIEW_LIST, listHtlmViews, JSP_MANAGE_HTLMVIEWS );

        return getPage( PROPERTY_PAGE_TITLE_MANAGE_HTLMVIEWS, TEMPLATE_MANAGE_HTLMVIEWS, model );
    }

    /**
     * Returns the form to create a htlmview
     *
     * @param request The Http request
     * @return the html code of the htlmview form
     */
    @View( VIEW_CREATE_HTLMVIEW )
    public String getCreateHtlmView( HttpServletRequest request )
    {
        _htlmview = ( _htlmview != null ) ? _htlmview : new HtlmView(  );

        Map<String, Object> model = getModel(  );
        model.put( MARK_HTLMVIEW, _htlmview );

        return getPage( PROPERTY_PAGE_TITLE_CREATE_HTLMVIEW, TEMPLATE_CREATE_HTLMVIEW, model );
    }

    /**
     * Process the data capture form of a new htlmview
     *
     * @param request The Http Request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_CREATE_HTLMVIEW )
    public String doCreateHtlmView( HttpServletRequest request )
    {
        populate( _htlmview, request );

        // Check constraints
        if ( !validateBean( _htlmview, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirectView( request, VIEW_CREATE_HTLMVIEW );
        }

        HtlmViewHome.create( _htlmview );
        addInfo( INFO_HTLMVIEW_CREATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_HTLMVIEWS );
    }

    /**
     * Manages the removal form of a htlmview whose identifier is in the http
     * request
     *
     * @param request The Http request
     * @return the html code to confirm
     */
    @Action( ACTION_CONFIRM_REMOVE_HTLMVIEW )
    public String getConfirmRemoveHtlmView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );
        UrlItem url = new UrlItem( getActionUrl( ACTION_REMOVE_HTLMVIEW ) );
        url.addParameter( PARAMETER_ID_HTLMVIEW, nId );

        String strMessageUrl = AdminMessageService.getMessageUrl( request, MESSAGE_CONFIRM_REMOVE_HTLMVIEW,
                url.getUrl(  ), AdminMessage.TYPE_CONFIRMATION );

        return redirect( request, strMessageUrl );
    }

    /**
     * Handles the removal form of a htlmview
     *
     * @param request The Http request
     * @return the jsp URL to display the form to manage htlmviews
     */
    @Action( ACTION_REMOVE_HTLMVIEW )
    public String doRemoveHtlmView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );
        HtlmViewHome.remove( nId );
        addInfo( INFO_HTLMVIEW_REMOVED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_HTLMVIEWS );
    }

    /**
     * Returns the form to update info about a htlmview
     *
     * @param request The Http request
     * @return The HTML form to update info
     */
    @View( VIEW_MODIFY_HTLMVIEW )
    public String getModifyHtlmView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );

        if ( _htlmview == null || ( _htlmview.getId(  ) != nId ))
        {
            _htlmview = HtlmViewHome.findByPrimaryKey( nId );
        }

        Map<String, Object> model = getModel(  );
        model.put( MARK_HTLMVIEW, _htlmview );

        return getPage( PROPERTY_PAGE_TITLE_MODIFY_HTLMVIEW, TEMPLATE_MODIFY_HTLMVIEW, model );
    }

    /**
     * Process the change form of a htlmview
     *
     * @param request The Http request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_MODIFY_HTLMVIEW )
    public String doModifyHtlmView( HttpServletRequest request )
    {
        populate( _htlmview, request );

        // Check constraints
        if ( !validateBean( _htlmview, VALIDATION_ATTRIBUTES_PREFIX ) )
        {
            return redirect( request, VIEW_MODIFY_HTLMVIEW, PARAMETER_ID_HTLMVIEW, _htlmview.getId( ) );
        }

        HtlmViewHome.update( _htlmview );
        addInfo( INFO_HTLMVIEW_UPDATED, getLocale(  ) );

        return redirectView( request, VIEW_MANAGE_HTLMVIEWS );
    }
}
