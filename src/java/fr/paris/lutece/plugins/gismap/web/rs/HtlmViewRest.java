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

import fr.paris.lutece.plugins.gismap.business.HtlmView;
import fr.paris.lutece.plugins.gismap.business.HtlmViewHome;
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
 
@Path( RestConstants.BASE_PATH + Constants.PLUGIN_PATH + Constants.HTLMVIEW_PATH )
public class HtlmViewRest
{
    private static final String KEY_HTLMVIEWS = "htlmviews";
    private static final String KEY_HTLMVIEW = "htlmview";
    
    private static final String KEY_ID = "id";
    private static final String KEY_SERVERNAME = "servername";
    
    @GET
    @Path( Constants.ALL_PATH )
    public Response getHtlmViews( @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getHtlmViewsJson();
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getHtlmViewsXml();
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
    public String getHtlmViewsXml( )
    {
        StringBuffer sbXML = new StringBuffer( XmlUtil.getXmlHeader() );
        Collection<HtlmView> list = HtlmViewHome.getHtlmViewsList();
        
        XmlUtil.beginElement( sbXML , KEY_HTLMVIEWS );

        for ( HtlmView htlmview : list )
        {
            addHtlmViewXml( sbXML, htlmview );
        }
        
        XmlUtil.endElement( sbXML , KEY_HTLMVIEWS );

        return sbXML.toString(  );
    }
    
    /**
     * Gets all resources list in JSON format
     * @return The list
     */
    public String getHtlmViewsJson( )
    {
        JSONObject jsonHtlmView = new JSONObject(  );
        JSONObject json = new JSONObject(  );
        
        Collection<HtlmView> list = HtlmViewHome.getHtlmViewsList();
        
        for ( HtlmView htlmview : list )
        {
            addHtlmViewJson( jsonHtlmView, htlmview );
        }
        
        json.accumulate( KEY_HTLMVIEWS, jsonHtlmView );
        
        return json.toString( );
    }
    
    @GET
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response getHtlmView( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getHtlmViewJson( strId );
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getHtlmViewXml( strId );
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
    public String getHtlmViewXml( String strId )
    {
        StringBuffer sbXML = new StringBuffer(  );
        
        try
        {
            int nId = Integer.parseInt( strId );
            HtlmView htlmview = HtlmViewHome.findByPrimaryKey( nId );

            if ( htlmview != null )
            {
                sbXML.append( "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" );
                addHtlmViewXml( sbXML, htlmview );
            }
        }
        catch ( NumberFormatException e )
        {
            sbXML.append( XMLUtil.formatError( "Invalid htlmview number", 3 ) );
        }
        catch ( Exception e )
        {
            sbXML.append( XMLUtil.formatError( "HtlmView not found", 1 ) );
        }

        return sbXML.toString(  );
    }
    
    /**
     * Gets a resource in JSON format
     * @param strId The resource ID
     * @return The JSON output
     */
    public String getHtlmViewJson( String strId )
    {
        JSONObject json = new JSONObject(  );
        String strJson = "";

        try
        {
            int nId = Integer.parseInt( strId );
            HtlmView htlmview = HtlmViewHome.findByPrimaryKey( nId );

            if ( htlmview != null )
            {
                addHtlmViewJson( json, htlmview );
                strJson = json.toString( );
            }
        }
        catch ( NumberFormatException e )
        {
            strJson = JSONUtil.formatError( "Invalid htlmview number", 3 );
        }
        catch ( Exception e )
        {
            strJson = JSONUtil.formatError( "HtlmView not found", 1 );
        }

        return strJson;
    }
    
    @DELETE
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response deleteHtlmView( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        try
        {
            int nId = Integer.parseInt( strId );
            
            if ( HtlmViewHome.findByPrimaryKey( nId ) != null )
            {
                HtlmViewHome.remove( nId );
            }
        }
        catch ( NumberFormatException e )
        {
            AppLogService.error( "Invalid htlmview number" );
        }
        return getHtlmViews(accept, format);
    }
    
    @POST
    public Response createHtlmView(
    @FormParam( KEY_ID ) String id,
    @FormParam( "servername" ) String servername, 
    @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format) throws IOException
    {
        if( id != null )
        {
            int nId = Integer.parseInt( KEY_ID );

            HtlmView htlmview = HtlmViewHome.findByPrimaryKey( nId );

            if ( htlmview != null )
            {
                htlmview.setServerName( servername );
                HtlmViewHome.update( htlmview );
            }
        }
        else
        {
            HtlmView htlmview = new HtlmView( );
            
            htlmview.setServerName( servername );
            HtlmViewHome.create( htlmview );
        }
        return getHtlmViews(accept, format);
    }
    
    /**
     * Write a htlmview into a buffer
     * @param sbXML The buffer
     * @param htlmview The htlmview
     */
    private void addHtlmViewXml( StringBuffer sbXML, HtlmView htlmview )
    {
        XmlUtil.beginElement( sbXML, KEY_HTLMVIEW );
        XmlUtil.addElement( sbXML, KEY_ID , htlmview.getId( ) );
        XmlUtil.addElement( sbXML, KEY_SERVERNAME , htlmview.getServerName( ) );
        XmlUtil.endElement( sbXML, KEY_HTLMVIEW );
    }
    
    /**
     * Write a htlmview into a JSON Object
     * @param json The JSON Object
     * @param htlmview The htlmview
     */
    private void addHtlmViewJson( JSONObject json, HtlmView htlmview )
    {
        JSONObject jsonHtlmView = new JSONObject(  );
        jsonHtlmView.accumulate( KEY_ID , htlmview.getId( ) );
        jsonHtlmView.accumulate( KEY_SERVERNAME, htlmview.getServerName( ) );
        json.accumulate( KEY_HTLMVIEW, jsonHtlmView );
    }
}