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
package fr.paris.lutece.plugins.gismap.utils;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;

import fr.paris.lutece.plugins.directory.business.Directory;
import fr.paris.lutece.plugins.directory.business.DirectoryHome;
import fr.paris.lutece.plugins.directory.business.EntryFilter;
import fr.paris.lutece.plugins.directory.business.EntryHome;
import fr.paris.lutece.plugins.directory.business.Field;
import fr.paris.lutece.plugins.directory.business.IEntry;
import fr.paris.lutece.plugins.directory.service.DirectoryPlugin;
import fr.paris.lutece.plugins.gismap.business.IViewDAO;
import fr.paris.lutece.plugins.gismap.business.View;
import fr.paris.lutece.plugins.gismap.business.ViewHome;
import fr.paris.lutece.plugins.gismap.service.GismapPlugin;
import fr.paris.lutece.portal.service.plugin.PluginService;
import fr.paris.lutece.portal.service.spring.SpringContextService;
import fr.paris.lutece.portal.service.util.AppPropertiesService;
import fr.paris.lutece.util.ReferenceList;

// TODO: Auto-generated Javadoc
/**
 * Utility class for plugin Gismap.
 */
public final class GismapUtils
{

    /** The Constant GISMAP_VIEW. */
    public static final String GISMAP_VIEW      = "gismap.view.";

    /** The Constant GISMAP_PARAMETER. */
    public static final String GISMAP_PARAMETER = ".parameter";

    // Static variable pointed at the DAO instance
    private static IViewDAO    _dao             = ( IViewDAO ) SpringContextService.getPluginBean( GismapPlugin.PLUGIN_NAME, "viewDAO" );

    /**
     * GismapUtils.
     */
    private GismapUtils( )
    {
    }

    /**
     * Récupère la liste des vues présentes dans les fichiers de properties.
     *
     * @return the list id view
     */
    public static List<String> getListIdView( )
    {
        List<String> listIdMap = new ArrayList<>( );
        Properties props = AppPropertiesService.getProperties( );

        for ( Enumeration<?> e = props.propertyNames( ); e.hasMoreElements( ); )
        {
            String name = ( String ) e.nextElement( );
            if ( name.startsWith( GISMAP_VIEW ) && !listIdMap.contains( name.substring( name.indexOf( GISMAP_VIEW ) + GISMAP_VIEW.length( ), name.indexOf( GISMAP_PARAMETER ) ) ) )
            {
                listIdMap.add( name.substring( name.indexOf( GISMAP_VIEW ) + GISMAP_VIEW.length( ), name.indexOf( GISMAP_PARAMETER ) ) );
            }
        }
        return listIdMap;
    }

    /**
     * Load the data of all view.
     *
     * @return a reference list of view
     */
    public static ReferenceList getViewList( )
    {
        List<View> listViews = ViewHome.findAll( );

        ReferenceList refListViews = new ReferenceList( );

        for ( View view : listViews )
        {
            refListViews.addItem( view.getId( ), String.valueOf( view.getId( ) ) );
        }

        return refListViews;
    }

    /**
     * Gets the nb view by directory id.
     *
     * @param directoryId the directory id
     * @return the nb view by directory id
     */
    public static String getNbViewByDirectoryId( int directoryId )
    {
        String nbView = "";

        Directory directory = DirectoryHome.findByPrimaryKey( directoryId, PluginService.getPlugin( DirectoryPlugin.PLUGIN_NAME ) );
        EntryFilter filter = new EntryFilter( );
        filter.setIdDirectory( directory.getIdDirectory( ) );
        filter.setIsComment( EntryFilter.FILTER_FALSE );
        filter.setIsEntryParentNull( EntryFilter.FILTER_TRUE );

        List<IEntry> listEntry = new ArrayList<>( );

        List<IEntry> listEntryFirstLevel = EntryHome.getEntryList( filter, PluginService.getPlugin( DirectoryPlugin.PLUGIN_NAME ) );

        filter.setIsEntryParentNull( EntryFilter.ALL_INT );

        for ( IEntry entry : listEntryFirstLevel )
        {
            if ( !entry.getEntryType( ).getGroup( ) )
            {
                listEntry.add( EntryHome.findByPrimaryKey( entry.getIdEntry( ), PluginService.getPlugin( DirectoryPlugin.PLUGIN_NAME ) ) );
            }

            filter.setIdEntryParent( entry.getIdEntry( ) );

            List<IEntry> listChildren = EntryHome.getEntryList( filter, PluginService.getPlugin( DirectoryPlugin.PLUGIN_NAME ) );

            for ( IEntry entryChild : listChildren )
            {
                listEntry.add( EntryHome.findByPrimaryKey( entryChild.getIdEntry( ), PluginService.getPlugin( DirectoryPlugin.PLUGIN_NAME ) ) );
            }
        }

        for ( IEntry entry : listEntry )
        {
            if ( "fr.paris.lutece.plugins.directory.business.EntryTypeGeolocation".equals( entry.getEntryType( ).getClassName( ) ) )
            {
                for ( Field field : entry.getFields( ) )
                {
                    if ( "viewNumberGes".equals( field.getTitle( ) ) )
                    {
                        nbView = field.getValue( );
                    }
                }
            }
        }
        return nbView;
    }

    /**
     * Gets the record field.
     *
     * @param directoryId the directory id
     * @return the record field
     */
    public static String getRecordField( int directoryId )
    {
        String recordFields = "";
        List<String> listRecordField = _dao.findListRecordField( directoryId );
        for ( String recordField : listRecordField )
        {
            if ( "".equals( recordFields ) )
            {
                recordFields = recordField;
            } else
            {
                recordFields += "," + recordField;
            }
        }
        return recordFields;
    }
}
