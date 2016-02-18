package fr.paris.lutece.plugins.gismap.business;

import java.util.ArrayList;
import java.util.List;

import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.util.sql.DAOUtil;

public class GeometryDAO implements IGeometryDAO 
{
	private static final String SQL_QUERY_NEW_PK = "SELECT max( id) FROM gismap_geometry";
    private static final String SQL_QUERY_FIND_BY_PRIMARY_KEY = "SELECT id,ST_AsText(geom),thematic FROM gismap_geometry WHERE id=?";
    private static final String SQL_QUERY_SELECT = "SELECT id,ST_AsText(geom),thematic FROM gismap_geometry ORDER BY thematic";
    private static final String SQL_QUERY_INSERT = "INSERT INTO gismap_geometry (id,geom,thematic )VALUES(?,ST_GeomFromText(?),?)";
    private static final String SQL_QUERY_UPDATE = "UPDATE gismap_geometry SET id=?,geom=ST_GeomFromText(?),thematic=? WHERE id=?";
    private static final String SQL_QUERY_DELETE = "DELETE FROM gismap_geometry WHERE id = ? ";
    private static final String SQL_QUERY_FIND_RESPONSE_VALUE_BY_KEY = "SELECT field.title,max(response.id_response),response.response_value "
    		+ "FROM genatt_response response, genatt_field field "
    		+ "WHERE response.id_field = field.id_field AND field.title = ? GROUP BY field.title, response.response_value";
    
    /**
     * Generates a new primary key
     *
     * @param plugin the plugin
     * @return The new primary key
     */
    protected int newPrimaryKey( Plugin plugin )
    {
        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_NEW_PK, plugin );
        daoUtil.executeQuery(  );

        int nKey;

        if ( !daoUtil.next(  ) )
        {
            // if the table is empty
            nKey = 1;
        }

        nKey = daoUtil.getInt( 1 ) + 1;
        daoUtil.free(  );

        return nKey;
    }

	@Override
	public void insert(Geometry geometry, Plugin plugin) {
		// TODO Auto-generated method stub
		//geometry.setId( newPrimaryKey( plugin ) );

        DAOUtil daoUtil = new DAOUtil( SQL_QUERY_INSERT, plugin );
        daoUtil.setInt( 1, geometry.getId(  ) );
        daoUtil.setString( 2, geometry.getGeometry(  ) );
        daoUtil.setString( 3, geometry.getThematic(  ) );
        daoUtil.executeUpdate(  );
        daoUtil.free(  );
	}

	@Override
	public void store(Geometry geometry, Plugin plugin) {
		// TODO Auto-generated method stub
		DAOUtil daoUtil = new DAOUtil( SQL_QUERY_UPDATE, plugin );

        daoUtil.setInt( 1, geometry.getId(  ) );
        daoUtil.setString( 2, geometry.getGeometry(  ) );
        daoUtil.setString( 3, geometry.getThematic(  ) );
        daoUtil.setInt( 4, geometry.getId(  ) );
        daoUtil.executeUpdate(  );
        daoUtil.free(  );
	}

	@Override
	public void delete(int nIdGeometry, Plugin plugin) {
		// TODO Auto-generated method stub
		DAOUtil daoUtil = new DAOUtil( SQL_QUERY_DELETE, plugin );
        daoUtil.setInt( 1, nIdGeometry );
        daoUtil.executeUpdate(  );
        daoUtil.free(  );
	}

	@Override
	public Geometry load(int idKey, Plugin plugin) {
		// TODO Auto-generated method stub
		DAOUtil daoUtil = new DAOUtil( SQL_QUERY_FIND_BY_PRIMARY_KEY, plugin );
        daoUtil.setInt( 1, idKey );
        daoUtil.executeQuery(  );

        Geometry geometry = null;

        if ( daoUtil.next(  ) )
        {
        	geometry = new Geometry(  );
        	geometry.setId( daoUtil.getInt( 1 ) );
        	geometry.setGeometry( daoUtil.getString( 2 ) );
        	geometry.setThematic( daoUtil.getString( 3 ) );
        }

        daoUtil.free(  );

        return geometry;
	}

	@Override
	public List<Geometry> select(Plugin plugin) {
		// TODO Auto-generated method stub
		DAOUtil daoUtil = new DAOUtil( SQL_QUERY_SELECT, plugin );
        daoUtil.executeQuery(  );

        Geometry geometry = null;
        List<Geometry> listGeometry = new ArrayList<Geometry>(  );

        while ( daoUtil.next(  ) )
        {
        	geometry = new Geometry(  );
        	geometry.setId( daoUtil.getInt( 1 ) );
        	geometry.setGeometry( daoUtil.getString( 2 ) );
        	geometry.setThematic( daoUtil.getString( 3 ) );
        	listGeometry.add( geometry );
        }

        daoUtil.free(  );

        return listGeometry;
	}

	@Override
	public Geometry load(String strKey, Plugin plugin) {
		// TODO Auto-generated method stub
		DAOUtil daoUtil = new DAOUtil( SQL_QUERY_FIND_RESPONSE_VALUE_BY_KEY, plugin );
        daoUtil.setString( 1, strKey );
        daoUtil.executeQuery(  );

        Geometry geometry = null;

        if ( daoUtil.next(  ) )
        {
        	geometry = new Geometry(  );
        	geometry.setId( daoUtil.getInt( 2 ) );
        	geometry.setGeometry( daoUtil.getString( 3 ) );
        	geometry.setThematic( "" );
        }

        daoUtil.free(  );

        return geometry;
	}

}
