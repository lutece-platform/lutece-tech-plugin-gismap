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

import fr.paris.lutece.portal.service.util.AppPropertiesService;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * DOCUMENT ME!
 *
 * @author kGrellier
 */
public class ProxyGeoServer extends HttpServlet
{
    
    public static final String PROXY_PREFIX = "proxyGeoServer";
    public static final String PARAMETER_WHITELIST = ".whitelist";
    public static final String PARAMETER_ENTRY_URL = ".url";
    
    private ServletContext servletContext;
    private Logger log;

    /**
     * List of url allowed by the proxy
     * (configured in /WEB-INF/conf/plugins/gismap_proxyGeoServer.properties)
     */
    private List<String> _whiteList;

    public void init( ServletConfig servletConfig ) throws ServletException
    {
        servletContext = servletConfig.getServletContext(  );
        log = Logger.getLogger( ProxyGeoServer.class.getName(  ) );
        _whiteList = new ArrayList<String>( );

        // Get the proxy whitelist entries
        String whitelist = AppPropertiesService.getProperty( PROXY_PREFIX + PARAMETER_WHITELIST );
        if ( !whitelist.isEmpty( ) )
        {
            String[] whitelistEntries = whitelist.split( "," );
            for ( String entry : whitelistEntries )
            {
                _whiteList.add( AppPropertiesService.getProperty( PROXY_PREFIX + "." + entry + PARAMETER_ENTRY_URL ) );
            }
        }
        else
        {
            log.info( "No configured whitelist on proxy." );
        }
    }

    public void doGet( HttpServletRequest request, HttpServletResponse response )
        throws ServletException, IOException
    {
        doPost( request, response );
    }

    public void doPost( HttpServletRequest request, HttpServletResponse response )
        throws ServletException
    {
        BufferedInputStream webToProxyBuf = null;
        BufferedOutputStream proxyToClientBuf = null;
        HttpURLConnection con;

        try
        {
            int statusCode;
            int oneByte;
            String methodName;
            String headerText;

            String urlString = request.getRequestURL(  ).toString(  );
            String queryString = request.getQueryString(  );

            urlString += ( ( queryString == null ) ? "" : ( "?" + queryString ) );
            urlString = request.getParameter( "url" );

            if ( !_whiteList.isEmpty( ) && !_whiteList.contains( urlString ) )
            {
                log.warning( "The given URL is not allowed by proxy : " + urlString );
                response.sendError( HttpServletResponse.SC_FORBIDDEN );
                return;
            }

            URL url = new URL( urlString );

            log.info( "Fetching >" + url.toString( ) );

            con = (HttpURLConnection) url.openConnection(  );

            methodName = request.getMethod(  );
            con.setRequestMethod( methodName );
            con.setDoOutput( true );
            con.setDoInput( true );
            con.setFollowRedirects( false );
            con.setUseCaches( true );

            for ( Enumeration e = request.getHeaderNames(  ); e.hasMoreElements(  ); )
            {
                String headerName = e.nextElement(  ).toString(  );
                con.setRequestProperty( headerName, request.getHeader( headerName ) );
            }

            con.connect(  );

            if ( methodName.equals( "POST" ) )
            {
                BufferedInputStream clientToProxyBuf = new BufferedInputStream( request.getInputStream(  ) );
                BufferedOutputStream proxyToWebBuf = new BufferedOutputStream( con.getOutputStream(  ) );

                while ( ( oneByte = clientToProxyBuf.read(  ) ) != -1 )
                    proxyToWebBuf.write( oneByte );

                proxyToWebBuf.flush(  );
                proxyToWebBuf.close(  );
                clientToProxyBuf.close(  );
            }

            statusCode = con.getResponseCode(  );
            response.setStatus( statusCode );

            for ( Iterator i = con.getHeaderFields(  ).entrySet(  ).iterator(  ); i.hasNext(  ); )
            {
                Map.Entry mapEntry = (Map.Entry) i.next(  );

                if ( mapEntry.getKey(  ) != null )
                {
                    response.setHeader( mapEntry.getKey(  ).toString(  ),
                        ( (List) mapEntry.getValue(  ) ).get( 0 ).toString(  ) );
                }
            }

            webToProxyBuf = new BufferedInputStream( con.getInputStream(  ) );
            proxyToClientBuf = new BufferedOutputStream( response.getOutputStream(  ) );

            while ( ( oneByte = webToProxyBuf.read(  ) ) != -1 )
                proxyToClientBuf.write( oneByte );

            proxyToClientBuf.flush(  );
            proxyToClientBuf.close(  );

            webToProxyBuf.close(  );
            con.disconnect(  );
        }
        catch ( IOException e )
        {
            throw new ServletException(  );
        }
        finally
        {
        }
    }
}
