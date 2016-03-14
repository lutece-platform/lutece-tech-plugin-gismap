/*global ol, proj4, GisMap*/
/**
 * File to call the Gis Component with all parameters
 */

/**
 * Method to start gis component to LUTECE
 */

//init_carto = function(idMap, globalParameters, parameters) {
   /* var idMap = 'mapCons';
    var globalParameters = [];
    var parameters = [];
    ol.proj.setProj4(proj4);
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
    var idMap1 = 'mapEdit';
    var parameters1 = [];
    parameters1.push(parameters1['Projection']='2154');
    parameters1.push(parameters1['Overview']=true);
    parameters1.push(parameters1['ZoomExtent']=true);
    parameters1.push(parameters1['ScaleBar']=true);
    parameters1.push(parameters1['MousePosition']=true);
    parameters1.push(parameters1['FullScreen']=true);
    parameters1.push(parameters1['ZoomSlider']=false);
    parameters1.push(parameters1['Rotate']=true);
    parameters1.push(parameters1['ZoomZone']=true);
    parameters1.push(parameters1['Select']=true);
    parameters1.push(parameters1['Draw']=false);
    parameters1.push(parameters1['Measure']=true);
    parameters1.push(parameters1['Edit']=true);
    parameters1.push(parameters1['SuggestPOI']=false);
    parameters1.push(parameters1['GPS']=true);
    parameters1.push(parameters1['LayerEdit']=['EPSG:2154','Point']);
    parameters1.push(parameters1['Extent']='');
    parameters1.push(parameters1['ZoomStart']='11');
    parameters1.push(parameters1['Zoom']=['0','22']);
    parameters1.push(parameters1['BackGround1']=['OSM',null]);
    parameters1.push(parameters1['BackGround2']=['MapQuest','sat']);
    parameters1.push(parameters1['WMS1']=['GeoServer','http://demo.boundlessgeo.com/geoserver/wms','ne:ne']);
    parameters1.push(parameters1['WMS2']=['AGS-IMS','http://capgeo.sig.paris.fr/arcgis/rest/services/','CapGEO_FDP/Ortho_AERODATA_Ete2013']);
    parameters1.push(parameters1['WMS3']=['AGS-MPS','http://capgeo.sig.paris.fr/arcgis/rest/services/','CapGEO_FDP/FDP_CAPGEO_Plan_Voirie_externe']);
    parameters1.push(parameters1['WFS1']=['AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/capgeo_dasco/DASCO_Evenements_ecoles/FeatureServer/0','Lieu','ARRONDISSEMENT=10']);
    parameters1.push(parameters1['WFS2']=['AGS','http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/PDX_Pedestrian_Districts/FeatureServer/0','PDX_Pedestrian_Districts','']);
    parameters1.push(parameters1['WFS3']=['GeoServer','http://localhost:8080/geoserver/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=Mairie:arrondissements','Mairie:arrondissements','4326']);
    parameters1.push(parameters1['WMTS1']=['AGS','http://capgeo.sig.paris.fr/arcgis/rest/services/CapGEO_FDP/FDP_CAPGEO_Fond_Neutre/MapServer/WMTS/','CapGEO_FDP_FDP_CAPGEO_Fond_Neutre','image/png','urn:ogc:def:crs:EPSG::102110','2154','12','256']);
    parameters1.push(parameters1['WMTS2']=['AGS','http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/','0','image/png','urn:ogc:def:crs:EPSG::3857','EPSG:3857','14','256']);
    parameters1.push(parameters1['GeoJSON'] = ['Test','EPSG:4326',{'type':'FeatureCollection',
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
    var GisMapCons = new GisMap(idMap);
	GisMapCons.initGisMap(globalParameters, parameters);
    var GisMapEdit = new GisMap(idMap1);
	GisMapEdit.initGisMap(globalParameters, parameters1);
//};*/

var idMap = 'map';
var globalParameters = [];
var parameters = [];
var fieldParameters = [];
ol.proj.setProj4(proj4);
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
parameters.push(parameters['AutoEdit']=true);
parameters.push(parameters['SuggestPOISearch']=false);
parameters.push(parameters['GPS']=true);
parameters.push(parameters['LayerEdit']=['EPSG:2154']);
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
fieldParameters.push(fieldParameters['TypeEdit']='Polygon');
fieldParameters.push(fieldParameters['GeomGeoJson']='GeomGeoJson');
fieldParameters.push(fieldParameters['GeomCentroidX']='GeomCentroidX');
fieldParameters.push(fieldParameters['GeomCentroidY']='GeomCentroidY');
fieldParameters.push(fieldParameters['GeomState']='GeomState');
var GisMapDisplay = new GisMap(idMap);
GisMapDisplay.initGisMap(globalParameters, parameters, fieldParameters);
