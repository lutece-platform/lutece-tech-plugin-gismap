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
package fr.paris.lutece.plugins.gismap.service;

import fr.paris.lutece.plugins.gismap.business.View;
import fr.paris.lutece.plugins.gismap.business.ViewHome;
import fr.paris.lutece.portal.service.template.AppTemplateService;
import fr.paris.lutece.portal.service.util.AppPathService;
import fr.paris.lutece.portal.service.util.AppPropertiesService;
import fr.paris.lutece.util.html.HtmlTemplate;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


/**
 *
 * GismapService
 *
 */
public class GismapService
{
    // Markers
	public static final String GISMAP_VIEW_INIT = "gismap.view.init";
	private static final String PARAMETER_MAP_PARAMETER = "map_parameter";

    //Templates
	
    private static GismapService _singleton = new GismapService(  );

    /**
     * Initialize the GISMAP service
     *
     */
    public void init(  )
    {
        //TODO
    }

    /**
     * Returns the instance of the singleton
     *
     * @return The instance of the singleton
     */
    public static GismapService getInstance(  )
    {
        return _singleton;
    }
    
    /**
     * Gets the XPage view based on the given GIS code.
     * 
     * @param strGisCode
     * @param parameters
     * @param request
     * @return The HTML page
     */
    public String getMapTemplate(HttpServletRequest request)
	{
		Map<String, Object> model = new HashMap<String, Object>(  );
        //String strInitView = AppPropertiesService.getProperty( GISMAP_VIEW_INIT );
        View view = ViewHome.findByPrimaryKey(1);
        
        model.put(PARAMETER_MAP_PARAMETER, view.getMapParameter());
        
        HtmlTemplate templateList = AppTemplateService.getTemplate( view.getMapTemplateFile(), request.getLocale(), model );
        
        return templateList.getHtml(  );
	}
}
