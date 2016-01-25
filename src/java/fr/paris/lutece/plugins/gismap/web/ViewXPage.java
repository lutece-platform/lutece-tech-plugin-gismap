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
 * This class provides the user interface to manage View xpages ( manage, create, modify, remove )
 */
 
@Controller( xpageName = "view" , pageTitleI18nKey = "gismap.xpage.view.pageTitle" , pagePathI18nKey = "gismap.xpage.view.pagePathLabel" )
public class ViewXPage extends MVCApplication
{
    // Templates
    private static final String TEMPLATE_MANAGE_VIEWS="/skin/plugins/gismap/manage_views.html";
    private static final String TEMPLATE_CREATE_VIEW="/skin/plugins/gismap/create_view.html";
    private static final String TEMPLATE_MODIFY_VIEW="/skin/plugins/gismap/modify_view.html";
    
    // JSP
    private static final String JSP_PAGE_PORTAL = "jsp/site/Portal.jsp";
    
    // Parameters
    private static final String PARAMETER_ID_VIEW="id";
    private static final String PARAM_ACTION = "action";
    private static final String PARAM_PAGE = "page";
    
    // Markers
    private static final String MARK_VIEW_LIST = "view_list";
    private static final String MARK_VIEW = "view";
    
    // Message
    private static final String MESSAGE_CONFIRM_REMOVE_VIEW = "gismap.message.confirmRemoveView";
    
    // Views
    private static final String VIEW_MANAGE_VIEWS = "manageViews";
    private static final String VIEW_CREATE_VIEW = "createView";
    private static final String VIEW_MODIFY_VIEW = "modifyView";

    // Actions
    private static final String ACTION_CREATE_VIEW = "createView";
    private static final String ACTION_MODIFY_VIEW= "modifyView";
    private static final String ACTION_REMOVE_VIEW = "removeView";
    private static final String ACTION_CONFIRM_REMOVE_VIEW = "confirmRemoveView";

    // Infos
    private static final String INFO_VIEW_CREATED = "gismap.info.view.created";
    private static final String INFO_VIEW_UPDATED = "gismap.info.view.updated";
    private static final String INFO_VIEW_REMOVED = "gismap.info.view.removed";
    
    // Session variable to store working values
    private HtmlView _view;
    
    @View( value = VIEW_MANAGE_VIEWS, defaultView = true )
    public XPage getManageViews( HttpServletRequest request )
    {
        _view = null;
        Map<String, Object> model = getModel(  );
        model.put( MARK_VIEW_LIST, ViewHome.getViewsList(  ) );

        return getXPage( TEMPLATE_MANAGE_VIEWS, request.getLocale(  ), model );
    }

    /**
     * Returns the form to create a view
     *
     * @param request The Http request
     * @return the html code of the view form
     */
    @View( VIEW_CREATE_VIEW )
    public XPage getCreateView( HttpServletRequest request )
    {
        _view = ( _view != null ) ? _view : new HtmlView(  );

        Map<String, Object> model = getModel(  );
        model.put( MARK_VIEW, _view );
           
        return getXPage( TEMPLATE_CREATE_VIEW, request.getLocale(  ), model );
    }

    /**
     * Process the data capture form of a new view
     *
     * @param request The Http Request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_CREATE_VIEW )
    public XPage doCreateView( HttpServletRequest request )
    {
        populate( _view, request );

        // Check constraints
        if ( !validateBean( _view, getLocale( request ) ) )
        {
            return redirectView( request, VIEW_CREATE_VIEW );
        }

        ViewHome.create( _view );
        addInfo( INFO_VIEW_CREATED, getLocale( request ) );

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
    public XPage getConfirmRemoveView( HttpServletRequest request ) throws SiteMessageException
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );
        UrlItem url = new UrlItem( JSP_PAGE_PORTAL );
        url.addParameter( PARAM_PAGE, MARK_VIEW );
        url.addParameter( PARAM_ACTION, ACTION_REMOVE_VIEW );
        url.addParameter( PARAMETER_ID_VIEW, nId );
        
        SiteMessageService.setMessage(request, MESSAGE_CONFIRM_REMOVE_VIEW, SiteMessage.TYPE_CONFIRMATION, url.getUrl(  ));
        return null;
    }

    /**
     * Handles the removal form of a view
     *
     * @param request The Http request
     * @return the jsp URL to display the form to manage views
     */
    @Action( ACTION_REMOVE_VIEW )
    public XPage doRemoveView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );
        ViewHome.remove( nId );
        addInfo( INFO_VIEW_REMOVED, getLocale( request ) );

        return redirectView( request, VIEW_MANAGE_VIEWS );
    }

    /**
     * Returns the form to update info about a view
     *
     * @param request The Http request
     * @return The HTML form to update info
     */
    @View( VIEW_MODIFY_VIEW )
    public XPage getModifyView( HttpServletRequest request )
    {
        int nId = Integer.parseInt( request.getParameter( PARAMETER_ID_VIEW ) );

        if ( _view == null  || ( _view.getId( ) != nId ))
        {
            _view = ViewHome.findByPrimaryKey( nId );
        }

        Map<String, Object> model = getModel(  );
        model.put( MARK_VIEW, _view );
        
        return getXPage( TEMPLATE_MODIFY_VIEW, request.getLocale(  ), model );
    }

    /**
     * Process the change form of a view
     *
     * @param request The Http request
     * @return The Jsp URL of the process result
     */
    @Action( ACTION_MODIFY_VIEW )
    public XPage doModifyView( HttpServletRequest request )
    {
        populate( _view, request );

        // Check constraints
        if ( !validateBean( _view, getLocale( request ) ) )
        {
            return redirect( request, VIEW_MODIFY_VIEW, PARAMETER_ID_VIEW, _view.getId( ) );
        }

        ViewHome.update( _view );
        addInfo( INFO_VIEW_UPDATED, getLocale( request ) );

        return redirectView( request, VIEW_MANAGE_VIEWS );
    }
}
