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
import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.util.mvc.admin.MVCAdminJspBean;
import fr.paris.lutece.portal.util.mvc.admin.annotations.Controller;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.portal.web.cdi.mvc.Models;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Back office page displaying the default map.
 */
@RequestScoped
@Named
@Controller( controllerJsp = "ManageGismap.jsp", controllerPath = "jsp/admin/plugins/gismap/", right = GismapJspBean.RIGHT_MANAGE_GISMAP, securityTokenEnabled = true )
public class GismapJspBean extends MVCAdminJspBean
{
    private static final long   serialVersionUID             = 1L;

    public static final String  RIGHT_MANAGE_GISMAP          = "GISMAP_MANAGEMENT";
    public static final String  RIGHT_DISPLAY_MAP            = "GISMAP_MANAGEMENT";
    public static final String  GISMAP_VIEW_INIT             = "gismap.view.init";

    private static final String PARAMETER_MAP                = "map";
    private static final String PARAMETER_ADD                = "add_parameter";

    private static final String PROPERTY_PAGE_TITLE_FEATURES = "gismap.manage_features.pageTitle";
    private static final String TEMPLATE_HOME                = "/admin/plugins/gismap/manage_gismap.html";

    private static final String VIEW_MANAGE_GISMAP           = "manageGismap";

    @Inject
    private transient GismapService _gismapService;

    /**
     * Returns the Gismap HTML management page.
     *
     * @param model
     *            the page model
     * @param request
     *            The HTTP request
     * @return gismap html page
     */
    @View( value = VIEW_MANAGE_GISMAP, defaultView = true )
    public String getManageGismap( Models model, HttpServletRequest request )
    {
        model.put( PARAMETER_ADD, AddressParamHome.getAddressParameters( ) );
        model.put( PARAMETER_MAP, _gismapService.getMapTemplate( request ) );

        return getPage( PROPERTY_PAGE_TITLE_FEATURES, TEMPLATE_HOME );
    }
}
