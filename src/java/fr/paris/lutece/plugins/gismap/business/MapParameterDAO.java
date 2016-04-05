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
	public static final String PROJECTION = "Projection";
	public static final String OVERVIEW = "Overview";
	public static final String ZOOMEXTENT = "ZoomExtent";
	public static final String SCALEBAR = "ScaleBar";
    public static final String MOUSEPOSITION = "MousePosition";
    public static final String FULLSCREEN = "FullScreen";
    public static final String ZOOMSLIDER = "ZoomSlider";
    public static final String ROTATE = "Rotate";
    public static final String ZOOMZONE = "ZoomZone";
    public static final String SELECT = "Select";
    public static final String DRAW = "Draw";
    public static final String MEASURE = "Measure";
    public static final String AUTOEDIT = "AutoEdit";
    public static final String SUGGESTPOISEARCH = "SuggestPOISearch";
    public static final String SUGGESTPOIPARAMS = "SuggestPOIParams";
    public static final String GPS = "GPS";
    public static final String PRINT = "Print";
    public static final String LAYEREDIT = "LayerEdit";
    public static final String EXTENT = "Extent";
    public static final String ZOOMSELECT = "ZoomSelect";
    public static final String ZOOM = "Zoom";
    public static final String DEFAULTBACKGROUND = "DefaultBackGround";
    public static final String BACKGROUND1 = "BackGround1";
    public static final String BACKGROUND2 = "BackGround2";
    public static final String WMSBASE1 = "WMS-Base1";
    public static final String WMSBASE2 = "WMS-Base2";
    public static final String WMSLAYER1 = "WMS-Layer1";
    public static final String WMSLAYER2 = "WMS-Layer2";
    public static final String POPUPSHOWLINK = "Popup_ShowLink";
    public static final String POPUP1 = "Popup1";
    public static final String POPUP2 = "Popup2";
    public static final String POPUP3 = "Popup3";
    public static final String POPUP4 = "Popup4";
    public static final String WFS1 = "WFS1";
    public static final String WFS2 = "WFS2";
    public static final String WFS3 = "WFS3";
    public static final String WMTS1 = "WMTS1";
    public static final String GEOJSON1 = "GeoJSON1";
    public static final String LAYERCONTROL = "LayerControl";
    
    public static final String HEATMAP1 = "HeatMap1";
    public static final String THEMATICSIMPLE1 = "ThematicSimple1";
    public static final String THEMATICCOMPLEX1 = "ThematicComplex1";
    public static final String CLUSTER1 = "Cluster1";
    
    
	@Override
	public MapParameter findById(int nKey) {
		MapParameter mapParameter = new MapParameter();
		
		mapParameter.setId(nKey);
		
		fillMapParameter(nKey, PROJECTION, mapParameter);
		
		fillMapParameter(nKey, OVERVIEW, mapParameter);
		
		fillMapParameter(nKey, ZOOMEXTENT, mapParameter);
		
		fillMapParameter(nKey, SCALEBAR, mapParameter);
		
		fillMapParameter(nKey, MOUSEPOSITION, mapParameter);
		
		fillMapParameter(nKey, FULLSCREEN, mapParameter);
		
		fillMapParameter(nKey, ZOOMSLIDER, mapParameter);
		
		fillMapParameter(nKey, ROTATE, mapParameter);
		
		fillMapParameter(nKey, ZOOMZONE, mapParameter);
		
		fillMapParameter(nKey, SELECT, mapParameter);
		
		fillMapParameter(nKey, DRAW, mapParameter);
		
		fillMapParameter(nKey, MEASURE, mapParameter);
		
		fillMapParameter(nKey, AUTOEDIT, mapParameter);
		
		fillMapParameter(nKey, SUGGESTPOISEARCH, mapParameter);
		
		fillMapParameter(nKey, SUGGESTPOIPARAMS, mapParameter);
		
		fillMapParameter(nKey, GPS, mapParameter);
		
		fillMapParameter(nKey, PRINT, mapParameter);
		
		fillMapParameter(nKey, LAYEREDIT, mapParameter);
		
		fillMapParameter(nKey, EXTENT, mapParameter);
		
		fillMapParameter(nKey, ZOOMSELECT, mapParameter);
		
		fillMapParameter(nKey, ZOOM, mapParameter);
		
		fillMapParameter(nKey, DEFAULTBACKGROUND, mapParameter);
		
		fillMapParameter(nKey, BACKGROUND1, mapParameter);
		
		fillMapParameter(nKey, BACKGROUND2, mapParameter);
		
		fillMapParameter(nKey, WMSBASE1, mapParameter);
		
		fillMapParameter(nKey, WMSBASE2, mapParameter);
		
		fillMapParameter(nKey, WMSLAYER1, mapParameter);
		
		fillMapParameter(nKey, WMSLAYER2, mapParameter);
		
		fillMapParameter(nKey, POPUP1, mapParameter);
		
		fillMapParameter(nKey, POPUP2, mapParameter);
		
		fillMapParameter(nKey, POPUP3, mapParameter);
		
		fillMapParameter(nKey, POPUP4, mapParameter);
		
		fillMapParameter(nKey, WFS1, mapParameter);
		
		fillMapParameter(nKey, WFS2, mapParameter);
		
		fillMapParameter(nKey, WMTS1, mapParameter);
		
		fillMapParameter(nKey, GEOJSON1, mapParameter);
		
		fillMapParameter(nKey, LAYERCONTROL, mapParameter);
		
		fillMapParameter(nKey, WFS3, mapParameter);
		
		fillMapParameter(nKey, HEATMAP1, mapParameter);
		
		fillMapParameter(nKey, THEMATICSIMPLE1, mapParameter);
		
		fillMapParameter(nKey, THEMATICCOMPLEX1, mapParameter);
		
		fillMapParameter(nKey, CLUSTER1, mapParameter);
		
		fillMapParameter(nKey, POPUPSHOWLINK, mapParameter);
		
		return mapParameter;
	}
	
	public String getStringByPoint(String strProperty)
	{
		String strPropertyReturrn="";
		String[] strPropertyArray = strProperty.split(",");
		if(strPropertyArray.length>1)
		{
			for(int i=0;i<strPropertyArray.length;i++)
			{
				if(i==0)
					strPropertyReturrn += getStringBySemicolon(strPropertyArray[i]);
				else
					strPropertyReturrn += ","+ getStringBySemicolon(strPropertyArray[i]);
			}
		}
		if(strPropertyArray.length>1)
			return "["+strPropertyReturrn+"]";
		else
			return strProperty;
	}
	
	public String getStringBySemicolon(String strProperty)
	{
		String strPropertyReturrn="";
		String[] strPropertyArray = strProperty.split(";");
		if(strPropertyArray.length>1)
		{
			for(int i=0;i<strPropertyArray.length;i++)
			{
				if(i==0)
					strPropertyReturrn +=strPropertyArray[i];
				else
					strPropertyReturrn +=","+strPropertyArray[i];
			}
		}
		if(strPropertyArray.length>1)
			return "["+strPropertyReturrn+"]";
		else
			return strProperty;
			
	}
	
	public void fillMapParameter(int nKey, String strProperty, MapParameter mapParameter)
	{
		String strPropertyValue = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + strProperty );
		if(strPropertyValue!=null)
		{
			mapParameter.setParameters(strProperty, getStringByPoint(strPropertyValue));
		}
	}

}
