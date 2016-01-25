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
import fr.paris.lutece.util.sql.DAOUtil;

import java.util.ArrayList;
import java.util.Collection;

/**
 * This class provides Data Access methods for LonLat objects
 */

public final class LonLatDAO implements ILonLatDAO
{
    // Constants
    private static final String SQL_QUERY_NEW_PK = "SELECT max( id_lonlat ) FROM gismap_lonlat";
    private static final String SQL_QUERY_SELECT = "SELECT id_lonlat, longitude FROM gismap_lonlat WHERE id_lonlat = ?";
    private static final String SQL_QUERY_INSERT = "INSERT INTO gismap_lonlat ( id_lonlat, longitude ) VALUES ( ?, ? ) ";
    private static final String SQL_QUERY_DELETE = "DELETE FROM gismap_lonlat WHERE id_lonlat = ? ";
    private static final String SQL_QUERY_UPDATE = "UPDATE gismap_lonlat SET id_lonlat = ?, longitude = ? WHERE id_lonlat = ?";
    private static final String SQL_QUERY_SELECTALL = "SELECT id_lonlat, longitude FROM gismap_lonlat";
    private static final String SQL_QUERY_SELECTALL_ID = "SELECT id_lonlat FROM gismap_lonlat";

    /**
     * Generates a new primary key
     * @param plugin The Plugin
     * @return The new primary key
     */
    public int newPrimaryKey( Plugin plugin)
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_NEW_PK , plugin  );
        daoUtil.executeQuery( );

        int nKey = 1;

        if( daoUtil.next( ) )
        {
                nKey = daoUtil.getInt( 1 ) + 1;
        }

        daoUtil.free();

        return nKey;
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public void insert( LonLat lonLat, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_INSERT, plugin );

        lonLat.setId( newPrimaryKey( plugin ) );

        daoUtil.setInt( 1, lonLat.getId( ) );
        daoUtil.setInt( 2, lonLat.getLongitude( ) );

        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public LonLat load( int nKey, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECT, plugin );
        daoUtil.setInt( 1 , nKey );
        daoUtil.executeQuery( );

        LonLat lonLat = null;

        if ( daoUtil.next( ) )
        {
            lonLat = new LonLat();
            lonLat.setId( daoUtil.getInt( 1 ) );
            lonLat.setLongitude( daoUtil.getInt( 2 ) );
        }

        daoUtil.free( );
        return lonLat;
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public void delete( int nKey, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_DELETE, plugin );
        daoUtil.setInt( 1 , nKey );
        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public void store( LonLat lonLat, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_UPDATE, plugin );
        
        daoUtil.setInt( 1, lonLat.getId( ) );
        daoUtil.setInt( 2, lonLat.getLongitude( ) );
        daoUtil.setInt( 3, lonLat.getId( ) );

        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public Collection<LonLat> selectLonLatsList( Plugin plugin )
    {
        Collection<LonLat> lonLatList = new ArrayList<LonLat>(  );
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECTALL, plugin );
        daoUtil.executeQuery(  );

        while ( daoUtil.next(  ) )
        {
            LonLat lonLat = new LonLat(  );
            
            lonLat.setId( daoUtil.getInt( 1 ) );
                lonLat.setLongitude( daoUtil.getInt( 2 ) );

            lonLatList.add( lonLat );
        }

        daoUtil.free( );
        return lonLatList;
    }
    
    /**
     * {@inheritDoc }
     */
    @Override
    public Collection<Integer> selectIdLonLatsList( Plugin plugin )
    {
            Collection<Integer> lonLatList = new ArrayList<Integer>( );
            DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECTALL_ID, plugin );
            daoUtil.executeQuery(  );

            while ( daoUtil.next(  ) )
            {
                lonLatList.add( daoUtil.getInt( 1 ) );
            }

            daoUtil.free( );
            return lonLatList;
    }
}