/*global ol, Manager, Control, Projection,Interaction, Layer, LayerRaster, Feature, View, Measure, Editor, DrawTools, InterfaceElements, SpecificInteracts, GeoPoint, Print*/

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
var editorTools;
var specifInteracts;
var projection;
var interfaceElements;
var GlobalMap;
var geoPoint;
var printer;

//var mapChoose;

var GisMap = function () {
    'use strict';
    /**
     *  Global Object instantiation
     */
    var manager = new Manager();
    projection = new Projection();
    view = new View();
    rasterLayer = new LayerRaster();
    featureLayer = new Feature();
    layer = new Layer();
    control = new Control();
    interact = new Interaction();
    drawTools = new DrawTools();
    editorTools = new Editor();
    measureTools = new Measure();
    specifInteracts = new SpecificInteracts();
    interfaceElements = new InterfaceElements();
    printer = new Print();

    /**
     * GisMap Private Method
     * initGis initialize all components of the map
     * @param idMap
     * @param globalParameters
     * @param parameters
     */
    function initGis(idMap, globalParameters, parameters) {
        /*if ($(mapIdentifier).attr('class').indexOf("olMap")>=0){
         return false;
         }*/
        GlobalMap = new ol.Map({
            target: 'map'
        });
        manager.readAndInitParams(globalParameters, parameters);
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
        GlobalMap.addControl(control.getLayerSwitcher());
        view.getView().fit(projection.getExtent(), GlobalMap.getSize());
    }

    /**
     * GisMap Method
     * zoomTo is a method to call an action to go on a specific area in function of selected elements
     */
    var zoomTo = function () {
        var selectFeatures = specifInteracts.getSelectedFeatures().getArray();
        if (selectFeatures.length === 1) {
            view.getView().fit(selectFeatures[0].getGeometry(), GlobalMap.getSize());
        } else if (selectFeatures.length > 1) {
            var arrayGeom = [];
            for (var selectFeature = 0; selectFeature < selectFeatures.length; selectFeature++) {
                arrayGeom.push(selectFeatures[selectFeature].getGeometry());
            }
            var geomColl = new ol.geom.GeometryCollection(arrayGeom);
            view.getView().fit(geomColl.getExtent(), GlobalMap.getSize());
        }

    };

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
        geoPoint = new GeoPoint(GlobalMap);
        var Elements = interfaceElements.getElements();
        for (var i = 0; i < Elements.length; i++) {
            GlobalMap.addControl(Elements[i]);
        }
        return GlobalMap;
    };

    return {
        initGisMap: initGisMap,
        zoomTo: zoomTo,
    };

};