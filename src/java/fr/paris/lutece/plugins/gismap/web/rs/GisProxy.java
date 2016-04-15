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
package fr.paris.lutece.plugins.gismap.web.rs;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.spi.container.ContainerRequest;

import fr.paris.lutece.portal.service.util.AppLogService;
import fr.paris.lutece.portal.service.util.AppPropertiesService;

import java.io.InputStream;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;


@Path( "/rest/gismapp/gisproxy/" )
public class GisProxy
{
    final static private String PROPERTY_HTTP_PROXY_HOST = "gismap.gisproxy.host";
    final static private String PROPERTY_HTTP_PROXY_PORT = "gismap.gisproxy.port";
    final static private String SYSTEM_HTTP_PROXY_HOST = "http.proxyHost";
    final static private String SYSTEM_HTTP_PROXY_PORT = "http.proxyPort";
    final static private String SYSTEM_HTTP_NOPROXYFOR = "http.noProxyFor";
    final static private String PARAMETER_URL = "url=";
    final static private String CODAGE_UTF_8 = "UTF-8";
    final static private String HTTP_HEADER_CONTENT_TYPE = "Content-Type";
    final static private String HTTP_HEADER_ACCESS_CTRL_ALLOW_ORGIN = "Access-Control-Allow-Origin";
    final static private String HTTP_HEADER_ACCESS_CTRL_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
    final static private String HTTP_HEADER_ACCESS_CTRL_ALLOW_METHODS = "Access-Control-Allow-Methods";

    private void manageProxyConfiguration( String decodedUrl )
        throws MalformedURLException
    {
        URL url = new URL( decodedUrl );
        String hostname = url.getHost(  );

        String[] _listHostnames = null;
        String strPropertyHttpNoProxyFor = AppPropertiesService.getProperty( SYSTEM_HTTP_NOPROXYFOR );

        if ( strPropertyHttpNoProxyFor != null )
        {
            if ( !( strPropertyHttpNoProxyFor.trim(  ).equals( "" ) ) )
            {
                _listHostnames = strPropertyHttpNoProxyFor.split( "," );
            }
        }

        boolean matchNoProxy = false;

        if ( _listHostnames != null )
        {
            for ( int i = 0; i < _listHostnames.length; i++ )
            {
                if ( hostname.matches( _listHostnames[i].trim(  ) ) )
                {
                    matchNoProxy = true;

                    break;
                }
            }
        }

        System.clearProperty( SYSTEM_HTTP_PROXY_HOST );
        System.clearProperty( SYSTEM_HTTP_PROXY_PORT );

        if ( !matchNoProxy )
        {
            String strPropertyHttpProxyHost = AppPropertiesService.getProperty( PROPERTY_HTTP_PROXY_HOST );
            String strPropertyHttpProxyPort = AppPropertiesService.getProperty( PROPERTY_HTTP_PROXY_PORT );

            if ( strPropertyHttpProxyHost != null )
            {
                if ( !( strPropertyHttpProxyHost.trim(  ).equals( "" ) ) )
                {
                    System.setProperty( SYSTEM_HTTP_PROXY_HOST, strPropertyHttpProxyHost );
                }
            }

            if ( strPropertyHttpProxyPort != null )
            {
                if ( !( strPropertyHttpProxyPort.trim(  ).equals( "" ) ) )
                {
                    System.setProperty( SYSTEM_HTTP_PROXY_PORT, strPropertyHttpProxyPort );
                }
            }
        }
    }

    @GET
    public Response sendGisRequest( @Context
    Request request )
    {
        AppLogService.info( "Enter the sendGisRequest function ..." );

        Response responseToReturn = null;

        try
        {
            String url = ( (ContainerRequest) request ).getRequestUri(  ).getQuery(  );
            url = url.substring( PARAMETER_URL.length(  ) );

            int index = url.indexOf( "?" );

            if ( index < 0 )
            {
                url = url.replaceFirst( "&", "?" );
            }

            String decodedUrl = URLDecoder.decode( url, CODAGE_UTF_8 );

            AppLogService.info( "decodedUrl=" + decodedUrl );

            manageProxyConfiguration( decodedUrl );

            Client client = Client.create(  );
            WebResource webResource = client.resource( decodedUrl );
            webResource.accept( MediaType.MEDIA_TYPE_WILDCARD );

            ClientResponse response = webResource.get( ClientResponse.class );

            String contentType = "" + response.getHeaders(  ).get( HTTP_HEADER_CONTENT_TYPE ).get( 0 );

            responseToReturn = Response.status( Response.Status.OK ).header( HTTP_HEADER_ACCESS_CTRL_ALLOW_ORGIN, "*" )
                                       .header( HTTP_HEADER_ACCESS_CTRL_ALLOW_CREDENTIALS, "false" )
                                       .header( HTTP_HEADER_ACCESS_CTRL_ALLOW_METHODS, "GET, POST, DELETE, PUT" )
                                       .header( HTTP_HEADER_CONTENT_TYPE, contentType )
                                       .entity( response.getEntity( InputStream.class ) ).build(  );
        }
        catch ( Exception e )
        {
            AppLogService.error( "Error when treating url, exception:" + e.getMessage(  ) );
        }

        AppLogService.info( "Exit the sendGisRequest function" );

        return responseToReturn;
    }
}
