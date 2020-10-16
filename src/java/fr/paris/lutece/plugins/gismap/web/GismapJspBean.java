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

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.plugins.gismap.business.AddressParamHome;
import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.service.message.SiteMessageException;
import fr.paris.lutece.portal.service.security.UserNotSignedException;
import fr.paris.lutece.portal.service.template.AppTemplateService;
import fr.paris.lutece.portal.web.admin.PluginAdminPageJspBean;
import fr.paris.lutece.util.html.HtmlTemplate;

public class GismapJspBean extends PluginAdminPageJspBean
{
    // //////////////////////////////////////////////////////////////////////////
    // Constants

    /**
     *
     */
    private static final long   serialVersionUID             = 1L;

    // Right
    public static final String  RIGHT_MANAGE_GISMAP          = "GISMAP_MANAGEMENT";
    public static final String  RIGHT_DISPLAY_MAP            = "GISMAP_MANAGEMENT";
    public static final String  GISMAP_VIEW_INIT             = "gismap.view.init";

    // Parameters
    private static final String PARAMETER_MAP                = "map";
    private static final String PARAMETER_ADD                = "add_parameter";

    // I18n
    private static final String PROPERTY_PAGE_TITLE_FEATURES = "gismap.manage_features.pageTitle";
    private static final String TEMPLATE_HOME                = "/admin/plugins/gismap/manage_gismap.html";

    /**
     * Returns the Gismap HTML management page
     *
     * @param request The HTTP request.
     * @return gismap html page
     */
    public String getManageGismap( HttpServletRequest request )
    {
        setPageTitleProperty( PROPERTY_PAGE_TITLE_FEATURES );

        Map<String, Object> model = new HashMap<String, Object>( );

        // List<Geometry> listGeometry = GeometryHome.getList();
        model.put( PARAMETER_ADD, AddressParamHome.getAddressParameters( ) );
        model.put( PARAMETER_MAP, GismapService.getInstance( ).getMapTemplate( request ) );

        HtmlTemplate templateList = AppTemplateService.getTemplate( TEMPLATE_HOME, request.getLocale( ), model );

        return getAdminPage( templateList.getHtml( ) );
    }
}
