/*global view, control, layer, projection, interact */
/**
 * Manager Class read and manage all parameters of the Gis Component
 */
var Manager = function() {
    'use strict';
    /**
     * Manager Method
     * Function to calculate the initial extent or center
     * @param data
     */
    var defineCenterAndExtentByParameter = function (data){
        if (data !== ''){
            data = data.split(',');
            if(data.length <= 2 ){
                for(var i = 0; i < data.length; i++){
                    data[i] = parseFloat(data[i]);
                }
                view.setCenter(data);
            }else{
                for(var j = 0; j < data.length; j++){
                    data[j] = parseFloat(data[j]);
                }
                view.setExtent(data);
            }
        }
    };

    /**
     * Manager Method
     * Function to read the properties map and initiate parameters
     * @param globalParameters
     * @param parameters
     */
    var readAndInitParams = function (globalParameters, parameters){
        var projectionChanged = false;
        var specificExtent = false;
        var extentDefine = false;
        var layerEdit = null;

        if(parameters['Projection'] !== '') {
            projection.getEpsgData(parameters['Projection']);
            if (parameters['Projection'] !== '3857'){
                projectionChanged = true;
            }
        }
        if(parameters['Extent'] !== '') {
            extentDefine = parameters['Extent'];
            specificExtent = true;
        }
        if(parameters['ZoomStart'] !== ''){
            view.setZoomInit(parameters['ZoomStart']);
        }
        if(parameters['Zoom'] !== ''){
            view.setZoom(parameters['Zoom'][0], parameters['Zoom'][1]);
        }
        if(parameters['Controles'] !== ''){
            control.initControls(parameters['Controles'], extentDefine, projectionChanged, specificExtent);
        }
        if(parameters['LayerEdit'] !== '') {
            layerEdit = parameters['LayerEdit'];
        }
        if(parameters['Interacts'] !== '') {
            interact.initInteractions(parameters['Interacts'], layerEdit);
        }
        if(parameters['BackGround'] !== ''){
            for(var background = 0; background < parameters['BackGround'].length; background++){
                layer.addLayerRaster(parameters['BackGround'][background]);
            }
        }
        if(parameters['WMS'] !== ''){
            for(var wms  = 0; wms < parameters['WMS'].length; wms++){
                layer.addWMSLayerRaster(parameters['WMS'][wms]);
            }
        }
        if(parameters['WFS'] !== ''){
            for(var wfs  = 0; wfs < parameters['WFS'].length; wfs++){
                layer.addWFSLayer(parameters['WFS'][wfs]);
            }
        }
        if(parameters['WMTS'] !== ''){
            /*for(var wmts = 0; wmts < parameters['WMTS'].length; wmts++){
                layer.addWMTSLayerRaster(parameters['WMTS'][wmts]);
            }*/
        }
        if(parameters['WKT'] !== ''){
            layer.addLayerVector(parameters['WKT'], 'WKT');
        }
        if(parameters['GeoJSON'] !== ''){
            layer.addLayerVector(parameters['GeoJSON'], 'GeoJSON');
        }
    };

    return{
        defineCenterAndExtentByParameter: defineCenterAndExtentByParameter,
        readAndInitParams: readAndInitParams
    };
};