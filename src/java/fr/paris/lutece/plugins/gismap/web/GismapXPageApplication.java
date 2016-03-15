package fr.paris.lutece.plugins.gismap.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.plugins.gismap.business.AddressParamHome;
import fr.paris.lutece.plugins.gismap.service.GismapService;
import fr.paris.lutece.portal.util.mvc.commons.annotations.Action;
import fr.paris.lutece.portal.util.mvc.commons.annotations.View;
import fr.paris.lutece.portal.util.mvc.xpage.MVCApplication;
import fr.paris.lutece.portal.util.mvc.xpage.annotations.Controller;
import fr.paris.lutece.portal.web.xpages.XPage;


@Controller( xpageName = "gismap", pageTitleI18nKey = "gismap.xpage.gismap.pageTitle", pagePathI18nKey = "gismap.xpage.gismap.pagePathLabel" )
public class GismapXPageApplication extends MVCApplication 
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	// Templates
    private static final String TEMPLATE_DEFAULT = "/skin/plugins/gismap/manage_gismap.html";
	
	// Views
	private static final String VIEW_DEFAULT = "default";
	
	// Actions
    private static final String ACTION_CREATE_GEOM = "createGeom";
    
    // Parameters
    private static final String PARAMETER_MAP = "map";
    private static final String PARAMETER_ADD = "add_parameter";
    
	
	@View( value = VIEW_DEFAULT, defaultView = true )
    public XPage getDefaultPage( HttpServletRequest request )
    {
		Map<String, Object> model = getModel(  );
        
        model.put(PARAMETER_ADD, AddressParamHome.getAddressParameters());
        model.put(PARAMETER_MAP, GismapService.getInstance().getMapTemplate(request));
		return getXPage( TEMPLATE_DEFAULT, request.getLocale(  ), model );
    }
	
	@Action( ACTION_CREATE_GEOM )
    public XPage createGeom( HttpServletRequest request )
    {
		return null;
    }

}
