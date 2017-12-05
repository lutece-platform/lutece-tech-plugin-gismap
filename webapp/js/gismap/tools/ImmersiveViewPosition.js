/*globals ol*/

/**
 *  ImmersiveViewPosition Class manage the ImmersiveView position tracking system
 */

function ImmersiveViewPosition(currentMap, viewGisMap) {
    'use strict';

    /**
     * enable is the current value to show the immersive view position
	 * TODO: manage enabling/disabling this tool
     * @type {boolean}
     */
    this.enable = true;

	this.style = new StyleDefinition();
		
    /**
     * ivFeature contains all geoloc features
     * @type {Kw.http://www.opengis.net/wfs.Feature}
     */
    var ivFeature = new ol.Feature();
	
	ivFeature.setStyle(this.style.defaultImmersiveViewMarkerStyle);

    /**
     * Handler to set the geometry of the geolocation
     */
    this.updateMarker = function(coordinates) {
        ivFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        viewGisMap.getView().setCenter(coordinates);
    };

    /**
     * ivLayer is the layer of the point of the immersive view position tracking
     * @type {ol.layer.Vector}
     */
    this.ivLayer =  new ol.layer.Vector({
        map: currentMap,
        visible : true,
        source: new ol.source.Vector({
            features: [ivFeature]
        })
    });

}
