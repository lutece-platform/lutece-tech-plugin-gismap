/*global ol, proj4, GisMap*/
/**
 * File to call the Gis Component with all parameters
 */

/**
 * Method to start gis component to LUTECE
 */

//init_carto = function(idMap, globalParameters, parameters) {

var idMap = 'map';
var globalParameters = [];
var parameters = [];
var fieldParameters = [];
ol.proj.setProj4(proj4);
parameters.push(parameters['Projection']='EPSG:2154');
parameters.push(parameters['Overview']=true);
parameters.push(parameters['ZoomExtent']=true);
parameters.push(parameters['ScaleBar']=true);
parameters.push(parameters['MousePosition']=false);
parameters.push(parameters['FullScreen']=true);
parameters.push(parameters['ZoomSlider']=false);
parameters.push(parameters['Rotate']=true);
parameters.push(parameters['ZoomZone']=true);
parameters.push(parameters['Select']=false);
parameters.push(parameters['Draw']=false);
parameters.push(parameters['Measure']=false);
parameters.push(parameters['AutoEdit']=false);
parameters.push(parameters['LayerControl']=true);
parameters.push(parameters['SuggestPOISearch']= false);
parameters.push(parameters['SuggestPOIParams']=['https://teleservices.paris.fr/SuggestPOI_L93/rest/services/SuggestPOI.jsp','gismap',3]);
parameters.push(parameters['GPS']=false);
parameters.push(parameters['Print']=false);
parameters.push(parameters['LayerEdit']='EPSG:4326');
parameters.push(parameters['Extent']=[650000,6850000,651000,6860000]);
parameters.push(parameters['ZoomSelect']='11');
parameters.push(parameters['Zoom']=['0','22']);
parameters.push(parameters['DefaultBackGround']='OSM');
parameters.push(parameters['BackGround1']=['OSM',null]);
parameters.push(parameters['BackGround2']=['MapQuest','sat']);
parameters.push(parameters['WMS-Base1']=['GeoServer','http://demo.boundlessgeo.com/geoserver/wms','ne:ne']);
parameters.push(parameters['WMS-Base2']=['AGS-IMS','http://capgeo.sig.paris.fr/arcgis/rest/services/','CapGEO_FDP/Ortho_AERODATA_Ete2013']);
parameters.push(parameters['WMS-Layer1']=['2','CapGEO_FDP/FDP_CAPGEO_Plan_Voirie_externe','AGS-MPS','http://capgeo.sig.paris.fr/arcgis/rest/services/']);
parameters.push(parameters['WFS1']=['1','Lieu','AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/capgeo_dasco/DASCO_Evenements_ecoles/FeatureServer/0','EPSG:2154','ARRONDISSEMENT=10']);
parameters.push(parameters['Popup2'] = ['Lieu',['TITRE ','ARRONDISSEMENT','DESCRIPTIF']]);
parameters.push(parameters['Popup3'] = ['Mairie:arrondissements',['l_ar','c_arinsee']]);
parameters.push(parameters['WFS2']=['3','Mairie:arrondissements','GeoServer','http://localhost:8080/geoserver/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=Mairie:arrondissements','EPSG:4326','']);
//parameters.push(parameters['WFS3']=['AGS','http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/PDX_Pedestrian_Districts/FeatureServer/0','PDX_Pedestrian_Districts','']);
parameters.push(parameters['WMTS1']=['AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/CapGEO_FDP/Ortho_AERODATA_Ete2013/ImageServer',
    'Ortho_AERODATA_Ete2013','EPSG:2154',[19.109040301413938,9.554387858775717,4.777061637456608,2.3883985267970536,1.1940669714672763,0.5969011938023876,0.2984505969011938,0.13229193125052918],[-35597500, 48953100]]);
parameters.push(parameters['GeoJSON1'] = ['0','Test','EPSG:4326']);
parameters.push(parameters['HeatMap1'] = ['Test','Representation','type','10','25']);
parameters.push(parameters['Popup1'] = ['Representation',['nom','prenom','type','link']]);
parameters.push(parameters['Popup_ShowLink'] = true);
fieldParameters.push(fieldParameters['TypeEdit']='');
fieldParameters.push(fieldParameters['GeomGeoJson']='GeomGeoJson');
fieldParameters.push(fieldParameters['GeomCentroidXStockage']='GeomCentroidXStockage');
fieldParameters.push(fieldParameters['GeomCentroidYStockage']='GeomCentroidYStockage');
fieldParameters.push(fieldParameters['GeomCentroidXGeocodage']='GeomCentroidXGeocodage');
fieldParameters.push(fieldParameters['GeomCentroidYGeocodage']='GeomCentroidYGeocodage');
fieldParameters.push(fieldParameters['GeomState']='GeomState');
fieldParameters.push(fieldParameters['UrlGeoJSON1']=['Test','http://localhost:8081/myapp/myresource']);
var GisMapDisplay = new GisMap(idMap);
GisMapDisplay.initGisMap(globalParameters, parameters, fieldParameters);
