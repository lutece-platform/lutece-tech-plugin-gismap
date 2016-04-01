/*global ol, Manager, Control, Projection, Interaction, Layer, LayerRaster, Feature, SuggestPoiLocator,
View, Zoom, InterfaceElements, GeoPoint, Print, Popup, Filter*/

/**
 * File to manage the Gis Component with all parameters
 */
window.app = {};
var app = window.app;
var view;
var rasterLayer;
var featureLayer;
var layer;
var control;
var interact;
var projection;
var interfaceElements;
var GlobalMap;
var geoPoint;
var printer;
var popup;
var suggestPoiLocator;
var filter;
var zoom;
var GisMap = function (idMapInit) {
    'use strict';
    /**
     *  Global Object instantiation
     */
    this.idMap = idMapInit;
    GlobalMap = new ol.Map({
        target: this.idMap,
        interactions: ol.interaction.defaults({doubleClickZoom :false})
    });
    var manager = new Manager();

    /**
     * GisMap Private Method
     * initGis initialize all components of the map
     * @param startParameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     */
    function initGis(startParameters, fieldParameters) {
        var parameters = manager.readAndManageParameters(startParameters, fieldParameters);
        globalInitialize(parameters);
        dataInitialize(parameters);
        controlInitialize(parameters, fieldParameters);
        mapInitialize(parameters);
        /*if(manager.getSpecificExtent() !== []){
            view.getView().fit(manager.extentDefine, GlobalMap.getSize());
        }else {*/
            view.getView().fit(projection.getExtent(), GlobalMap.getSize());
        //}
        initInterfaces(parameters);
        var geomElement = document.getElementById(fieldParameters['GeomGeoJson']).value;
        if(geomElement !== null && geomElement !== '' && geomElement !== undefined) {
            zoom.initialZoom(fieldParameters['GeomGeoJson']);
        }
    }

    /**
     * GisMap Private Method
     * initInterfaces initiate the interfaces elements of the map
     * @param parameters is the array of parameters of properties file
     */
    function initInterfaces(parameters) {
        interfaceElements = new InterfaceElements(parameters);
        var Elements = interfaceElements.getElements();
        for (var i = 0; i < Elements.length; i++) {
            GlobalMap.addControl(Elements[i]);
        }
    }

    /**
     * GisMap Private Method
     * globalInitialize initiate the general parameters of the map
     * @param parameters is the array of parameters of properties file
     */
    function globalInitialize(parameters){
        view = new View();
        zoom = new Zoom();
        projection = new Projection();
        manager.readAndInitGeneralParams(parameters);
    }

    /**
     * GisMap Private Method
     * dataInitialize initiate the layers of the map
     * @param parameters is the array of parameters of properties file
     */
    function dataInitialize(parameters){
        layer = new Layer();
        featureLayer = new Feature();
        rasterLayer = new LayerRaster();
        manager.readAndInitDataParams(parameters);
    }

    /**
     * GisMap Private Method
     * controlInitialize initiate the controls and interactions components of the map
     * @param parameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     */
    function controlInitialize(parameters, fieldParameters) {
        interact = new Interaction(parameters['LayerEdit'], fieldParameters);
        control = new Control();
        manager.readAndInitActionParams(parameters);
    }

    /**
     * GisMap Private Method
     * addAnnexeComponent initiate the others components of the map
     * @param parameters is the array of parameters of properties file
     */
    function addAnnexeComponent(parameters){
        for (var i = 0; i < parameters['Interacts'].length; i++) {
            if (parameters['Interacts'][i] === 'SuggestPOISearch') {
                suggestPoiLocator = new SuggestPoiLocator(parameters['SuggestPOIParams']);
            }
            if (parameters['Interacts'][i] === 'GPS') {
                geoPoint = new GeoPoint(GlobalMap);
            }
            if (parameters['Interacts'][i] === 'Print') {
                printer = new Print();
            }
        }
        if(parameters['Popup'] !== '' && parameters['Popup'] !== undefined){
            popup = new Popup(parameters['Popup']);
        }
        filter = new Filter();
    }

    /**
     * GisMap Private Method
     * mapInitialize initiate the map and integrate all components
     * @param parameters is the array of parameters of properties file
     */
    function mapInitialize(parameters){
        view.createView();
        GlobalMap.setView(view.getView());
        var ListControl = control.getControls();
        for (var i = 0; i < ListControl.length; i++){
            GlobalMap.addControl(ListControl[i]);
        }
        var ListInteract = interact.getInteracts();
        for (var j = 0; j < ListInteract.length; j++){
            GlobalMap.addInteraction(ListInteract[j]);
        }
        var ListLayer = layer.getLayersMap();
        for (var k = 0; k < ListLayer.length; k++){
            GlobalMap.addLayer(ListLayer[k]);
        }
        addAnnexeComponent(parameters);
        if(parameters['LayerControl'] !== false) {
            GlobalMap.addControl(control.getLayerSwitcher());
        }
    }

    /**
     * GisMap Method
     * initGisMap is the enter point of the GisMap plugin
     * @param globalParameters is an array of Lutece Parameters
     * @param parameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     * @returns {*} the map with all elements
     */
    var initGisMap = function(globalParameters, parameters, fieldParameters) {
        initGis(parameters, fieldParameters);
        return GlobalMap;
    };

    return {
        initGisMap: initGisMap
    };
};
