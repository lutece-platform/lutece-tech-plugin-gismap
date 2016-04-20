package fr.paris.lutece.plugins.gismap.business;


import fr.paris.lutece.portal.service.util.AppPropertiesService;

public final class AddressParamHome 
{
	public static final String GISMAP_ADDRESS = "address-autocomplete.suggestPOI.";
	public static final String URL = "ws.url";
    public static final String DELAY = "ui.delay";
    public static final String MIN_LENGTH = "param.query.minLength";
    public static final String TYPE = "param.types.default";
    public static final String NB_RESULT = "param.nbResults.default";
    public static final String CLIENT_ID = "param.clientId";
     
	public static AddressParam getAddressParameters() 
	{
		AddressParam parameters = new AddressParam();
		
		String strUrlProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + URL );
		parameters.setUrl(strUrlProperty);
		String strDelayProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + DELAY );
		parameters.setDelay(strDelayProperty);
		String strMinLengthProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + MIN_LENGTH );
		parameters.setMinLength(strMinLengthProperty);
		String strTypeProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + TYPE );
		parameters.setListType(strTypeProperty);
		String strNbResultProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + NB_RESULT );
		parameters.setNbResult(strNbResultProperty);
		String strClientIdProperty = AppPropertiesService.getProperty( GISMAP_ADDRESS + CLIENT_ID );
		parameters.setClientId(strClientIdProperty);
		
		return parameters;
	}
	
}
