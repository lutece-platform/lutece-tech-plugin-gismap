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

import fr.paris.lutece.plugins.rest.service.RestConstants;
import fr.paris.lutece.portal.service.util.AppLogService;

import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import org.eclipse.microprofile.config.inject.ConfigProperty;

/**
 * Proxy forwarding a GET request to the GIS server given in the url parameter.
 */
@ApplicationScoped
@Path( RestConstants.BASE_PATH + "gismapp/gisproxy/" )
public class GisProxy
{
    private static final String PROPERTY_HTTP_PROXY_HOST = "gismap.gisproxy.host";
    private static final String PROPERTY_HTTP_PROXY_PORT = "gismap.gisproxy.port";
    private static final String PROPERTY_HTTP_NOPROXYFOR = "gismap.gisproxy.noProxyFor";
    private static final String CLIENT_PROXY_HOST = "com.ibm.ws.jaxrs.client.proxy.host";
    private static final String CLIENT_PROXY_PORT = "com.ibm.ws.jaxrs.client.proxy.port";
    private static final String PARAMETER_URL = "url=";
    private static final String HTTP_HEADER_CONTENT_TYPE = "Content-Type";
    private static final String HTTP_HEADER_ACCESS_CTRL_ALLOW_ORGIN = "Access-Control-Allow-Origin";
    private static final String HTTP_HEADER_ACCESS_CTRL_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
    private static final String HTTP_HEADER_ACCESS_CTRL_ALLOW_METHODS = "Access-Control-Allow-Methods";

    private final Client _client = ClientBuilder.newClient( );

    @Inject
    @ConfigProperty( name = PROPERTY_HTTP_PROXY_HOST )
    private Optional<String> _strProxyHost;

    @Inject
    @ConfigProperty( name = PROPERTY_HTTP_PROXY_PORT )
    private Optional<String> _strProxyPort;

    @Inject
    @ConfigProperty( name = PROPERTY_HTTP_NOPROXYFOR )
    private Optional<String> _strNoProxyFor;

    /**
     * Sets on the target the HTTP proxy configured for its host, unless the host matches gismap.gisproxy.noProxyFor.
     *
     * @param target
     *            the target of the request
     * @param strDecodedUrl
     *            the url of the target
     * @return the target
     * @throws MalformedURLException
     *             if the url is invalid
     */
    private WebTarget manageProxyConfiguration( WebTarget target, String strDecodedUrl ) throws MalformedURLException
    {
        String strHostname = new URL( strDecodedUrl ).getHost( );
        String strNoProxyFor = _strNoProxyFor.orElse( null );

        if ( strNoProxyFor != null && !strNoProxyFor.trim( ).isEmpty( ) )
        {
            for ( String strPattern : strNoProxyFor.split( "," ) )
            {
                if ( strHostname.matches( strPattern.trim( ) ) )
                {
                    return target;
                }
            }
        }

        String strProxyHost = _strProxyHost.orElse( null );
        String strProxyPort = _strProxyPort.orElse( null );

        if ( strProxyHost != null && !strProxyHost.trim( ).isEmpty( ) )
        {
            target.property( CLIENT_PROXY_HOST, strProxyHost.trim( ) );

            if ( strProxyPort != null && !strProxyPort.trim( ).isEmpty( ) )
            {
                target.property( CLIENT_PROXY_PORT, strProxyPort.trim( ) );
            }
        }

        return target;
    }

    /**
     * Builds the URI of an url, quoting the characters a URI does not allow (a JSON value in the query).
     *
     * @param strDecodedUrl
     *            the decoded url
     * @return the URI
     * @throws MalformedURLException
     *             if the url is invalid
     * @throws URISyntaxException
     *             if the URI cannot be built
     */
    private URI toUri( String strDecodedUrl ) throws MalformedURLException, URISyntaxException
    {
        URL url = new URL( strDecodedUrl );

        return new URI( url.getProtocol( ), url.getUserInfo( ), url.getHost( ), url.getPort( ), url.getPath( ), url.getQuery( ), url.getRef( ) );
    }

    /**
     * Forwards the request to the url given after url= in the query string and returns its content with its content
     * type.
     *
     * @param uriInfo
     *            the request uri
     * @return the response of the GIS server, or null on error
     */
    @GET
    public Response sendGisRequest( @Context UriInfo uriInfo )
    {
        AppLogService.debug( "Enter the sendGisRequest function ..." );

        Response responseToReturn = null;

        try
        {
            String strUrl = uriInfo.getRequestUri( ).getQuery( );
            strUrl = strUrl.substring( PARAMETER_URL.length( ) );

            if ( strUrl.indexOf( "?" ) < 0 )
            {
                strUrl = strUrl.replaceFirst( "&", "?" );
            }

            String strDecodedUrl = URLDecoder.decode( strUrl, StandardCharsets.UTF_8 );

            AppLogService.debug( "decodedUrl={}", strDecodedUrl );

            WebTarget target = manageProxyConfiguration( _client.target( toUri( strDecodedUrl ) ), strDecodedUrl );
            Response response = target.request( MediaType.WILDCARD ).get( );

            String strContentType = response.getHeaderString( HTTP_HEADER_CONTENT_TYPE );

            if ( strContentType == null )
            {
                response.close( );
                throw new IllegalStateException( "No content type in the response of " + strDecodedUrl );
            }

            responseToReturn = Response.status( Response.Status.OK ).header( HTTP_HEADER_ACCESS_CTRL_ALLOW_ORGIN, "*" )
                    .header( HTTP_HEADER_ACCESS_CTRL_ALLOW_CREDENTIALS, "false" )
                    .header( HTTP_HEADER_ACCESS_CTRL_ALLOW_METHODS, "GET, POST, DELETE, PUT" ).header( HTTP_HEADER_CONTENT_TYPE, strContentType )
                    .entity( response.readEntity( InputStream.class ) ).build( );
        }
        catch( Exception e )
        {
            AppLogService.error( "Error when treating url, exception:{}", e.getMessage( ) );
        }

        AppLogService.debug( "Exit the sendGisRequest function" );

        return responseToReturn;
    }

    /**
     * Closes the HTTP client.
     */
    @PreDestroy
    public void close( )
    {
        _client.close( );
    }
}
