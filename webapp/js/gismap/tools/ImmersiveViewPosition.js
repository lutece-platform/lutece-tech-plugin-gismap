/*globals ol*/

/**
 *  ImmersiveViewPosition Class manage the ImmersiveView position tracking system
 */

function ImmersiveViewPosition(currentMap) {
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
	
	var viewClickListener;
	
    /**
     * Handler to set the geometry of the geolocation
     */
    this.updateMarker = function(coordinates) {
        ivFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
		currentMap.getView().animate({
			center: coordinates,
			duration: 500
		});
		currentMap.render();
	}

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
		
	 /**
     * ImmersiveView METHOD
     * enableImmersiveView active the tracking of immersive view position and the draw the layer on the map
     */
    this.enableImmersiveView = function(){
        this.enable = true;
		this.ivLayer.setVisible(true);
		viewClickListener = currentMap.on(['click'], function (ev) {
			currentMap.un(['click']);
			// Get the Lat & Long for RL Viewer
			var lonlat = new ol.proj.transform(ev.coordinate, currentMap.getView().getProjection(), 'EPSG:4326');
			// Move to new location on RL 3D panel
			viewer.setLocation(new H.realitylens.Geodesic({
			  lat: lonlat[1],
			  lon: lonlat[0]
			})).then(function (loc) {
				  //console.log (loc);
				}).catch(function (err) {
				  console.log(err);
					});
		});
		currentMap.render();
    };

    /**
     * ImmersiveView METHOD
     * disableImmersiveView disable the tracking of immersive view position and the draw the layer on the map
     */
    this.disableImmersiveView = function(){
        this.enable = false;
		this.ivLayer.setVisible(false);
		ol.Observable.unByKey(viewClickListener);
		currentMap.render();
    };

    /**
     * GeoPoint METHOD
     * setActiveInteraction is the method to manage the tracking of immersive view position and the draw the layer on the map
     */
    this.setActiveInteraction = function( enable){
        if(enable){
            this.enableImmersiveView();
        }else{
            this.disableImmersiveView();
        }
    };

}
