package fr.paris.lutece.plugins.gismap.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.portal.util.mvc.commons.annotations.Action;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.portal.util.mvc.xpage.MVCApplication;
import fr.paris.lutece.portal.web.xpages.XPage;



public class GismapXPageApplication extends MVCApplication 
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	// Templates
    private static final String TEMPLATE_DEFAULT = "/skin/plugins/taxsimulator/create_address.html";
	
	// Views
	private static final String VIEW_DEFAULT = "default";
	
	// Actions
    private static final String ACTION_CREATE_GEOM = "createGeom";
    
	
	@View( value = VIEW_DEFAULT, defaultView = true )
    public XPage getDefaultPage( HttpServletRequest request )
    {
		Map<String, Object> model = getModel(  );
		return getXPage( TEMPLATE_DEFAULT, request.getLocale(  ), model );
    }
	
	@Action( ACTION_CREATE_GEOM )
    public XPage createGeom( HttpServletRequest request )
    {
		return null;
    }

}
