package fr.paris.lutece.plugins.gismap.business;

import java.util.HashMap;
import java.util.Map;

import fr.paris.lutece.portal.service.util.AppPropertiesService;

public final class AddressParamHome 
{
	public static final String GISMAP_ADDRESS = "address-autocomplete.suggestPOI.";
	public static final String URL = "ws.url";
    public static final String DELAY = "ui.delay";
    public static final String MIN_LENGTH = "param.query.minLength";
    public static final String TYPE = "param.types.default";
    public static final String ND_RESULT = "param.nbResults.default";
    public static final String CLIENT_ID = "param.clientId";
    
    public static final String PARAM_URL = "url";
    public static final String PARAM_DELAY = "delay";
    public static final String PARAM_MIN_LENGTH = "minLength";
    public static final String PARAM_TYPES = "types";
    public static final String PARAM_ND_RESULT = "nbResults";
    public static final String PARAM_CLIENT_ID = "clientId";
    
    
	public static Map<String, String> getAddressParameters() 
	{
		Map<String, String> parameters = new HashMap<String, String>();
		
		String strUrlProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + URL );
		String strDelayProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + DELAY );
		String strMinLengthProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + MIN_LENGTH );
		//String strTypeProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + TYPE );
		//String[] arrayTypeProperty = strTypeProperty.split(",");
		String strNbResultProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + ND_RESULT );
		String strClientIdProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + CLIENT_ID );
		parameters.put(PARAM_URL, strUrlProperty);
		parameters.put(PARAM_DELAY, strDelayProperty);
		parameters.put(PARAM_MIN_LENGTH, strMinLengthProperty);
		//parameters.put(PARAM_TYPES, arrayTypeProperty);
		parameters.put(PARAM_ND_RESULT, strNbResultProperty);
		parameters.put(PARAM_CLIENT_ID, strClientIdProperty);
		
		return parameters;
	}
	
	public static String getAddressParameter(String strKey) 
	{
		return getAddressParameters().get(strKey);
	}

}
