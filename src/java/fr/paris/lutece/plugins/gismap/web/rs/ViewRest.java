 /*
 * Copyright (c) 2002-2012, Mairie de Paris
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
package fr.paris.lutece.plugins.gismap.web.rs;

import fr.paris.lutece.plugins.gismap.business.View;
import fr.paris.lutece.plugins.gismap.business.ViewHome;
import fr.paris.lutece.plugins.rest.service.RestConstants;
import fr.paris.lutece.plugins.rest.util.json.JSONUtil;
import fr.paris.lutece.plugins.rest.util.xml.XMLUtil;
import fr.paris.lutece.util.xml.XmlUtil;
import fr.paris.lutece.portal.service.util.AppLogService;
import java.io.IOException;

import net.sf.json.JSONObject;

import java.util.Collection;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Page resource
 */
 
@Path( RestConstants.BASE_PATH + Constants.PLUGIN_PATH + Constants.VIEW_PATH )
public class ViewRest
{
    private static final String KEY_VIEWS = "views";
    private static final String KEY_VIEW = "view";
    
    private static final String KEY_ID = "id";
    private static final String KEY_SERVERNAME = "servername";
    
    @GET
    @Path( Constants.ALL_PATH )
    public Response getViews( @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getViewsJson();
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getViewsXml();
            mediaType = MediaType.APPLICATION_XML;
        }
        return Response
            .ok(entity, mediaType)
            .build();
    }
    
    /**
     * Gets all resources list in XML format
     * @return The list
     */
    public String getViewsXml( )
    {
        StringBuffer sbXML = new StringBuffer( XmlUtil.getXmlHeader() );
        Collection<View> list = ViewHome.getViewsList();
        
        XmlUtil.beginElement( sbXML , KEY_VIEWS );

        for ( View view : list )
        {
            addViewXml( sbXML, view );
        }
        
        XmlUtil.endElement( sbXML , KEY_VIEWS );

        return sbXML.toString(  );
    }
    
    /**
     * Gets all resources list in JSON format
     * @return The list
     */
    public String getViewsJson( )
    {
        JSONObject jsonView = new JSONObject(  );
        JSONObject json = new JSONObject(  );
        
        Collection<View> list = ViewHome.getViewsList();
        
        for ( View view : list )
        {
            addViewJson( jsonView, view );
        }
        
        json.accumulate( KEY_VIEWS, jsonView );
        
        return json.toString( );
    }
    
    @GET
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response getView( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getViewJson( strId );
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getViewXml( strId );
            mediaType = MediaType.APPLICATION_XML;
        }
        return Response
            .ok(entity, mediaType)
            .build();
    }
    
    /**
     * Gets a resource in XML format
     * @param strId The resource ID
     * @return The XML output
     */
    public String getViewXml( String strId )
    {
        StringBuffer sbXML = new StringBuffer(  );
        
        try
        {
            int nId = Integer.parseInt( strId );
            View view = ViewHome.findByPrimaryKey( nId );

            if ( view != null )
            {
                sbXML.append( "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" );
                addViewXml( sbXML, view );
            }
        }
        catch ( NumberFormatException e )
        {
            sbXML.append( XMLUtil.formatError( "Invalid view number", 3 ) );
        }
        catch ( Exception e )
        {
            sbXML.append( XMLUtil.formatError( "View not found", 1 ) );
        }

        return sbXML.toString(  );
    }
    
    /**
     * Gets a resource in JSON format
     * @param strId The resource ID
     * @return The JSON output
     */
    public String getViewJson( String strId )
    {
        JSONObject json = new JSONObject(  );
        String strJson = "";

        try
        {
            int nId = Integer.parseInt( strId );
            View view = ViewHome.findByPrimaryKey( nId );

            if ( view != null )
            {
                addViewJson( json, view );
                strJson = json.toString( );
            }
        }
        catch ( NumberFormatException e )
        {
            strJson = JSONUtil.formatError( "Invalid view number", 3 );
        }
        catch ( Exception e )
        {
            strJson = JSONUtil.formatError( "View not found", 1 );
        }

        return strJson;
    }
    
    @DELETE
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response deleteView( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        try
        {
            int nId = Integer.parseInt( strId );
            
            if ( ViewHome.findByPrimaryKey( nId ) != null )
            {
                ViewHome.remove( nId );
            }
        }
        catch ( NumberFormatException e )
        {
            AppLogService.error( "Invalid view number" );
        }
        return getViews(accept, format);
    }
    
    @POST
    public Response createView(
    @FormParam( KEY_ID ) String id,
    @FormParam( "servername" ) String servername, 
    @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format) throws IOException
    {
        if( id != null )
        {
            int nId = Integer.parseInt( KEY_ID );

            View view = ViewHome.findByPrimaryKey( nId );

            if ( view != null )
            {
                view.setServerName( servername );
                ViewHome.update( view );
            }
        }
        else
        {
            View view = new View( );
            
            view.setServerName( servername );
            ViewHome.create( view );
        }
        return getViews(accept, format);
    }
    
    /**
     * Write a view into a buffer
     * @param sbXML The buffer
     * @param view The view
     */
    private void addViewXml( StringBuffer sbXML, View view )
    {
        XmlUtil.beginElement( sbXML, KEY_VIEW );
        XmlUtil.addElement( sbXML, KEY_ID , view.getId( ) );
        XmlUtil.addElement( sbXML, KEY_SERVERNAME , view.getServerName( ) );
        XmlUtil.endElement( sbXML, KEY_VIEW );
    }
    
    /**
     * Write a view into a JSON Object
     * @param json The JSON Object
     * @param view The view
     */
    private void addViewJson( JSONObject json, View view )
    {
        JSONObject jsonView = new JSONObject(  );
        jsonView.accumulate( KEY_ID , view.getId( ) );
        jsonView.accumulate( KEY_SERVERNAME, view.getServerName( ) );
        json.accumulate( KEY_VIEW, jsonView );
    }
}