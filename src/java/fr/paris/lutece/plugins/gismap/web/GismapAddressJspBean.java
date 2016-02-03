package fr.paris.lutece.plugins.gismap.web;


import java.rmi.RemoteException;

import javax.servlet.http.HttpServletRequest;

import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.NoSuchBeanDefinitionException;

import fr.paris.lutece.plugins.gismap.business.LonLat;
import fr.paris.lutece.plugins.gismap.service.IAddressServiceFacade;
import fr.paris.lutece.portal.service.i18n.I18nService;
import fr.paris.lutece.portal.service.spring.SpringContextService;
import fr.paris.lutece.portal.web.admin.PluginAdminPageJspBean;

/**
 * 
 *
 */
public class GismapAddressJspBean extends PluginAdminPageJspBean
{
	/**
	 * public static members
	 */
    public static final String RIGHT_MANAGE_GISMAP = "GISMAP_MANAGEMENT";
    private static final String PROPERTY_ERROR = "gismap.plugin.error";

	/**
	 * private static members
	 */
	private static IAddressServiceFacade addressServiceFacade = null;	
	private static Logger logger = null;
	
	
	static {
		logger = Logger.getLogger( GismapAddressJspBean.class.getName() );
	}
	
	
	private static IAddressServiceFacade getAddressFacade() {
		
		if ( GismapAddressJspBean.addressServiceFacade != null)
			return addressServiceFacade;
		
		try {
			GismapAddressJspBean.addressServiceFacade = (IAddressServiceFacade) 
				SpringContextService.getBean( "adresseServiceFacade" );
		} catch ( NoSuchBeanDefinitionException e ) {
			logger.log(Level.SEVERE, I18nService.getLocalizedString(PROPERTY_ERROR, Locale.getDefault()), e);
		}
		return addressServiceFacade;
	}
	
	/**
	 * GetGeolocalization( ).
	 * 
	 * @param request The HTTP request.
	 * @return coordinates
	 * @throws RemoteException
	 */
	public String getGeolocalization(HttpServletRequest request) 
			throws RemoteException
	{
		// gets HTTP request parameters
		String address = request.getParameter("address").trim();
		String srid = request.getParameter("srid").trim();
		LonLat lonLat = null;
		// does geolocalization
		lonLat =  GismapAddressJspBean.getAddressFacade().getGeolocalization(request, address, srid);
		
		return lonLat != null ? lonLat.toString() : "";
	}
	
	/**
	 * GetInverseGeolocalization( ).
	 * 
	 * @param request The HTTP request.
	 * @return a String address
	 * @throws RemoteException
	 */
	public String getInverseGeolocatization(HttpServletRequest request)
			throws RemoteException
	{
		// gets HTTP request parameters
		String x = request.getParameter("x"); 
		String y = request.getParameter("y");
		String srid = request.getParameter("srid").trim();
		
		String address = null;
		// checks parameters
		if ( ( x != null && x.length() != 0 )  && 
			 ( y != null && y.length() != 0 )
		){
			LonLat lonLat = new LonLat(Double.parseDouble(x),Double.parseDouble(y));
			// does inverse geolocalization
			address = GismapAddressJspBean.getAddressFacade().getInverseGeolocalization(request, lonLat, srid); 
		}
		
		return address;
	}
}
