/**
 * 
 */
package fr.paris.lutece.plugins.gismap.business;

import java.util.List;

import fr.paris.lutece.portal.service.plugin.Plugin;

/**
 * @author bass
 *
 */
public interface IGeometryDAO 
{
	/**
     * Insert a new record in the table.
     *
     * @param geometry instance of the Category object to insert
     * @param plugin the plugin
     */
    void insert( Geometry geometry, Plugin plugin );

    /**
     * update record in the table.
     *
     * @param geometry instance of the Geometry object to update
     * @param plugin the plugin
     */
    void store( Geometry geometry, Plugin plugin );

    /**
     * Delete a record from the table
     *
     * @param  nIdgeometry The identifier of the geometry
     * @param plugin the plugin
     */
    void delete( int nIdGeometry, Plugin plugin );

    /**
     * Load the data of the geometry from the table
     *
     * @param idKey The identifier of the geometry
     * @param plugin the plugin
     * @return The geometry
     */
    Geometry load( int idKey, Plugin plugin );

    /**
     * Load the data of all geometry returns them in a  list
     * @param plugin the plugin
     * @return  the list of geometry
     */
    List<Geometry> select( Plugin plugin );


}
