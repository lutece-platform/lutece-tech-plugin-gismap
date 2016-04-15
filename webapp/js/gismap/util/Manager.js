/**
 * Manager Class read and manage all parameters of the Gis Component
 */
var Manager = function() {
    'use strict';
    /**
     * specificExtent is a marker to indicate if a specific extent is define or not
     * @type {boolean}
     */
    this.specificExtent = false;
    /**
     * extentDefine is an array to stock the specific extent
     * @type {Array}
     */
    this.extentDefine = [];

    /**
     * Manager Method
     * getSpecificExtent is a getter to check if a specific extent is define
     * @returns {Array} is an array with the specific extent
     */
    var getSpecificExtent = function(){
        return this.extentDefine;
    };

    /**
     * Manager Method
     * readAndManageParameters is a function to read the properties map
     * @param startParameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     * @returns {Array} an array of parameters analysed
     */
    var readAndManageParameters = function (startParameters, fieldParameters) {
        var parameters = [];
        var controls = [];
        var interacts = [];
        var background = [];
        var wmsBase = [];
        var wmsLayer = [];
        var wfs = [];
        var wmts = [];
        var geoJson = [];
        var popup = [];
        var heatmap = [];
        var cluster = [];
        var thematic = [];
        var thematicComplex = [];
        if (startParameters['Projection'] !== '') {
            parameters['Projection'] = startParameters['Projection'];
        }
        if (startParameters['Extent'] !== '') {
            parameters['Extent'] = startParameters['Extent'];
        }
        if (startParameters['Zoom'] !== '') {
            parameters['Zoom'] = startParameters['Zoom'];
        }
        if (startParameters['ZoomSelect'] !== '') {
            parameters['ZoomSelect'] = startParameters['ZoomSelect'];
        }
        if (startParameters['DefaultBackGround'] !== '') {
            parameters['DefaultBackGround'] = startParameters['DefaultBackGround'];
        }
        if (startParameters['Overview'] !== '') {
            controls['Overview'] = startParameters['Overview'];
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
        if (startParameters['ZoomExtent'] !== false) {
            controls.push('ZoomExtent');
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
        if (fieldParameters['TypeEdit'] === 'ReadOnly') {
            interacts.push('ReadOnly');
        }
        if (startParameters['SuggestPOISearch'] !== false) {
            interacts.push('SuggestPOISearch');
            parameters['SuggestPOIParams'] = startParameters['SuggestPOIParams'];
        }
        if (startParameters['GPS'] !== false) {
            interacts.push('GPS');
        }
        if (startParameters['Print'] !== false) {
            interacts.push('Print');
        }
        for(var n = 1; n <= 10; n++) {
            if (startParameters['BackGround'+n] !== '' && startParameters['BackGround'+n] !== undefined ) {
                background.push(startParameters['BackGround'+n]);
            }
            if (startParameters['WMS-Base'+n] !== '' && startParameters['WMS-Base'+n] !== undefined ) {
                wmsBase.push(startParameters['WMS-Base'+n]);
            }
            if (startParameters['WMS-Layer'+n] !== '' && startParameters['WMS-Layer'+n] !== undefined ) {
                wmsLayer.push(startParameters['WMS-Layer'+n]);
            }
            if (startParameters['WMTS'+n] !== '' && startParameters['WMTS'+n] !== undefined ) {
                wmts.push(startParameters['WMTS'+n]);
            }
            if (startParameters['WFS'+n] !== '' && startParameters['WFS'+n] !== undefined ) {
                wfs.push(startParameters['WFS'+n]);
            }
            if (startParameters['HeatMap'+n] !== '' && startParameters['HeatMap'+n] !== undefined ) {
                heatmap.push(startParameters['HeatMap'+n]);
            }
            if (startParameters['Cluster'+n] !== '' && startParameters['Cluster'+n] !== undefined ) {
                cluster.push(startParameters['Cluster'+n]);
            }
            if (startParameters['ThematicSimple'+n] !== '' && startParameters['ThematicSimple'+n] !== undefined ) {
                thematic.push(startParameters['ThematicSimple'+n]);
            }
            if (startParameters['ThematicComplex'+n] !== '' && startParameters['ThematicComplex'+n] !== undefined ) {
                thematicComplex.push(startParameters['ThematicComplex'+n]);
            }
            if (startParameters['GeoJSON'+n] !== '' && startParameters['GeoJSON'+n] !== undefined ) {
                var tempGeoJson = startParameters['GeoJSON'+n];
                for(var j = 0; j < 10; j++){
                    if(fieldParameters['UrlGeoJSON'+j] !== '' && fieldParameters['UrlGeoJSON'+j]!== undefined ) {
                        if (startParameters['GeoJSON' + n][0] === fieldParameters['UrlGeoJSON' + j][0]) {
                            tempGeoJson.push(fieldParameters['UrlGeoJSON' + j][1]);
                        }
                    }
                }
                if(tempGeoJson.length === 4) {
                    geoJson.push(tempGeoJson);
                }
            }
            if (startParameters['Popup'+n] !== '' && startParameters['Popup'+n] !== undefined ) {
                popup.push(startParameters['Popup'+n]);
            }
        }
        parameters['BackGround'] = background;
        parameters['WMS-Base'] = wmsBase;
        parameters['WMS-Layer'] = wmsLayer;
        parameters['WFS'] = wfs;
        parameters['HeatMap'] = heatmap;
        parameters['Cluster'] = cluster;
        parameters['ThematicSimple'] = thematic;
        parameters['ThematicComplex'] = thematicComplex;
        parameters['WMTS'] = wmts;
        parameters['GeoJSON'] = geoJson;
        parameters['Popup'] = popup;
        parameters['Controles'] = controls;
        parameters['Interacts'] = interacts;
        parameters['WKT'] = startParameters['WKT'];
        parameters['LayerEdit'] = startParameters['LayerEdit'];
        parameters['LayerControl'] = startParameters['LayerControl'];
        parameters['ListLayersVisible'] = startParameters['ListLayersVisible'];
        parameters['ExtentContext'] = startParameters['ExtentContext'];
        return parameters;
    };

    /**
     * Manager Method
     * readAndInitGeneralParams initiate generals properties of the map
     * @param projection is the reference of the Projection Object
     * @param viewGisMap is the reference of the View Object
     * @param parameters is the array of general parameters
     */
    var readAndInitGeneralParams = function (projection, viewGisMap, parameters) {
        if (parameters['Projection'] !== '' && parameters['Projection'] !== undefined) {
            projection.getEpsgData(parameters['Projection'], true);
        }
        if (parameters['Extent'] !== '' && parameters['Extent'] !== undefined ) {
            this.extentDefine = parameters['Extent'];
            this.specificExtent = true;
        }else{
            this.extentDefine = [];
            this.specificExtent = false;
        }
        if (parameters['ZoomSelect'] !== '' && parameters['ZoomSelect'] !== undefined) {
            viewGisMap.setZoomSelect(parameters['ZoomSelect']);
        }
        if (parameters['Zoom'] !== '' && parameters['Zoom'] !== undefined) {
            viewGisMap.setZoom(parameters['Zoom'][0], parameters['Zoom'][1]);
        }
    };

    /**
     * Manager Method
     * readAndInitDataParams initiate data properties of the map
     * @param layer is the reference of the Layer Object
     * @param parameters is the array of data parameters
     */
    var readAndInitDataParams = function (layer, parameters) {
        if(parameters['BackGround'] !== '' && parameters['BackGround'] !== undefined){
            for(var background = 0; background < parameters['BackGround'].length; background++){
                layer.addLayerRaster(parameters['BackGround'][background]);
            }
        }
        if(parameters['WMS-Base'] !== '' && parameters['WMS-Base'] !== undefined){
            for(var wmsBase  = 0; wmsBase < parameters['WMS-Base'].length; wmsBase++){
                layer.addWMSLayerRaster(parameters['WMS-Base'][wmsBase]);
            }
        }
        if(parameters['WMTS'] !== '' && parameters['WMTS'] !== undefined){
            for(var wmts = 0; wmts < parameters['WMTS'].length; wmts++){
                layer.addWMTSLayerRaster(parameters['WMTS'][wmts]);
            }
        }
        if(parameters['WMS-Layer'] !== '' && parameters['WMS-Layer'] !== undefined){
            for(var wms  = 0; wms < parameters['WMS-Layer'].length; wms++){
                layer.addWMSQueryLayerRaster(parameters['WMS-Layer'][wms]);
            }
        }
        if(parameters['WFS'] !== '' && parameters['WFS'] !== undefined){
            for(var wfs  = 0; wfs < parameters['WFS'].length; wfs++){
                layer.addWFSLayer(parameters['WFS'][wfs], parameters['HeatMap'], parameters['ThematicSimple'],
                    parameters['Cluster'], parameters['ThematicComplex']);
            }
        }
        if(parameters['GeoJSON'] !== '' && parameters['GeoJSON'] !== undefined){
            for(var geoJson = 0; geoJson < parameters['GeoJSON'].length; geoJson++){
                layer.addLayerVector(parameters['GeoJSON'][geoJson], 'GeoJSON', parameters['HeatMap'],
                    parameters['ThematicSimple'], parameters['Cluster'], parameters['ThematicComplex']);
            }
        }
        if(parameters['WKT'] !== '' && parameters['WKT'] !== undefined){
            layer.addLayerVector(parameters['WKT'], 'WKT');
        }
        layer.setDefaultBackGround(parameters['DefaultBackGround']);
    };

    /**
     * Manager Method
     * readAndInitActionParams initiate actions properties of the map
     * @param control is the reference of the Control Object
     * @param interact is the reference of the Interact Object
     * @param layer is the reference of the Layer Object
     * @param projection is the reference of the Projection Object
     * @param parameters is the array of actions parameters
     */
    var readAndInitActionParams = function (control, interact, layer, projection, parameters) {
        if(parameters['Controles'] !== '' && parameters['Controles'] !== undefined){
            control.initControls(parameters['Controles'], layer, projection, this.specificExtent, this.extentDefine);
        }
        if(parameters['Interacts'] !== '' && parameters['Interacts'] !== undefined) {
            interact.initInteractions(parameters['Interacts']);
        }
    };

    return{
        getSpecificExtent: getSpecificExtent,
        readAndManageParameters: readAndManageParameters,
        readAndInitGeneralParams: readAndInitGeneralParams,
        readAndInitDataParams: readAndInitDataParams,
        readAndInitActionParams: readAndInitActionParams
    };
};
