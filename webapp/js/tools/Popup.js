/*global ol, GlobalMap*/
/**
 * Popup Class manage all popups included in the map
 */
var Popup = function() {
    'use strict';

    /**
    * Create an overlay to anchor the popup to the map.
    */
    var overlay = new ol.Overlay.Popup();
    this.queryLayers = [];
    this.queryData = [];

    this.initOverlayPopupElements = function(parameters){
        console.log(parameters);
    }

    GlobalMap.on('click', function(evt) {
        overlay.hide();
        var layers = [];
        var features = [];
	    GlobalMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
		    features.push(feature);
		});
        GlobalMap.forEachLayerAtPixel(evt.pixel, function (layer) {
		    layers.push(layer);
		});
	    features.forEach(function(f){
            var keys = f.getKeys();
            var data = '';
            for(var i = 0; i < keys.length; i++ ){
                console.log(keys[i])
                if(keys[i] !== 'geometry') {
                    data = data + '<p>' + f.get(keys[i]) + '</p>';
                }
            }
		    overlay.show(evt.coordinate,'<div><h2>Data</h2><p>' + prettyCoord + '</p></div>');
		});
    });

    this.getPopup = function(){
        return overlay;
    };
};