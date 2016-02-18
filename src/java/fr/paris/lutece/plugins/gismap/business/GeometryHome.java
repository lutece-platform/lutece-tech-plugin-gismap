package fr.paris.lutece.plugins.gismap.business;

import java.util.List;

import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.portal.service.plugin.PluginService;
import fr.paris.lutece.portal.service.spring.SpringContextService;

public final class GeometryHome 
{
	private static IGeometryDAO _dao = SpringContextService.getBean( "gismap.geometryDAO" );
	private static Plugin _plugin = PluginService.getPlugin( "gismap" );

    /**
     * Private constructor - this class need not be instantiated
     */
    private GeometryHome(  )
    {
    }

    /**
     * Creation of an instance of  geometry
     *
     * @param geometry The instance of the Category which contains the informations to store
     */
    public static void create( Geometry geometry)
    {
        _dao.insert( geometry, _plugin );
    }

    /**
     * Update of the geometry which is specified in parameter
     *
     * @param geometry The instance of the Category which contains the informations to update
     */
    public static void update( Geometry geometry )
    {
        _dao.store( geometry, _plugin );
    }

    /**
     * Remove the geometry whose identifier is specified in parameter
     *
     * @param nIdGeometry The geometry Id
     */
    public static void remove( int nIdGeometry )
    {
        _dao.delete( nIdGeometry, _plugin );
    }

    /**
     * Returns an instance of a category whose identifier is specified in parameter
     *
     * @param idKey The geometry primary key
     * @return an instance of geometry
     */
    public static Geometry findByPrimaryKey( int idKey )
    {
        return _dao.load( idKey, _plugin );
    }

    /**
        * Returns a list of all category
        *
        * @return  the list of category
        */
    public static List<Geometry> getList(  )
    {
        return _dao.select( _plugin );
    }

    public static Geometry findResponseValueByKey( String strKey )
    {
        return _dao.load( strKey, _plugin );
    }
}
