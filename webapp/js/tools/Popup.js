/*global ol, GlobalMap*/
/**
 * Popup Class manage all popups included in the map
 */
var Popup = function() {
    'use strict';
    /**
    * Elements that make up the popup.
    */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');


    /**
    * Create an overlay to anchor the popup to the map.
    */
    var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));


    /**
    * Add a click handler to hide the popup.
    * @return {boolean} Don't follow the href.
    */
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    GlobalMap.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        content.innerHTML = '<p>You clicked here:</p>' +
            '<code></code>';
        overlay.setPosition(coordinate);
      });


    this.getPopup = function(){
        return overlay;
    };
};