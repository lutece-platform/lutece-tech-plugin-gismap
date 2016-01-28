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
//Point = 225000,6237500

var globalParameters = new Array();
var parameters = new Array();
var GisMap = new GisMap();
parameters.push(parameters['TypeCarte'] = '');
parameters.push(parameters['Controles'] = ['Overview', 'ZoomExtent', 'ScaleBar', 'MousePosition']);
parameters.push(parameters['Projection'] = 'EPSG:4326');
parameters.push(parameters['Extent'] = '');//[225000,6237500,292000,6249500]);
parameters.push(parameters['ZoomStart'] = '12');
parameters.push(parameters['Zoom'] = ['0' , '18']);
parameters.push(parameters['WKT'] = ['EPSG:4326', ]);
initGisMap(globalParameters, parameters);