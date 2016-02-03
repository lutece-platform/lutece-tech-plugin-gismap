package fr.paris.lutece.plugins.gismap.service;


import java.rmi.RemoteException;

import javax.servlet.http.HttpServletRequest;

import fr.paris.lutece.plugins.gismap.business.LonLat;

/**
 * 
 *
 */
public interface IAddressServiceFacade {
	
	/**
	 * Gets the localization of the given address parameters. 
	 * May return <null> whether no coordinates have been found.
	 * 
	 * @param request The HTTP request
	 * @param address The researched address
	 * @param strSRID The SRID
	 * @return LonLat | null
	 * @throws RemoteException
	 */
	public LonLat getGeolocalization(final HttpServletRequest request, String address, String strSRID) 
			throws RemoteException;
	

	/**
	 * Gets the address located on the given coordinates <LonLat> parameters. 
	 * May return <null> whether no addresses have been found.
	 * 
	 * @param request The HTTP request
	 * @param lonLat The coordinates
	 * @param strSRID The SRID
	 * @return A String address | null
	 * @throws RemoteException
	 */
	public String getInverseGeolocalization(final HttpServletRequest request, LonLat lonLat, String strSRID)
			throws RemoteException;
}
