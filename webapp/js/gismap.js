/*global ol, Manager, Control, Projection, Interaction, Layer, LayerRaster, Feature,
View, Measure, Zoom, DrawTools, InterfaceElements, SpecificInteracts, GeoPoint, Print, Popup*/

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
var popup;
var zoom;

//var mapChoose;

var GisMap = function () {
    'use strict';
    /**
     *  Global Object instantiation
     */
    GlobalMap = new ol.Map({
        target: 'map'
    });
    var manager = new Manager();
    popup = new Popup();
    printer = new Print();
    /**
     * GisMap Private Method
     * initGis initialize all components of the map
     * @param idMap
     * @param globalParameters
     * @param parameters
     */
    function initGis(idMap, globalParameters, startParameters) {
        /*if ($(mapIdentifier).attr('class').indexOf("olMap")>=0){
         return false;
         }*/
        var parameters = manager.readAndManageParameters(startParameters);
        globalInitialize(globalParameters,parameters);
        dataInitialize(globalParameters,parameters);
        controlInitialize(globalParameters,parameters);
        mapInitialize(parameters);
        view.getView().fit(projection.getExtent(), GlobalMap.getSize());
        initInterfaces('#map', parameters);
    }

    function initInterfaces(id, parameters) {
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

    function controlInitialize(globalParameters, parameters) {
        interact = new Interaction(parameters['LayerEdit']);
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
    var initGisMap = function(globalParameters, parameters) {
        initGis('#map', globalParameters, parameters);
        return GlobalMap;
    };

    return {
        initGisMap: initGisMap
    };
};