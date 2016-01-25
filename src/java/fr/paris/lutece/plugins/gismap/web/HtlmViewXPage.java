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
import fr.paris.lutece.portal.util.mvc.commons.annotations.Action;
import fr.paris.lutece.portal.web.xpages.XPage;
import fr.paris.lutece.portal.util.mvc.xpage.MVCApplication;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.portal.util.mvc.xpage.annotations.Controller;
import fr.paris.lutece.util.url.UrlItem;
import java.util.Map;
import fr.paris.lutece.portal.service.message.SiteMessageService;
import fr.paris.lutece.portal.service.message.SiteMessage;
import fr.paris.lutece.portal.service.message.SiteMessageException;
import javax.servlet.http.HttpServletRequest; 

/**
 * This class provides the user interface to manage HtlmView xpages ( manage, create, modify, remove )
 */
 
@Controller( xpageName = "htlmview" , pageTitleI18nKey = "gismap.xpage.htlmview.pageTitle" , pagePathI18nKey = "gismap.xpage.htlmview.pagePathLabel" )
public class HtlmViewXPage extends MVCApplication
{
    // Templates
    private static final String TEMPLATE_MANAGE_HTLMVIEWS="/skin/plugins/gismap/manage_htlmviews.html";
    private static final String TEMPLATE_CREATE_HTLMVIEW="/skin/plugins/gismap/create_htlmview.html";
    private static final String TEMPLATE_MODIFY_HTLMVIEW="/skin/plugins/gismap/modify_htlmview.html";
    
    // JSP
    private static final String JSP_PAGE_PORTAL = "jsp/site/Portal.jsp";
    
    // Parameters
    private static final String PARAMETER_ID_HTLMVIEW="id";
    private static final String PARAM_ACTION = "action";
    private static final String PARAM_PAGE = "page";
    
    // Markers
    private static final String MARK_HTLMVIEW_LIST = "htlmview_list";
    private static final String MARK_HTLMVIEW = "htlmview";
    
    // Message
    private static final String MESSAGE_CONFIRM_REMOVE_HTLMVIEW = "gismap.message.confirmRemoveHtlmView";
    
    // Views
    private static final String VIEW_MANAGE_HTLMVIEWS = "manageHtlmViews";
    private static final String VIEW_CREATE_HTLMVIEW = "createHtlmView";
    private static final String VIEW_MODIFY_HTLMVIEW = "modifyHtlmView";

    // Actions
    private static final String ACTION_CREATE_HTLMVIEW = "createHtlmView";
    private static final String ACTION_MODIFY_HTLMVIEW= "modifyHtlmView";
    private static final String ACTION_REMOVE_HTLMVIEW = "removeHtlmView";
    private static final String ACTION_CONFIRM_REMOVE_HTLMVIEW = "confirmRemoveHtlmView";

    // Infos
    private static final String INFO_HTLMVIEW_CREATED = "gismap.info.htlmview.created";
    private static final String INFO_HTLMVIEW_UPDATED = "gismap.info.htlmview.updated";
    private static final String INFO_HTLMVIEW_REMOVED = "gismap.info.htlmview.removed";
    
    // Session variable to store working values
    private HtlmView _htlmview;
    
    @View( value = VIEW_MANAGE_HTLMVIEWS, defaultView = true )
    public XPage getManageHtlmViews( HttpServletRequest request )
    {
        _htlmview = null;
        Map<String, Object> model = getModel(  );
        model.put( MARK_HTLMVIEW_LIST, HtlmViewHome.getHtlmViewsList(  ) );

        return getXPage( TEMPLATE_MANAGE_HTLMVIEWS, request.getLocale(  ), model );
    }

    /**
     * Returns the form to create a htlmview
     *
     * @param request The Http request
     * @return the html code of the htlmview form
     */
    @View( VIEW_CREATE_HTLMVIEW )
    public XPage getCreateHtlmView( HttpServletRequest request )
    {
        _htlmview = ( _htlmview != null ) ? _htlmview : new HtlmView(  );

        Map<String, Object> model = getModel(  );
        model.put( MARK_HTLMVIEW, _htlmview );
           
        return getXPage( TEMPLATE_CREATE_HTLMVIEW, request.getLocale(  ), model );
    }

    /**
     * Process the data capture form of a new htlmview
     *
     * @param request The Http Request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_CREATE_HTLMVIEW )
    public XPage doCreateHtlmView( HttpServletRequest request )
    {
        populate( _htlmview, request );

        // Check constraints
        if ( !validateBean( _htlmview, getLocale( request ) ) )
        {
            return redirectView( request, VIEW_CREATE_HTLMVIEW );
        }

        HtlmViewHome.create( _htlmview );
        addInfo( INFO_HTLMVIEW_CREATED, getLocale( request ) );

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
    public XPage getConfirmRemoveHtlmView( HttpServletRequest request ) throws SiteMessageException
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );
        UrlItem url = new UrlItem( JSP_PAGE_PORTAL );
        url.addParameter( PARAM_PAGE, MARK_HTLMVIEW );
        url.addParameter( PARAM_ACTION, ACTION_REMOVE_HTLMVIEW );
        url.addParameter( PARAMETER_ID_HTLMVIEW, nId );
        
        SiteMessageService.setMessage(request, MESSAGE_CONFIRM_REMOVE_HTLMVIEW, SiteMessage.TYPE_CONFIRMATION, url.getUrl(  ));
        return null;
    }

    /**
     * Handles the removal form of a htlmview
     *
     * @param request The Http request
     * @return the jsp URL to display the form to manage htlmviews
     */
    @Action( ACTION_REMOVE_HTLMVIEW )
    public XPage doRemoveHtlmView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );
        HtlmViewHome.remove( nId );
        addInfo( INFO_HTLMVIEW_REMOVED, getLocale( request ) );

        return redirectView( request, VIEW_MANAGE_HTLMVIEWS );
    }

    /**
     * Returns the form to update info about a htlmview
     *
     * @param request The Http request
     * @return The HTML form to update info
     */
    @View( VIEW_MODIFY_HTLMVIEW )
    public XPage getModifyHtlmView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_HTLMVIEW ) );

        if ( _htlmview == null  || ( _htlmview.getId( ) != nId ))
        {
            _htlmview = HtlmViewHome.findByPrimaryKey( nId );
        }

        Map<String, Object> model = getModel(  );
        model.put( MARK_HTLMVIEW, _htlmview );
        
        return getXPage( TEMPLATE_MODIFY_HTLMVIEW, request.getLocale(  ), model );
    }

    /**
     * Process the change form of a htlmview
     *
     * @param request The Http request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_MODIFY_HTLMVIEW )
    public XPage doModifyHtlmView( HttpServletRequest request )
    {
        populate( _htlmview, request );

        // Check constraints
        if ( !validateBean( _htlmview, getLocale( request ) ) )
        {
            return redirect( request, VIEW_MODIFY_HTLMVIEW, PARAMETER_ID_HTLMVIEW, _htlmview.getId( ) );
        }

        HtlmViewHome.update( _htlmview );
        addInfo( INFO_HTLMVIEW_UPDATED, getLocale( request ) );

        return redirectView( request, VIEW_MANAGE_HTLMVIEWS );
    }
}
