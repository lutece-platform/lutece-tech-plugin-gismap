/**
 * 
 */
package fr.paris.lutece.plugins.gismap.business;

import fr.paris.lutece.portal.service.util.AppPropertiesService;

/**
 * @author bass
 *
 */
public class MapParameterDAO implements IMapParameterDAO 
{
	public static final String GISMAP_VIEW = "gismap.view.";
	public static final String PARAMETER = ".parameter.";
    public static final String MAP_TYPE = "TypeCarte";
    public static final String CONTROLS = "Controles";
    //public static final String INTERACTS = "Interacts";
    public static final String PROJECTION = "Projection";
    public static final String EXTENT = "Extent";
    public static final String ZOOMSTART = "ZoomStart";
    public static final String ZOOM = "Zoom";
    public static final String BACKGROUND = "BackGround";
    public static final String WMS = "WMS";
    public static final String WMTS = "WMTS";
    public static final String WFS = "WFS";
    
    
	@Override
	public MapParameter findById(int nKey) {
		MapParameter mapParameter = new MapParameter();
		
		mapParameter.setId(nKey);
		
		String strMapTypeProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER +  MAP_TYPE );
		String[] strMapTypePropertyArray = strMapTypeProperty.split(",");
		mapParameter.setParameters(MAP_TYPE, getCutString(strMapTypePropertyArray));
		
		String strControlProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER +  CONTROLS );
		String[] strControlPropertyArray = strControlProperty.split(",");
		mapParameter.setParameters(CONTROLS, getCutString(strControlPropertyArray));
		
		/*String strInteractsProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + INTERACTS );
		String[] strInteractsPropertyArray = strInteractsProperty.split(",");
		mapParameter.setParameters(INTERACTS, getCutString(strInteractsPropertyArray));*/
		
		String strProjectionProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + PROJECTION );
		String[] strProjectionPropertyArray = strProjectionProperty.split(",");
		mapParameter.setParameters(PROJECTION, getCutString(strProjectionPropertyArray));
		
		String strExtentProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + EXTENT );
		String[] strExtentPropertyArray = strExtentProperty.split(",");
		mapParameter.setParameters(EXTENT, getCutString(strExtentPropertyArray));
		
		String strZoomStartProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOMSTART );
		String[] strZoomStarPropertyArray = strZoomStartProperty.split(",");
		mapParameter.setParameters(ZOOMSTART, getCutString(strZoomStarPropertyArray));
		
		String strZoomProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOM );
		String[] strZoomPropertyArray = strZoomProperty.split(",");
		mapParameter.setParameters(ZOOM, getCutString(strZoomPropertyArray));
		
		String strBackgroundProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + BACKGROUND );
		String[] strBackgroundPropertyArray = strBackgroundProperty.split(",");
		mapParameter.setParameters(BACKGROUND, getCutString(strBackgroundPropertyArray));
		
		String strWMSProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMS );
		String[] strWMSPropertyArray = strWMSProperty.split(",");
		mapParameter.setParameters(WMS, getCutString(strWMSPropertyArray));
		
		String strWMTSProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMTS );
		String[] strWMTSPropertyArray = strWMTSProperty.split(",");
		mapParameter.setParameters(WMTS, getCutString(strWMTSPropertyArray));
		
		String strWFSProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WFS );
		String[] strWFSPropertyArray = strWFSProperty.split(",");
		mapParameter.setParameters(WFS, getCutString(strWFSPropertyArray));
		
		
		return mapParameter;
	}
	
	public String getCutString(String[] strPropertyArray)
	{
		String strProperty = "";
		if(strPropertyArray.length==1)
			strProperty = strPropertyArray[0];
		else
		{
			strProperty = "[";
			int i=0;
			for(String elt0 : strPropertyArray)
			{
				String[] elt0Array = elt0.split("-");
				if(elt0Array.length==1)
				{
					if(i==0)
						strProperty += elt0;
					else
						strProperty += "," + elt0;
					i++;
				}
				else
				{
					if(i==0)
						strProperty += "[";
					else
						strProperty += ",[";
					i++;
					int j=0;
					for(String elt1 : elt0Array)
					{
						if(j==0)
							strProperty += elt1;
						else
							strProperty += "," + elt1;
						j++;
					}
					strProperty += "]";
				}
			}
			strProperty += "]";
		}
		
		return strProperty;
	}

}
