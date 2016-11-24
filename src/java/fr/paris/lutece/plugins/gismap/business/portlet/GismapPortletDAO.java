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
package fr.paris.lutece.plugins.gismap.business.portlet;

import fr.paris.lutece.portal.business.portlet.Portlet;
import fr.paris.lutece.util.sql.DAOUtil;

/**
 * This class provides Data Access methods for ArticlesListPortlet objects
 */
public final class GismapPortletDAO implements IGismapPortletDAO
{
    private static final String SQL_QUERY_INSERT                          = "INSERT INTO gismap_portlet ( id_portlet , id_directory ) VALUES ( ? , ? )";
    private static final String SQL_QUERY_SELECT                          = "SELECT id_portlet , id_directory FROM gismap_portlet WHERE id_portlet = ? ";
    private static final String SQL_QUERY_SELECT_COUNT_PORTLET_BY_ID_FORM = "SELECT COUNT(id_portlet )FROM form_portlet WHERE id_form = ? ";
    private static final String SQL_QUERY_UPDATE                          = "UPDATE gismap_portlet SET id_portlet = ?, id_directory = ? WHERE id_portlet = ? ";
    private static final String SQL_QUERY_DELETE                          = "DELETE FROM gismap_portlet WHERE id_portlet= ? ";

    // /////////////////////////////////////////////////////////////////////////////////////
    // Access methods to data

    /**
     * Insert a new record in the table form_portlet
     *
     *
     * @param portlet the instance of the Portlet object to insert
     */
    @Override
    public void insert( Portlet portlet )
    {
        GismapPortlet p = ( GismapPortlet ) portlet;

        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_INSERT );
        daoUtil.setInt( 1, p.getId( ) );
        daoUtil.setInt( 2, p.getDirectoryId( ) );

        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * Deletes records for a portlet identifier in the table form_portlet
     *
     *
     * @param nPortletId the portlet identifier
     */
    @Override
    public void delete( int nPortletId )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_DELETE );
        daoUtil.setInt( 1, nPortletId );
        daoUtil.executeUpdate( );
        daoUtil.free( );
    }

    /**
     * Loads the data of Form Portlet whose identifier is specified in parameter
     *
     *
     * @param nPortletId The Portlet identifier
     * @return theDocumentListPortlet object
     */
    @Override
    public Portlet load( int nPortletId )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECT );
        daoUtil.setInt( 1, nPortletId );
        daoUtil.executeQuery( );

        GismapPortlet portlet = new GismapPortlet( );

        if ( daoUtil.next( ) )
        {
            portlet.setId( daoUtil.getInt( 1 ) );
            portlet.setDirectoryId( daoUtil.getInt( 2 ) );
        }

        daoUtil.free( );

        return portlet;
    }

    /**
     * return number of form portlet who are associate to the id form
     * @param nIdForm the id of the form
     * @return number of form portlet who are associate to the id form
     */
    /*
     * @Override public int selectCountPortletByIdForm( int nIdForm ) { int nCountPortlet = 0; DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECT_COUNT_PORTLET_BY_ID_FORM ); daoUtil.setInt( 1, nIdForm ); daoUtil.executeQuery( );
     *
     * if ( daoUtil.next( ) ) { nCountPortlet = daoUtil.getInt( 1 ); }
     *
     * daoUtil.free( );
     *
     * return nCountPortlet; }
     */

    /**
     * Update the record in the table
     *
     *
     * @param portlet A portlet
     */
    @Override
    public void store( Portlet portlet )
    {
        GismapPortlet p = ( GismapPortlet ) portlet;
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_UPDATE );
        daoUtil.setInt( 1, p.getId( ) );
        daoUtil.setInt( 2, p.getDirectoryId( ) );
        daoUtil.setInt( 3, p.getId( ) );
        daoUtil.executeUpdate( );
        daoUtil.free( );
    }
}
