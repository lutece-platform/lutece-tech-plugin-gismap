/*global view, control, layer, projection, interact */
/**
 * Manager Class read and manage all parameters of the Gis Component
 */
var Manager = function() {
    'use strict';
    this.projectionChanged = false;
    this.specificExtent = false;
    this.extentDefine = false;

    /**
     * Manager Method
     * getSpecificExtent is a getter to check if a specific extent is define
     * @returns {boolean}
     */
    var getSpecificExtent = function(){
        return this.extentDefine;
    };

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
    var readAndManageParameters = function (startParameters, fieldParameters) {
        var parameters = [];
        var controls = [];
        var interacts = [];
        var background = [];
        var wms = [];
        var wfs = [];
        var wmts = [];
        if (startParameters['Projection'] !== '') {
            parameters['Projection'] = startParameters['Projection'];
        }
        if (startParameters['Extent'] !== '') {
            parameters['Extent'] = startParameters['Extent'];
        }
        if (startParameters['Zoom'] !== '') {
            parameters['Zoom'] = startParameters['Zoom'];
        }
        if (startParameters['ZoomStart'] !== '') {
            parameters['ZoomStart'] = startParameters['ZoomStart'];
        }
        if (startParameters['Overview'] !== false) {
            controls.push('Overview');
        }
        if (startParameters['ZoomExtent'] !== false) {
            controls.push('ZoomExtent');
        }
        if (startParameters['ScaleBar'] !== false) {
            controls.push('ScaleBar');
        }
        if (startParameters['MousePosition'] !== false) {
            controls.push('MousePosition');
        }
        if (startParameters['FullScreen'] !== false) {
            controls.push('FullScreen');
        }
        if (startParameters['ZoomSlider'] !== false) {
            controls.push('ZoomSlider');
        }
        if (startParameters['Rotate'] !== false) {
            interacts.push('Rotate');
        }
        if (startParameters['ZoomZone'] !== false) {
            interacts.push('ZoomZone');
        }
        if (startParameters['Select'] !== false) {
            interacts.push('Select');
        }
        if (startParameters['Draw'] !== false) {
            interacts.push('Draw');
        }
        if (startParameters['Measure'] !== false) {
            interacts.push('Measure');
        }
        if (fieldParameters['TypeEdit'] === 'Point' || fieldParameters['TypeEdit'] === 'LineString' || fieldParameters['TypeEdit'] === 'Polygon'){
            if (startParameters['AutoEdit'] === false) {
                interacts.push('Edit');
            } else if (startParameters['AutoEdit'] === true) {
                interacts.push('AutoEdit');
            }
        }
        if (fieldParameters['TypeEdit'] === 'SuggestPOI') {
            interacts.push('SuggestPOIEdit');
        }
        if (startParameters['SuggestPOISearch'] !== false) {
            interacts.push('SuggestPOISearch');
        }
        if (startParameters['GPS'] !== false) {
            interacts.push('GPS');
        }
        for(var n = 1; n < 10; n++) {
            if (startParameters['BackGround'+n] !== '' && startParameters['BackGround'+n] !== undefined ) {
                background.push(startParameters['BackGround'+n]);
            }
            if (startParameters['WMS'+n] !== '' && startParameters['WMS'+n] !== undefined ) {
                wms.push(startParameters['WMS'+n]);
            }
            if (startParameters['WMTS'+n] !== '' && startParameters['WMTS'+n] !== undefined ) {
                wmts.push(startParameters['WMTS'+n]);
            }
            if (startParameters['WFS'+n] !== '' && startParameters['WFS'+n] !== undefined ) {
                wfs.push(startParameters['WFS'+n]);
            }
        }
        parameters['BackGround'] = background;
        parameters['WMS'] = wms;
        parameters['WFS'] = wfs;
        parameters['WMTS'] = wmts;
        parameters['Controles'] = controls;
        parameters['Interacts'] = interacts;
        parameters['WKT'] = startParameters['WKT'];
        parameters['LayerEdit'] = startParameters['LayerEdit'];
        parameters['GeoJSON'] = startParameters['GeoJSON'];
        return parameters;
    };

    /**
     * Manager Method
     * Function to read the properties map and initiate parameters
     * @param globalParameters
     * @param parameters
     */
    var readAndInitGeneralParams = function (globalParameters, parameters) {
        if (parameters['Projection'] !== '' && parameters['Projection'] !== undefined) {
            projection.getEpsgData(parameters['Projection'], true);
            if (parameters['Projection'] !== '3857') {
                this.projectionChanged = true;
            }
        }
        if (parameters['Extent'] !== '' && parameters['Extent'] !== undefined ) {
            this.extentDefine = parameters['Extent'];
            this.specificExtent = true;
        }else{
            this.extentDefine = false;
            this.specificExtent = false;
        }
        if (parameters['ZoomStart'] !== '' && parameters['ZoomStart'] !== undefined) {
            view.setZoomInit(parameters['ZoomStart']);
        }
        if (parameters['Zoom'] !== '' && parameters['Zoom'] !== undefined) {
            view.setZoom(parameters['Zoom'][0], parameters['Zoom'][1]);
        }
    };

    /**
     * Manager Method
     * Function to read the properties map and initiate parameters
     * @param globalParameters
     * @param parameters
     */
    var readAndInitDataParams = function (globalParameters, parameters) {
        if(parameters['BackGround'] !== '' && parameters['BackGround'] !== undefined){
            for(var background = 0; background < parameters['BackGround'].length; background++){
                layer.addLayerRaster(parameters['BackGround'][background]);
            }
        }
        if(parameters['WMS'] !== '' && parameters['WMS'] !== undefined){
            for(var wms  = 0; wms < parameters['WMS'].length; wms++){
                layer.addWMSLayerRaster(parameters['WMS'][wms]);
            }
        }
        if(parameters['WFS'] !== '' && parameters['WFS'] !== undefined){
            for(var wfs  = 0; wfs < parameters['WFS'].length; wfs++){
                layer.addWFSLayer(parameters['WFS'][wfs]);
            }
        }
        if(parameters['WMTS'] !== '' && parameters['WMTS'] !== undefined){
            for(var wmts = 0; wmts < parameters['WMTS'].length; wmts++){
                layer.addWMTSLayerRaster(parameters['WMTS'][wmts]);
            }
        }
        if(parameters['WKT'] !== '' && parameters['WKT'] !== undefined){
            layer.addLayerVector(parameters['WKT'], 'WKT');
        }
        if(parameters['GeoJSON'] !== '' && parameters['GeoJSON'] !== undefined){
            layer.addLayerVector(parameters['GeoJSON'], 'GeoJSON');
        }
    };

    /**
     * Manager Method
     * Function to read the properties map and initiate parameters
     * @param globalParameters
     * @param parameters
     */
    var readAndInitActionParams = function (globalParameters, parameters) {
        if(parameters['Controles'] !== '' && parameters['Controles'] !== undefined){
            control.initControls(parameters['Controles'], this.extentDefine, this.projectionChanged, this.specificExtent);
        }
        if(parameters['Interacts'] !== '' && parameters['Interacts'] !== undefined) {
            interact.initInteractions(parameters['Interacts']);
        }
    };

    return{
        getSpecificExtent: getSpecificExtent,
        defineCenterAndExtentByParameter: defineCenterAndExtentByParameter,
        readAndManageParameters: readAndManageParameters,
        readAndInitGeneralParams: readAndInitGeneralParams,
        readAndInitDataParams: readAndInitDataParams,
        readAndInitActionParams: readAndInitActionParams
    };
};
