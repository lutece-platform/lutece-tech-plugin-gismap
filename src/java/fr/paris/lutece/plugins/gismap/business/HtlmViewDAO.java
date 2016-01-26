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
 * This class provides Data Access methods for HtlmView objects
 */

public final class HtlmViewDAO implements IHtlmViewDAO
{
    // Constants
    private static final String SQL_QUERY_NEW_PK = "SELECT max( id_htlmview ) FROM gismap_html_view";
    private static final String SQL_QUERY_SELECT = "SELECT id_htlmview, serverName FROM gismap_html_view WHERE id_htlmview = ?";
    private static final String SQL_QUERY_INSERT = "INSERT INTO gismap_html_view ( id_htlmview, serverName ) VALUES ( ?, ? ) ";
    private static final String SQL_QUERY_DELETE = "DELETE FROM gismap_html_view WHERE id_htlmview = ? ";
    private static final String SQL_QUERY_UPDATE = "UPDATE gismap_html_view SET id_htlmview = ?, serverName = ? WHERE id_htlmview = ?";
    private static final String SQL_QUERY_SELECTALL = "SELECT id_htlmview, serverName FROM gismap_html_view";
    private static final String SQL_QUERY_SELECTALL_ID = "SELECT id_htlmview FROM gismap_html_view";

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
    public void insert( HtlmView htlmView, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_INSERT, plugin );

        htlmView.setId( newPrimaryKey( plugin ) );

        daoUtil.setInt( 1, htlmView.getId( ) );
        daoUtil.setString( 2, htlmView.getServerName( ) );

        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public HtlmView load( int nKey, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECT, plugin );
        daoUtil.setInt( 1 , nKey );
        daoUtil.executeQuery( );

        HtlmView htlmView = null;

        if ( daoUtil.next( ) )
        {
            htlmView = new HtlmView();
            htlmView.setId( daoUtil.getInt( 1 ) );
            htlmView.setServerName( daoUtil.getString( 2 ) );
        }

        daoUtil.free( );
        return htlmView;
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
    public void store( HtlmView htlmView, Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_UPDATE, plugin );
        
        daoUtil.setInt( 1, htlmView.getId( ) );
        daoUtil.setString( 2, htlmView.getServerName( ) );
        daoUtil.setInt( 3, htlmView.getId( ) );

        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * {@inheritDoc }
     */
    @Override
    public Collection<HtlmView> selectHtlmViewsList( Plugin plugin )
    {
        Collection<HtlmView> htlmViewList = new ArrayList<HtlmView>(  );
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECTALL, plugin );
        daoUtil.executeQuery(  );

        while ( daoUtil.next(  ) )
        {
            HtlmView htlmView = new HtlmView(  );
            
            htlmView.setId( daoUtil.getInt( 1 ) );
                htlmView.setServerName( daoUtil.getString( 2 ) );

            htlmViewList.add( htlmView );
        }

        daoUtil.free( );
        return htlmViewList;
    }
    
    /**
     * {@inheritDoc }
     */
    @Override
    public Collection<Integer> selectIdHtlmViewsList( Plugin plugin )
    {
            Collection<Integer> htlmViewList = new ArrayList<Integer>( );
            DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECTALL_ID, plugin );
            daoUtil.executeQuery(  );

            while ( daoUtil.next(  ) )
            {
                htlmViewList.add( daoUtil.getInt( 1 ) );
            }

            daoUtil.free( );
            return htlmViewList;
    }
}