/*global */
/**
 * File to call the Gis Component with all parameters
 */

/**
 * Method to start gis component to LUTECE
 */
/*
init_carto = function(idMap, globalParameters, parameters) {
	$(idMap).initGisMap(globalParameters, parameters);
};*/

/**
 * Start gis component to index.html
 * Using only on developement and test
 */
//Extent = 225000,6237500,292000,6249500
//Point = 225000,6237500 ou  2.35,48.85


	var globalParameters = [];
	var parameters = [];
	var GisMap = new GisMap();
	parameters.push(parameters['TypeCarte'] = 'Attributaire');
	parameters.push(parameters['Controles'] = ['Overview', 'ZoomExtent', 'ScaleBar', 'MousePosition']);
	parameters.push(parameters['Projection'] = '');//EPSG:4326');
	parameters.push(parameters['Extent'] = '');//[225000,6237500,292000,6249500]);
	parameters.push(parameters['ZoomStart'] = '12');
	parameters.push(parameters['Zoom'] = ['0' , '18']);
	parameters.push(parameters['BackGround'] = [['OSM',null],['MapQuest','sat']]);
	parameters.push(parameters['WMS'] = '');/*[//[['GeoServer','http://demo.boundlessgeo.com/geoserver/wms',['ne:ne','topp:states']],
	['AGS-IMS','http://capgeo.sig.paris.fr/arcgis/rest/services/',['CapGEO_FDP/Ortho_AERODATA_Ete2013']],
	['AGS-MPS','http://capgeo.sig.paris.fr/arcgis/rest/services/',['CapGEO_FDP/FDP_CAPGEO_Plan_Voirie_externe', 'CapGEO_FDP/FDP_CAPGEO_Fond_Neutre']]]);*/
	parameters.push(parameters['WMTS'] = '');//[['FDP_CAPGEO_Fond_Neutre','EPSG:3857','http://maps.wien.gv.at/wmts/1.0.0/WMTSCapabilities.xml']/*,
	//['Ortho_AERODATA_Ete2013','EPSG:3857','http://capgeo.sig.paris.fr/arcgis/rest/services/CapGEO_FDP/Ortho_AERODATA_Ete2013/ImageServer/WMTS/1.0.0/WMTSCapabilities.xml']*]);*
	parameters.push(parameters['WFS'] = '');
	GisMap.initGisMap(globalParameters, parameters);
