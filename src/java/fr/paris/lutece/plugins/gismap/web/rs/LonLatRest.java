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

import fr.paris.lutece.plugins.gismap.business.LonLat;
import fr.paris.lutece.plugins.gismap.business.LonLatHome;
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
 
@Path( RestConstants.BASE_PATH + Constants.PLUGIN_PATH + Constants.LONLAT_PATH )
public class LonLatRest
{
    private static final String KEY_LONLATS = "lonlats";
    private static final String KEY_LONLAT = "lonlat";
    
    private static final String KEY_ID = "id";
    private static final String KEY_LONGITUDE = "longitude";
    
    @GET
    @Path( Constants.ALL_PATH )
    public Response getLonLats( @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getLonLatsJson();
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getLonLatsXml();
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
    public String getLonLatsXml( )
    {
        StringBuffer sbXML = new StringBuffer( XmlUtil.getXmlHeader() );
        Collection<LonLat> list = LonLatHome.getLonLatsList();
        
        XmlUtil.beginElement( sbXML , KEY_LONLATS );

        for ( LonLat lonlat : list )
        {
            addLonLatXml( sbXML, lonlat );
        }
        
        XmlUtil.endElement( sbXML , KEY_LONLATS );

        return sbXML.toString(  );
    }
    
    /**
     * Gets all resources list in JSON format
     * @return The list
     */
    public String getLonLatsJson( )
    {
        JSONObject jsonLonLat = new JSONObject(  );
        JSONObject json = new JSONObject(  );
        
        Collection<LonLat> list = LonLatHome.getLonLatsList();
        
        for ( LonLat lonlat : list )
        {
            addLonLatJson( jsonLonLat, lonlat );
        }
        
        json.accumulate( KEY_LONLATS, jsonLonLat );
        
        return json.toString( );
    }
    
    @GET
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response getLonLat( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept , @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        String entity;
        String mediaType;
        
        if ( (accept != null && accept.contains(MediaType.APPLICATION_JSON)) || (format != null && format.equals(Constants.MEDIA_TYPE_JSON)) )
        {
            entity = getLonLatJson( strId );
            mediaType = MediaType.APPLICATION_JSON;
        }
        else
        {
            entity = getLonLatXml( strId );
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
    public String getLonLatXml( String strId )
    {
        StringBuffer sbXML = new StringBuffer(  );
        
        try
        {
            int nId = Integer.parseInt( strId );
            LonLat lonlat = LonLatHome.findByPrimaryKey( nId );

            if ( lonlat != null )
            {
                sbXML.append( "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" );
                addLonLatXml( sbXML, lonlat );
            }
        }
        catch ( NumberFormatException e )
        {
            sbXML.append( XMLUtil.formatError( "Invalid lonlat number", 3 ) );
        }
        catch ( Exception e )
        {
            sbXML.append( XMLUtil.formatError( "LonLat not found", 1 ) );
        }

        return sbXML.toString(  );
    }
    
    /**
     * Gets a resource in JSON format
     * @param strId The resource ID
     * @return The JSON output
     */
    public String getLonLatJson( String strId )
    {
        JSONObject json = new JSONObject(  );
        String strJson = "";

        try
        {
            int nId = Integer.parseInt( strId );
            LonLat lonlat = LonLatHome.findByPrimaryKey( nId );

            if ( lonlat != null )
            {
                addLonLatJson( json, lonlat );
                strJson = json.toString( );
            }
        }
        catch ( NumberFormatException e )
        {
            strJson = JSONUtil.formatError( "Invalid lonlat number", 3 );
        }
        catch ( Exception e )
        {
            strJson = JSONUtil.formatError( "LonLat not found", 1 );
        }

        return strJson;
    }
    
    @DELETE
    @Path( "{" + Constants.ID_PATH + "}" )
    public Response deleteLonLat( @PathParam( Constants.ID_PATH ) String strId, @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format ) throws IOException
    {
        try
        {
            int nId = Integer.parseInt( strId );
            
            if ( LonLatHome.findByPrimaryKey( nId ) != null )
            {
                LonLatHome.remove( nId );
            }
        }
        catch ( NumberFormatException e )
        {
            AppLogService.error( "Invalid lonlat number" );
        }
        return getLonLats(accept, format);
    }
    
    @POST
    public Response createLonLat(
    @FormParam( KEY_ID ) String id,
    @FormParam( "longitude" ) String longitude, 
    @HeaderParam(HttpHeaders.ACCEPT) String accept, @QueryParam( Constants.FORMAT_QUERY ) String format) throws IOException
    {
        if( id != null )
        {
            int nId = Integer.parseInt( KEY_ID );

            LonLat lonlat = LonLatHome.findByPrimaryKey( nId );

            if ( lonlat != null )
            {
                lonlat.setLongitude( Integer.parseInt( longitude ) );
                LonLatHome.update( lonlat );
            }
        }
        else
        {
            LonLat lonlat = new LonLat( );
            
            lonlat.setLongitude( Integer.parseInt( longitude ) );
            LonLatHome.create( lonlat );
        }
        return getLonLats(accept, format);
    }
    
    /**
     * Write a lonlat into a buffer
     * @param sbXML The buffer
     * @param lonlat The lonlat
     */
    private void addLonLatXml( StringBuffer sbXML, LonLat lonlat )
    {
        XmlUtil.beginElement( sbXML, KEY_LONLAT );
        XmlUtil.addElement( sbXML, KEY_ID , lonlat.getId( ) );
        XmlUtil.addElement( sbXML, KEY_LONGITUDE , lonlat.getLongitude( ) );
        XmlUtil.endElement( sbXML, KEY_LONLAT );
    }
    
    /**
     * Write a lonlat into a JSON Object
     * @param json The JSON Object
     * @param lonlat The lonlat
     */
    private void addLonLatJson( JSONObject json, LonLat lonlat )
    {
        JSONObject jsonLonLat = new JSONObject(  );
        jsonLonLat.accumulate( KEY_ID , lonlat.getId( ) );
        jsonLonLat.accumulate( KEY_LONGITUDE, lonlat.getLongitude( ) );
        json.accumulate( KEY_LONLAT, jsonLonLat );
    }
}