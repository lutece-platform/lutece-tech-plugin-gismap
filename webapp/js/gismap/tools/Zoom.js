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

    var getCurrentZoom = function(){
        var current_zoom = viewGisMap.getView().getZoom();
        return current_zoom;
    };

	
      // An elastic easing method (from https://github.com/DmitryBaranovskiy/raphael).
      function elastic(t) {
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
      }
    /**
     * Zoom Method
     * zoomSuggestPoi is a method to call an action to go on a specific area in function of selected elements
     * @param x is the x coordinate
     * @param y is the y coordinate
     */
    var zoomSuggestPoi = function (x, y) {
        var pointPoi = new ol.geom.Point([x,y]);
		var targetConstrainedCenter = viewGisMap.getView().constrainCenter([x,y]);
		var previousCenter = viewGisMap.getView().getCenter();

		//if target center is outside the view limit extent, then come-back to the inital location
		if( targetConstrainedCenter[0] !== x || targetConstrainedCenter[1] !== y){
			var offsetShakeAnimation = GlobalMap.getView().getResolution()* 100;
			var shakeCenter = [previousCenter[0] + offsetShakeAnimation, previousCenter[1]];
			viewGisMap.getView().animate({
				center: shakeCenter,
				duration: 250,
				easing: ol.easing.easeIn
			},{
				center: previousCenter,
				duration: 1500,
				easing: elastic
			});	
			console.log("Zoom error : target address is located outside map boundaries");			
		}else{
			viewGisMap.getView().fit(pointPoi,{
				size: GlobalMap.getSize(),
				maxZoom: viewGisMap.getZoomSelect()
			});
			if(interact.getEditor()!== null && interact.getEditor().getSuggestPoiEdit()){
				interact.getEditor().addPoint(pointPoi);
			}
			//set Previous center usefull for the zoom Max/Min limitation
			GlobalMap.getView().previousCenter = GlobalMap.getView().getCenter();
		}
    };

    /**
     * Zoom Method
     * zoomSelect is a method to call an action to go on a specific area in function of selected elements
     */
    var zoomSelect = function () {
        var selectFeatures = interact.getSpecificInteract().getSelectedFeatures().getArray();
        if(selectFeatures.length === 0 ) {
            selectFeatures = interact.getEditor().getSelectEditInteract().getFeatures().getArray();
        }
		//if nothing is selected then zoom to the geometry field coordinates
		if(selectFeatures.length === 0 ) {
            var geomfieldData = interact.getEditor().getFieldData().value || interact.getEditor().getFieldData().innerHTML ;
			if (geomfieldData !== undefined && geomfieldData != ''){
				var feature = new ol.format.GeoJSON().readFeature(interact.getEditor().getTransformData(geomfieldData), {
					featureProjection: projection.getProjection().getCode(),
					dataProjection: interact.getEditor().getEditProj()
				});
				if (feature !== undefined && feature.getGeometry() != undefined ){
					viewGisMap.getView().fit(feature.getGeometry(), GlobalMap.getSize(), {
						maxZoom: viewGisMap.getZoomSelect()
					});
				}
			}
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
		//set Previous center usefull for the zoom Max/Min limitation
		GlobalMap.getView().previousCenter = GlobalMap.getView().getCenter();
    };

    /**
     * Zoom Method
     * initialZoom is a method to call an action to go on a specific area at the initialization of the map
     * @param fieldGeom is the field where is stock geometry
     */
    var initialZoom = function (fieldGeom) {
        if(interact.getEditor() !== null) {
            var geomfieldData = interact.getEditor().getFieldData().value || interact.getEditor().getFieldData().innerHTML ;
            var feature = new ol.format.GeoJSON().readFeature(interact.getEditor().getTransformData(geomfieldData), {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: interact.getEditor().getEditProj()
            });
			if (feature !== undefined && feature.getGeometry() != undefined ){
				viewGisMap.getView().fit(feature.getGeometry(), GlobalMap.getSize(), {
					maxZoom: viewGisMap.getZoomSelect()
				});
			}
			GlobalMap.getView().previousCenter = GlobalMap.getView().getCenter();
        }
    };

    return{
        setInteract: setInteract,
        zoomSuggestPoi: zoomSuggestPoi,
        zoomSelect: zoomSelect,
        initialZoom: initialZoom,
        getCurrentZoom: getCurrentZoom
    };
};
