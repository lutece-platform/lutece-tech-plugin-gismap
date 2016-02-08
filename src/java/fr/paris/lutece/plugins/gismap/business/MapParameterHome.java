package fr.paris.lutece.plugins.gismap.business;

import fr.paris.lutece.plugins.gismap.service.GismapPlugin;
import fr.paris.lutece.portal.service.spring.SpringContextService;

public final class MapParameterHome 
{
	// Static variable pointed at the DAO instance
    private static IMapParameterDAO _dao = (IMapParameterDAO) SpringContextService.getPluginBean( GismapPlugin.PLUGIN_NAME, "mapParameterDAO" );

    public static MapParameter findByPrimaryKey( int nKey )
    {
        return _dao.findById( nKey );
    }
}
