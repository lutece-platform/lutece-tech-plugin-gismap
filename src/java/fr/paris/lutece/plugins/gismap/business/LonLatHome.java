/*
 * Copyright (c) 2002-2015, Mairie de Paris
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice
 *	 and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice
 *	 and the following disclaimer in the documentation and/or other materials
 *	 provided with the distribution.
 *
 *  3. Neither the name of 'Mairie de Paris' nor 'Lutece' nor the names of its
 *	 contributors may be used to endorse or promote products derived from
 *	 this software without specific prior written permission.
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
 
package fr.paris.lutece.plugins.gismap.business;

import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.portal.service.plugin.PluginService;
import fr.paris.lutece.portal.service.spring.SpringContextService;
import java.util.Collection;

/**
 * This class provides instances management methods (create, find, ...) for LonLat objects
 */

public final class LonLatHome
{
    // Static variable pointed at the DAO instance

    private static ILonLatDAO _dao = SpringContextService.getBean( "gismap.lonLatDAO" );
    private static Plugin _plugin = PluginService.getPlugin( "gismap" );

    /**
     * Private constructor - this class need not be instantiated
     */
    private LonLatHome(  )
    {
    }

    /**
     * Create an instance of the lonLat class
     * @param lonLat The instance of the LonLat which contains the informations to store
     * @return The  instance of lonLat which has been created with its primary key.
     */
    public static LonLat create( LonLat lonLat )
    {
        _dao.insert( lonLat, _plugin );

        return lonLat;
    }

    /**
     * Update of the lonLat which is specified in parameter
     * @param lonLat The instance of the LonLat which contains the data to store
     * @return The instance of the  lonLat which has been updated
     */
    public static LonLat update( LonLat lonLat )
    {
        _dao.store( lonLat, _plugin );

        return lonLat;
    }

    /**
     * Remove the lonLat whose identifier is specified in parameter
     * @param nKey The lonLat Id
     */
    public static void remove( int nKey )
    {
        _dao.delete( nKey, _plugin );
    }

    ///////////////////////////////////////////////////////////////////////////
    // Finders

    /**
     * Returns an instance of a lonLat whose identifier is specified in parameter
     * @param nKey The lonLat primary key
     * @return an instance of LonLat
     */
    public static LonLat findByPrimaryKey( int nKey )
    {
        return _dao.load( nKey, _plugin);
    }

    /**
     * Load the data of all the lonLat objects and returns them in form of a collection
     * @return the collection which contains the data of all the lonLat objects
     */
    public static Collection<LonLat> getLonLatsList( )
    {
        return _dao.selectLonLatsList( _plugin );
    }
    
    /**
     * Load the id of all the lonLat objects and returns them in form of a collection
     * @return the collection which contains the id of all the lonLat objects
     */
    public static Collection<Integer> getIdLonLatsList( )
    {
        return _dao.selectIdLonLatsList( _plugin );
    }
}

