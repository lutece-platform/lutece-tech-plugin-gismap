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
package fr.paris.lutece.plugins.gismap.web;

import fr.paris.lutece.plugins.gismap.business.AddressParamHome;
import fr.paris.lutece.plugins.gismap.business.View;
import fr.paris.lutece.plugins.gismap.business.ViewHome;
import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.service.message.SiteMessageException;
import fr.paris.lutece.portal.service.security.UserNotSignedException;
import fr.paris.lutece.portal.service.template.AppTemplateService;
import fr.paris.lutece.portal.service.util.AppPropertiesService;
import fr.paris.lutece.portal.web.admin.PluginAdminPageJspBean;
import fr.paris.lutece.util.html.HtmlTemplate;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


public class GismapJspBean extends PluginAdminPageJspBean
{
    ////////////////////////////////////////////////////////////////////////////
    // Constants

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Right
    public static final String RIGHT_MANAGE_GISMAP = "GISMAP_MANAGEMENT";
    public static final String RIGHT_DISPLAY_MAP = "GISMAP_MANAGEMENT";
    public static final String GISMAP_VIEW_INIT = "gismap.view.init";

    // Parameters
    private static final String PARAMETER_GISMAP_CODE = "gismap_code";
    private static final String PARAMETER_MAP_PARAMETER = "map_parameter";
    private static final String PARAMETER_ADD_URL = "add_url";
    private static final String PARAMETER_ADD_CLIENT_ID = "add_clientId";
    private static final String PARAMETER_ADD_NB_RESULTS = "add_nbResults";
    
    public static final String PARAM_URL = "url";
    public static final String PARAM_DELAY = "delay";
    public static final String PARAM_MIN_LENGTH = "minLength";
    public static final String PARAM_TYPES = "types";
    public static final String PARAM_ND_RESULT = "nbResults";
    public static final String PARAM_CLIENT_ID = "clientId";
    // I18n
    private static final String PROPERTY_PAGE_TITLE_FEATURES = "gismap.manage_features.pageTitle";

    // Templates
    //private static final String TEMPLATE_HOME = "/admin/plugins/gismap/manage_gismap.html";

    /**
     * Returns the Gismap HTML code for a given view
     *
     * @param request The HTTP request.
     * @param nMode The current mode. [not implemented]
     * @throws UserNotSignedException
     * @throws SiteMessageException occurs when a site message need to be
     *             displayed
     */
    public String getMap( HttpServletRequest request )
    {
        String strViewCode = request.getParameter( PARAMETER_GISMAP_CODE );

        return GismapService.getInstance(  ).getView( strViewCode, null, request );
    }

    /**
     * Returns the Gismap HTML management page
     *
     * @param request The HTTP request.
     * @param nMode The current mode. [not implemented]
     * @throws UserNotSignedException
     * @throws SiteMessageException occurs when a site message need to be
     *             displayed
     */
    public String getManageGismap( HttpServletRequest request )
    {
        setPageTitleProperty( PROPERTY_PAGE_TITLE_FEATURES );

        Map<String, Object> rootModel = new HashMap<String, Object>(  );
        String strInitView = AppPropertiesService.getProperty( GISMAP_VIEW_INIT );
        View view = ViewHome.findByPrimaryKey(Integer.parseInt(strInitView));
        
        //List<Geometry> listGeometry = GeometryHome.getList();
        
        rootModel.put(PARAMETER_MAP_PARAMETER, view.getMapParameter());
        rootModel.put(PARAMETER_ADD_URL, AddressParamHome.getAddressParameter(PARAM_URL));
        rootModel.put(PARAMETER_ADD_CLIENT_ID, AddressParamHome.getAddressParameter(PARAM_CLIENT_ID));
        rootModel.put(PARAMETER_ADD_NB_RESULTS, AddressParamHome.getAddressParameter(PARAM_ND_RESULT));
        HtmlTemplate templateList = AppTemplateService.getTemplate( view.getTemplateFile(), getLocale(  ), rootModel );

        return getAdminPage( templateList.getHtml(  ) );
    }
    
}
