/*global ol, Manager, Control, Projection, Interaction, Layer, LayerRaster, Feature, editorTools,
View, Measure, Zoom, DrawTools, InterfaceElements, SpecificInteracts, GeoPoint, Print, fieldParameters*/

/**
 * File to manage the Gis Component with all parameters
 */
window.app = {};
var app = window.app;

/**
 * Global Object declaration
 */
var view;
var rasterLayer;
var featureLayer;
var layer;
var control;
var interact;
var drawTools;
var measureTools;
var specifInteracts;
var projection;
var interfaceElements;
var GlobalMap;
var geoPoint;
var printer;
var zoom;

var GisMap = function (idMapInit) {
    'use strict';
    /**
     *  Global Object instantiation
     */
    this.idMap = idMapInit;
    GlobalMap = new ol.Map({
        target: this.idMap
    });
    var manager = new Manager();
    printer = new Print();
    /**
     * GisMap Private Method
     * initGis initialize all components of the map
     * @param globalParameters
     * @param parameters
     */
    function initGis(globalParameters, startParameters, fieldParameters) {
        var parameters = manager.readAndManageParameters(startParameters, fieldParameters);
        globalInitialize(globalParameters,parameters);
        dataInitialize(globalParameters,parameters);
        controlInitialize(globalParameters,parameters, fieldParameters);
        mapInitialize(parameters);
        if(manager.getSpecificExtent() !== false){
            view.getView().fit(manager.extentDefine, GlobalMap.getSize());
        }else {
            view.getView().fit(projection.getExtent(), GlobalMap.getSize());
        }
        initInterfaces(parameters);
    }

    function initInterfaces(parameters) {
        interfaceElements = new InterfaceElements(parameters);
        var Elements = interfaceElements.getElements();
        for (var i = 0; i < Elements.length; i++) {
            GlobalMap.addControl(Elements[i]);
        }
    }

    function globalInitialize(globalParameters, parameters){
        view = new View();
        zoom = new Zoom();
        projection = new Projection();
        manager.readAndInitGeneralParams(globalParameters, parameters);
    }

    function dataInitialize(globalParameters, parameters){
        layer = new Layer();
        featureLayer = new Feature();
        rasterLayer = new LayerRaster();
        manager.readAndInitDataParams(globalParameters, parameters);
    }

    function controlInitialize(globalParameters, parameters, fieldParameters) {
        interact = new Interaction(parameters['LayerEdit'], fieldParameters);
        control = new Control();
        drawTools = new DrawTools();
        measureTools = new Measure();
        specifInteracts = new SpecificInteracts();
        manager.readAndInitActionParams(globalParameters, parameters);
    }

    function addGPSComponent(parameters){
        for (var i = 0; i < parameters['Interacts'].length; i++) {
            if (parameters['Interacts'][i] === 'GPS') {
                geoPoint = new GeoPoint(GlobalMap);
            }
        }
    }

    function mapInitialize(parameters){
        manager.defineCenterAndExtentByParameter(document.getElementById('id_Select').value);
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
        //GlobalMap.addOverlay(popup.getPopup());
        GlobalMap.addControl(control.getLayerSwitcher());
        addGPSComponent(parameters);
    }

    /**
     * GisMap Method
     * initGisMap is the enter point of the GisMap plugin
     *
     * @param globalParameters
     * @param parameters
     * @returns {*}
     */
    var initGisMap = function(globalParameters, parameters, fieldParameters) {
        initGis(globalParameters, parameters, fieldParameters);
        GlobalMap.removeInteraction(GlobalMap.getInteractions().getArray()[1]);
        return GlobalMap;
    };

    return {
        initGisMap: initGisMap
    };
};