/*global ol, specifInteracts, view, editorTools, projection, GlobalMap*/
/**
 * Zoom Class manage all Zoom action included in the map
 */
var Zoom = function() {
    'use strict';

    /**
     * Zoom Method
     * zoomSuggestPoi is a method to call an action to go on a specific area in function of selected elements
     * @param x
     * @param y
     */
    var zoomSuggestPoi = function (x, y) {
        var pointPoi = new ol.geom.Point([x,y]);
        view.getView().fit(pointPoi, GlobalMap.getSize(),{
            maxZoom: view.getZoomSelect()
        });
        if(editorTools!== null && editorTools.getSuggestPoiEdit()){
            editorTools.addPoint(pointPoi);
        }
    };

    /**
     * Zoom Method
     * zoomSelect is a method to call an action to go on a specific area in function of selected elements
     */
    var zoomSelect = function () {
        var selectFeatures = specifInteracts.getSelectedFeatures().getArray();
        if(selectFeatures < 0 ) {
            selectFeatures = editorTools.getSelectInteraction().getFeatures().getArray();
        }
        if (selectFeatures.length === 1) {
            view.getView().fit(selectFeatures[0].getGeometry(), GlobalMap.getSize(),{
                maxZoom: view.getZoomSelect()
            });
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
     * Zoom Method
     * initialZoom is a method to call an action to go on a specific area at the initialization of the map
     * @param fieldGeom
     */
    var initialZoom = function (fieldGeom) {
        var feature = new ol.format.GeoJSON().readFeature(editorTools.getTransformStringToGeoJSON(document.getElementById(fieldGeom).value), {
            featureProjection: projection.getProjection().getCode(),
            dataProjection: editorTools.getEditProj()
        });
        view.getView().fit(feature.getGeometry(), GlobalMap.getSize(),{
            maxZoom: view.getZoomSelect()
        });
    };

    return{
        zoomSuggestPoi: zoomSuggestPoi,
        zoomSelect: zoomSelect,
        initialZoom: initialZoom
    };
};