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
		
		String strProjectionProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER +  PROJECTION );
		mapParameter.setParameters(PROJECTION, getStringByPoint(strProjectionProperty));
		
		String strOverviewProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER +  OVERVIEW );
		mapParameter.setParameters(OVERVIEW, getStringByPoint(strOverviewProperty));
		
		String strZoomExtentProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOMEXTENT );
		mapParameter.setParameters(ZOOMEXTENT, getStringByPoint(strZoomExtentProperty));
		
		String strScaleBarProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + SCALEBAR );
		mapParameter.setParameters(SCALEBAR, getStringByPoint(strScaleBarProperty));
		
		String strMousePositionProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + MOUSEPOSITION );
		mapParameter.setParameters(MOUSEPOSITION, getStringByPoint(strMousePositionProperty));
		
		String strFullScreenProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + FULLSCREEN );
		mapParameter.setParameters(FULLSCREEN, getStringByPoint(strFullScreenProperty));
		
		String strZoomSliderProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOMSLIDER );
		mapParameter.setParameters(ZOOMSLIDER, getStringByPoint(strZoomSliderProperty));
		
		String strRotateProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ROTATE );
		mapParameter.setParameters(ROTATE, getStringByPoint(strRotateProperty));
		
		String strZoomZoneProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOMZONE );
		mapParameter.setParameters(ZOOMZONE, getStringByPoint(strZoomZoneProperty));
		
		String strSelectProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + SELECT );
		mapParameter.setParameters(SELECT, getStringByPoint(strSelectProperty));
		
		String strDrawProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + DRAW );
		mapParameter.setParameters(DRAW, getStringByPoint(strDrawProperty));
		
		String strMeasureProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + MEASURE );
		mapParameter.setParameters(MEASURE, getStringByPoint(strMeasureProperty));
		
		String strAutoEditProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + AUTOEDIT );
		mapParameter.setParameters(AUTOEDIT, getStringByPoint(strAutoEditProperty));
		
		String strSuggestPOISearchProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + SUGGESTPOISEARCH );
		mapParameter.setParameters(SUGGESTPOISEARCH, getStringByPoint(strSuggestPOISearchProperty));
		
		String strSuggestPOIParamsProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + SUGGESTPOIPARAMS );
		mapParameter.setParameters(SUGGESTPOIPARAMS, getStringByPoint(strSuggestPOIParamsProperty));
		
		String strGPSProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + GPS );
		mapParameter.setParameters(GPS, getStringByPoint(strGPSProperty));
		
		String strPrintProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + PRINT );
		mapParameter.setParameters(PRINT, getStringByPoint(strPrintProperty));
		
		String strLayerEditProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + LAYEREDIT );
		mapParameter.setParameters(LAYEREDIT, getStringByPoint(strLayerEditProperty));
		
		String strExtentProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + EXTENT );
		mapParameter.setParameters(EXTENT, getStringByPoint(strExtentProperty));
		
		String strZoomSelectProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOMSELECT );
		mapParameter.setParameters(ZOOMSELECT, getStringByPoint(strZoomSelectProperty));
		
		String strZoomProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + ZOOM );
		mapParameter.setParameters(ZOOM, getStringByPoint(strZoomProperty));
		
		String strDefaultBackGroundProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + DEFAULTBACKGROUND );
		mapParameter.setParameters(DEFAULTBACKGROUND, getStringByPoint(strDefaultBackGroundProperty));
		
		String strBackGround1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + BACKGROUND1 );
		mapParameter.setParameters(BACKGROUND1, getStringByPoint(strBackGround1Property));
		
		String strBackGround2Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + BACKGROUND2 );
		mapParameter.setParameters(BACKGROUND2, getStringByPoint(strBackGround2Property));
		
		String strWMSBase1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMSBASE1 );
		mapParameter.setParameters(WMSBASE1, getStringByPoint(strWMSBase1Property));
		
		String strWMSBase2Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMSBASE2 );
		mapParameter.setParameters(WMSBASE2, getStringByPoint(strWMSBase2Property));
		
		String strWMSLayer1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMSLAYER1 );
		mapParameter.setParameters(WMSLAYER1, getStringByPoint(strWMSLayer1Property));
		
		String strWMSLayer2Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMSLAYER2 );
		mapParameter.setParameters(WMSLAYER2, getStringByPoint(strWMSLayer2Property));
		
		String strPopup1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + POPUP1 );
		mapParameter.setParameters(POPUP1, getStringByPoint(strPopup1Property));
		
		String strPopup2Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + POPUP2 );
		mapParameter.setParameters(POPUP2, getStringByPoint(strPopup2Property));
		
		String strPopup3Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + POPUP3 );
		mapParameter.setParameters(POPUP3, getStringByPoint(strPopup3Property));
		
		String strPopup4Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + POPUP4 );
		mapParameter.setParameters(POPUP4, getStringByPoint(strPopup4Property));
		
		String strWFS1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WFS1 );
		mapParameter.setParameters(WFS1, getStringByPoint(strWFS1Property));
		
		String strWFS2Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WFS2 );
		mapParameter.setParameters(WFS2, getStringByPoint(strWFS2Property));
		
		String strWMTS1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WMTS1 );
		mapParameter.setParameters(WMTS1, getStringByPoint(strWMTS1Property));
		
		String strGeoJSON1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + GEOJSON1 );
		mapParameter.setParameters(GEOJSON1, getStringByPoint(strGeoJSON1Property));
		
		String strLayerControlProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + LAYERCONTROL );
		mapParameter.setParameters(LAYERCONTROL, getStringByPoint(strLayerControlProperty));
		
		String strWFS3Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + WFS3 );
		mapParameter.setParameters(WFS3, getStringByPoint(strWFS3Property));
		
		String strHEATMAP1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + HEATMAP1 );
		mapParameter.setParameters(HEATMAP1, getStringByPoint(strHEATMAP1Property));
		
		String strTHEMATICSIMPLE1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + THEMATICSIMPLE1 );
		mapParameter.setParameters(THEMATICSIMPLE1, getStringByPoint(strTHEMATICSIMPLE1Property));
		
		String strTHEMATICCOMPLEX1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + THEMATICCOMPLEX1 );
		mapParameter.setParameters(THEMATICCOMPLEX1, getStringByPoint(strTHEMATICCOMPLEX1Property));
		
		String strCLUSTER1Property = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + CLUSTER1 );
		mapParameter.setParameters(CLUSTER1, getStringByPoint(strCLUSTER1Property));
		
		String strPOPUPSHOWLINKProperty = AppPropertiesService.getProperty( GISMAP_VIEW + nKey + PARAMETER  + POPUPSHOWLINK );
		mapParameter.setParameters(POPUPSHOWLINK, getStringByPoint(strPOPUPSHOWLINKProperty));
		
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

}
