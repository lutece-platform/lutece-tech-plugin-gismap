/*global Manager, ol, Control, Interaction, Layer, LayerRaster, Feature, View, TOC, Measure, DrawTools, SpecificInteracts, GeoPoint, Print*/

/**
 * File to manage the Gis Component with all parameters
 */

/**
 * Global Object declaration
 */
var toc;
var view;
var rasterLayer;
var featureLayer;
var layer;
var control;
var interact;
var drawTools;
var measureTools;
var specifInteracts;
var GlobalMap;

//var mapChoose;

var GisMap = function () {
    'use strict';
    /**
     *  Global Object instantiation
     */
    var manager = new Manager();
    toc = new TOC();
    view = new View();
    rasterLayer = new LayerRaster();
    featureLayer = new Feature();
    layer = new Layer();
    control = new Control();
    interact = new Interaction();
    drawTools = new DrawTools();
    measureTools = new Measure();
    specifInteracts = new SpecificInteracts();

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
        manager.readAndInitParams(globalParameters, parameters);
        manager.defineCenterAndExtentByParameter(document.getElementById('id_Select').value);
        interact.initInteractions();
        view.createView();
        toc.onChangeData('Raster', $('#mapSelector').val());
        var map = new ol.Map({
            controls: ol.control.defaults().extend(control.getControls()),
            interactions: ol.interaction.defaults().extend(interact.getInteracts()),
            layers: layer.getLayersMap(),
            target: 'map',
            view: view.getView()
        });
        if (view.getExtent().length !== 0) {
            view.getView().fit(view.getExtent(), map.getSize());
        }
        /*if(mapChoose == "Attributaire"){
         createMapAttribut();
         }else{
         createMapGeneral();
         }*/
        return map;
    }

    /**
     * GisMap Listener
     * Listener to follow mapSelector event
     */
    $('#mapSelector').change( function () {
        toc.onChangeData('Raster', $('#mapSelector').val());
    });

    /**
     * GisMap Listener
     * Listener to follow drawToolSelector event
     */
    $('#drawToolSelector').change(function () {
        interact.setDrawInteraction(GlobalMap, $('#drawToolSelector').val());
    });

    /**
     * GisMap Listener
     * Listener to follow measureType event
     */
    $('#measureType').change(function () {
        interact.setMeasureInteraction(GlobalMap, $('#measureType').val());
    });

    /**
     * GisMap Listener
     * Listener to follow specificToolSelector event
     */
    $('#specificToolSelector').change(function () {
        interact.setTypeInteraction(GlobalMap, $('#specificToolSelector').val());
    });


    /**
     * GisMap Method
     * zoomTo is a method to call an action to go on a specific area in function of selected elements
     */
    var zoomTo = function () {
        var selectFeatures = SpecificInteracts.getSelectedFeatures().getArray();
        if (selectFeatures.length === 1) {
            View.getView().fit(selectFeatures[0].getGeometry(), map.getSize());
        } else if (selectFeatures.length > 1) {
            var arrayGeom = [];
            for (var selectFeature = 0; selectFeature < selectFeatures.length; selectFeature++) {
                arrayGeom.push(selectFeatures[selectFeature].getGeometry());
            }
            var geomColl = new ol.geom.GeometryCollection(arrayGeom);
            View.getView().fit(geomColl.getExtent(), map.getSize());
        }
    };

    /**
     * GisMap Method
     * deleteFeatures is a method to call an action to delete all selected elements
     */
    var deleteFeatures = function () {
        var selectFeatures = SpecificInteracts.getSelectedFeatures().getArray();
        if (selectFeatures.length !== 0) {
            var selectedLayer = SpecificInteracts.getSelectedLayer(selectFeatures[0]);
            if (selectedLayer === Measure.getMeasureLayer()) {
                Measure.cleanMeasureLayer(map);
            } else if (selectFeatures.length === 1) {
                selectedLayer.getSource().removeFeature(selectFeatures[0]);
            } else if (selectFeatures.length > 1) {
                for (var selectFeature = 0; selectFeature < selectFeatures.length; selectFeature++) {
                    selectedLayer.getSource().removeFeature(selectFeatures[selectFeature]);
                }
            }
            SpecificInteracts.getSelectedFeatures().clear();
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
        GlobalMap = initGis('#map', globalParameters, parameters);
        return GlobalMap;
    };

    return {
        initGisMap: initGisMap,
        zoomTo: zoomTo,
        deleteFeatures: deleteFeatures
    };

};