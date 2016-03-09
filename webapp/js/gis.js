/*global ol, proj4*/
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
ol.proj.setProj4(proj4);
var globalParameters = [];
var parameters = [];
parameters.push(parameters['Projection']='4326');
parameters.push(parameters['Overview']=true);
parameters.push(parameters['ZoomExtent']=true);
parameters.push(parameters['ScaleBar']=true);
parameters.push(parameters['MousePosition']=true);
parameters.push(parameters['FullScreen']=true);
parameters.push(parameters['ZoomSlider']=false);
parameters.push(parameters['Rotate']=true);
parameters.push(parameters['ZoomZone']=true);
parameters.push(parameters['Select']=true);
parameters.push(parameters['Draw']=false);
parameters.push(parameters['Measure']=false);
parameters.push(parameters['Edit']=false);
parameters.push(parameters['SuggestPOI']=false);
parameters.push(parameters['GPS']=true);
parameters.push(parameters['LayerEdit']=['EPSG:2154','Point']);
parameters.push(parameters['Extent']='');
parameters.push(parameters['ZoomStart']='11');
parameters.push(parameters['Zoom']=['0','22']);
parameters.push(parameters['BackGround1']=['OSM',null]);
parameters.push(parameters['BackGround2']=['MapQuest','sat']);
parameters.push(parameters['WMS1']=['GeoServer','http://demo.boundlessgeo.com/geoserver/wms','ne:ne']);
parameters.push(parameters['WMS2']=['AGS-IMS','http://capgeo.sig.paris.fr/arcgis/rest/services/','CapGEO_FDP/Ortho_AERODATA_Ete2013']);
parameters.push(parameters['WMS3']=['AGS-MPS','http://capgeo.sig.paris.fr/arcgis/rest/services/','CapGEO_FDP/FDP_CAPGEO_Plan_Voirie_externe']);
parameters.push(parameters['WFS1']=['AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/capgeo_dasco/DASCO_Evenements_ecoles/FeatureServer/0','Lieu','ARRONDISSEMENT=10']);
parameters.push(parameters['WFS2']=['AGS','http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/PDX_Pedestrian_Districts/FeatureServer/0','PDX_Pedestrian_Districts','']);
parameters.push(parameters['WFS3']=['GeoServer','http://localhost:8080/geoserver/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=Mairie:arrondissements','Mairie:arrondissements','4326']);
parameters.push(parameters['WMTS1']=['AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/CapGEO_FDP/FDP_CAPGEO_Fond_Neutre/MapServer/WMTS/','CapGEO_FDP_FDP_CAPGEO_Fond_Neutre','image/png','urn:ogc:def:crs:EPSG::102110','2154','12','256']);
parameters.push(parameters['WMTS2']=['AGS','http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/','0','image/png','urn:ogc:def:crs:EPSG::3857','EPSG:3857','14','256']);
parameters.push(parameters['GeoJSON'] = ['Test','EPSG:4326',{'type':'FeatureCollection',
    'features':
    [
        {'type':'Feature','id':1,'properties':
            {'id':1,'nom':'DIOP','prenom':'Modou'},
            'geometry':
            {'type':'Point','coordinates':[1,1]}
        },{'type':'Feature','id':2,'properties':
            {'id':2,'nom':'FALL','prenom':'Abdou'},
            'geometry':
            {'type':'Point','coordinates':[2,2]}
        }
    ]
}]);
parameters.push(parameters['WKT'] = '');
var GisMap = new GisMap();
GisMap.initGisMap(globalParameters, parameters);
