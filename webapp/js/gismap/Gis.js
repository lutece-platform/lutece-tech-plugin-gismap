/*global ol, proj4, GisMap*/
/**
 * File to call the Gis Component with all parameters
 * Method to start gis component to LUTECE
 */
ol.proj.setProj4(proj4);
var idMap = 'map';
var GisMapDisplay = new GisMap(idMap);
GisMapDisplay.initGisMap(globalParameters, parameters, fieldParameters);
