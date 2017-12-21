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
package fr.paris.lutece.plugins.gismap.business;

import java.util.ArrayList;
import java.util.List;

import fr.paris.lutece.plugins.gismap.utils.GismapUtils;
import fr.paris.lutece.util.sql.DAOUtil;

/**
 * This class provides Data Access methods for View objects
 */
public final class ViewDAO implements IViewDAO
{
    private static final String MAP_TEMPLATE                  = "/admin/plugins/gismap/include/map_gismap.html";
    private static final String SQL_QUERY_SELECT_RECORD_FIELD = "select id_record_field " + "from directory_record_field field "
            + "inner join directory_record reccord on reccord.id_record = field.id_record " + "where reccord.id_directory=? ";

    @Override
    public View findById( int nKey )
    {
        View view = new View( );
        view.setId( nKey );
        view.setMapTemplateFile( MAP_TEMPLATE );
        view.setMapParameter( MapParameterHome.findByPrimaryKey( nKey ) );
        view.setAddressParam( AddressParamHome.getAddressParameters( ) );

        return view;
    }

    @Override
    public View findByCode( String strGismapCode )
    {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<View> findAll( )
    {
        List<View> listView = new ArrayList<>( );
        List<String> listIdMap = GismapUtils.getListIdView( );

        for ( String idMap : listIdMap )
        {
            listView.add( findById( Integer.parseInt( idMap ) ) );
        }
        return listView;
    }

}
