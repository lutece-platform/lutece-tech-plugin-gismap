/*global ol, specifInteracts, view, editorTools, GlobalMap*/
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
        view.getView().fit(pointPoi, GlobalMap.getSize());
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

    return{
        zoomSuggestPoi: zoomSuggestPoi,
        zoomSelect: zoomSelect
    };
};