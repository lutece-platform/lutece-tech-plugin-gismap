/*global ol*/
/**
 * Zoom Class manage all Zoom action included in the map
 */
var Zoom = function(GlobalMap, projection, viewGisMap) {
    'use strict';
    /**
     * interact stock a reference of the current interact of the map
     * @type {Interaction}
     */
    var interact = null;

    /**
     * Zoom Method
     * setInteract is a setter to define the interact reference
     * @param newInteract
     */
    var setInteract = function(newInteract){
        interact = newInteract;
    };

    /**
     * Zoom Method
     * zoomSuggestPoi is a method to call an action to go on a specific area in function of selected elements
     * @param x is the x coordinate
     * @param y is the y coordinate
     */
    var zoomSuggestPoi = function (x, y) {
        var pointPoi = new ol.geom.Point([x,y]);
        viewGisMap.getView().fit(pointPoi, GlobalMap.getSize(),{
            maxZoom: viewGisMap.getZoomSelect()
        });
        if(interact.getEditor()!== null && interact.getEditor().getSuggestPoiEdit()){
            interact.getEditor().addPoint(pointPoi);
        }
    };

    /**
     * Zoom Method
     * zoomSelect is a method to call an action to go on a specific area in function of selected elements
     */
    var zoomSelect = function () {
        var selectFeatures = interact.getSpecificInteract().getSelectedFeatures().getArray();
        if(selectFeatures < 0 ) {
            selectFeatures = interact.getEditor().getSelectInteraction().getFeatures().getArray();
        }
        if (selectFeatures.length === 1) {
            viewGisMap.getView().fit(selectFeatures[0].getGeometry(), GlobalMap.getSize(),{
                maxZoom: viewGisMap.getZoomSelect()
            });
        } else if (selectFeatures.length > 1) {
            var arrayGeom = [];
            for (var selectFeature = 0; selectFeature < selectFeatures.length; selectFeature++) {
                arrayGeom.push(selectFeatures[selectFeature].getGeometry());
            }
            var geomColl = new ol.geom.GeometryCollection(arrayGeom);
            viewGisMap.getView().fit(geomColl.getExtent(), GlobalMap.getSize());
        }
    };

    /**
     * Zoom Method
     * initialZoom is a method to call an action to go on a specific area at the initialization of the map
     * @param fieldGeom is the field where is stock geometry
     */
    var initialZoom = function (fieldGeom) {
        if(interact.getEditor() !== null) {
            var feature = new ol.format.GeoJSON().readFeature(interact.getEditor().getTransformData(document.getElementById(fieldGeom).value), {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: interact.getEditor().getEditProj()
            });
            viewGisMap.getView().fit(feature.getGeometry(), GlobalMap.getSize(), {
                maxZoom: viewGisMap.getZoomSelect()
            });
        }
    };

    return{
        setInteract: setInteract,
        zoomSuggestPoi: zoomSuggestPoi,
        zoomSelect: zoomSelect,
        initialZoom: initialZoom
    };
};