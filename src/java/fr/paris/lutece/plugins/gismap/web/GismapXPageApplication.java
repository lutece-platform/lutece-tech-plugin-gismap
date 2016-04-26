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

import fr.paris.lutece.plugins.gismap.business.AddressParamHome;
import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.util.mvc.commons.annotations.Action;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.portal.util.mvc.xpage.MVCApplication;
import fr.paris.lutece.portal.util.mvc.xpage.annotations.Controller;
import fr.paris.lutece.portal.web.xpages.XPage;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;


@Controller( xpageName = "gismap", pageTitleI18nKey = "gismap.xpage.gismap.pageTitle", pagePathI18nKey = "gismap.xpage.gismap.pagePathLabel" )
public class GismapXPageApplication extends MVCApplication
{
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    // Templates
    private static final String TEMPLATE_DEFAULT = "/skin/plugins/gismap/manage_gismap.html";

    // Views
    private static final String VIEW_DEFAULT = "default";

    // Actions
    private static final String ACTION_CREATE_GEOM = "createGeom";

    // Parameters
    private static final String PARAMETER_MAP = "map";
    private static final String PARAMETER_ADD = "add_parameter";

    @View( value = VIEW_DEFAULT, defaultView = true )
    public XPage getDefaultPage( HttpServletRequest request )
    {
        Map<String, Object> model = getModel(  );

        model.put( PARAMETER_ADD, AddressParamHome.getAddressParameters(  ) );
        model.put( PARAMETER_MAP, GismapService.getInstance(  ).getMapTemplate( request ) );

        return getXPage( TEMPLATE_DEFAULT, request.getLocale(  ), model );
    }

    @Action( ACTION_CREATE_GEOM )
    public XPage createGeom( HttpServletRequest request )
    {
        return null;
    }
}
