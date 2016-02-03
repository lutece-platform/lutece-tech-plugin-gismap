/** 
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/LayerSwitcher.js
 */

/**
 * Class: OpenLayers.StaticGeolocalizationControl
 *
 * Inherits from:
 *  - <OpenLayers.Control.LayerSwitcher>
 */
OpenLayers.Control.StaticGeolocalizationControl =
OpenLayers.Class(OpenLayers.Control.LayerSwitcher,{
	
    positionVectorLayer: null,
    
    markerLonLat: null,
    
    graphicStyle:null,
        
    displayedFeature: null,
    
    minZoomLevel: null,
    
    controls: null,

    /**
     * Constructor
     */
    initialize: function (options, map){
    	OpenLayers.Control.prototype.initialize.apply(this, arguments);
    	
    	this.graphicStyle = new OpenLayers.Style(options['style']);
    	this.minZoomLevel = options['minZoomLevel'];
    	
    	this.setMap(map);
    },
     
    /**
     * Method: cleanFeatures
     */
    cleanFeatures: function( ){
    
    	if( this.displayedFeature != null ) {
        	this.positionVectorLayer.removeFeatures(this.displayedFeature);
    	}
    },
    
    /**
     * Method: listenLocalisationCleanFeatureEvent
     * 
     * Properties:
	 * event <Event>
     */
    listenLocalisationCleanFeatureEvent : function( event )
    {
    	$("body").bind("GisLocalization.clean", $.proxy( 
    			function ( event ) {
    		 		this.map.zoomToMaxExtent();
    				this.cleanFeatures();
    			},
    			this)
    		);
    },
    
    /**
     * Method: listenActivatePopup
     * 
     * Properties:
	 * event <Event>
     */
    listenActivatePopup : function( event ) {
    	$("body").bind("GisLocalization.activatePopup", $.proxy( 
    			function ( event ) {
    				this.activatePopup();
    			},
    			this)
    		);
    },
    
    /**
     * Method: listenCreatePopup
     * 
     * Properties:
	 * event <Event>
     */
    listenCreatePopup : function( event ) {
    	$("body").bind("GisLocalization.createPopup", $.proxy( 
    			function ( event ) {
    				this.createPopup(event.feature);
    			},
    			this)
    		);
    },
    
    /**
     * Method: listenAddFeatureEvent
     * 
     * Properties:
	 * event <Event>
     */
    listenAddFeatureEvent : function( event )
    {
    	$("body").bind("GisLocalization.addFeature", $.proxy( 
    			function ( event ) {
    		    	var lonLat = this.getLonLatFromPoi(event.poi);
    		    	// add the feature on the layer
    		    	this.addFeatureWithPopup(lonLat, event.label);
    		    	this.activatePopup();
    			},
    			this)
    		);
    },
    
    /**
     * Method: listenLocalizationSendEvent
     * 
     * Properties:
	 * event <Event>
     */
    listenLocalizationSendEvent: function( event )
    {
    	$("body").bind("GisLocalization.send.POI",  
    			$.proxy( function ( event ) {
    				this.drawFeatureOnWithPoi(event.poi);
    			},
    			this)
    	);
    },
    
    /**
     * Method: addFeature
     * 
     * Properties:
     * lonLat - <Openlayers.LonLat>
     */
    addFeature: function( lonLat ){
    	
    	var point = new OpenLayers.Geometry.Point( lonLat.lon, lonLat.lat );
    	
    	this.displayedFeature = new OpenLayers.Feature.Vector( point, lonLat );

    	this.positionVectorLayer.addFeatures(this.displayedFeature);
    },
    
    /**
     * Method: getLonLatFromPoi
     * this method create a OpenLayer.LonLat object from a poi.
     * It also change the coordinate system of the poi to the map projection system.
     * 
     * Properties : 
     * poi - POI object with at least a x,y coordiate and the srid of this POI
     * 
     * Return :
     * 	LonLat - <OpenLayers.LonLat> the LonLat object in map srid
     */
    getLonLatFromPoi: function(poi) {
    	// change proj system if needed
    	var srid = this.map.getProjectionObject().getCode();
    	var p = null;
    	if ( poi.srid != undefined && poi.srid != "" && poi.srid != srid ) {
			var source = new Proj4js.Proj(poi.srid);
			var dest = new Proj4js.Proj(srid);
			var p = new Proj4js.Point(poi.x, poi.y);   
			Proj4js.transform(source, dest, p);
    	}
    	if (p != null) {
    		return new OpenLayers.LonLat(p.x,p.y);
    	} else {
    		return new OpenLayers.LonLat(poi.x,poi.y);
    	}
    },
    
    /**
     * Method : drawFeatureOnWithPoi
     * This method draw a feature on the postionLayer
     * 
     * Properties :
     * poi - the poi to add on layer
     */
    drawFeatureOnWithPoi: function( poi ) {
    	//get the LonLat object from poi
    	var lonLat = this.getLonLatFromPoi(poi);
    	this.cleanFeatures();
    	// add the feature on the layer
    	this.addFeature(lonLat);
    },
    
    /**
     * Method: getSRID
     *
     */   
    getSRID: function() {
    	var srid = this.map.getProjectionObject().getCode();
    	return srid.substring(srid.indexOf(':')+1, srid.length);
    },

    /**
     * Method: setMap
     *
     * Properties:
     * map - {<OpenLayers.Map>}
     */
     setMap: function(map) {
         OpenLayers.Control.prototype.setMap.apply(this, arguments);
         
     	// create a new vector layer
     	this.positionVectorLayer = new OpenLayers.Layer.Vector("Marker", {
     		displayInLayerSwitcher: false,
             styleMap: this.graphicStyle,
             rendererOptions: {zIndexing: true}
        });
     	
     	// set center map on a feature added event
     	this.positionVectorLayer.events.register("featureadded", this, function(evt) {
     		var zoom;
     		
 			//If the geolocalization min zoom is inferior to the current zoom, we keep the current zoom
 			if (this.minZoomLevel < this.map.zoom) {
 				zoom = this.map.zoom;
 			}
 			//Zoom to the geolocalization min zoom level
 			else {
     			zoom = this.minZoomLevel;
 			}
     		
     		var bounds = this.positionVectorLayer.getDataExtent();
     		this.map.setCenter(bounds.getCenterLonLat(),zoom, false);
     	});
     	
     	// Add a new layer to the map
     	this.map.addLayer(this.positionVectorLayer);
        
     },
     
     /**
      * Method: redraw
      */
    redraw: function (){
    	// ignore
        return this.div;
    },
    
     
    /** 
     * Method: ignoreEvent
     * 
     * Parameters:
     * evt - {Event} 
     */
    ignoreEvent: function(evt) {
        OpenLayers.Event.stop(evt,true);
    },
    
    /** 
     * Handle Popup
     */
    
    /**
     * Method: addFeatureWithPopup
     * 
     * Properties:
     * lonLat - <Openlayers.LonLat>
     * label - The popupContent
     */
    addFeatureWithPopup: function( lonLat, label ){
    	var point = new OpenLayers.Geometry.Point( lonLat.lon, lonLat.lat );
    	//To add new Vector Layer
    	this.displayedFeature = new OpenLayers.Feature.Vector( point, {'description': label} );
    	// this.displayedFeature = new OpenLayers.Feature.Vector( point, lonLat );
    	this.positionVectorLayer.addFeatures(this.displayedFeature);
    },
    
    /**
     * Method: activatePopup
     * this method activate popup in the map.
     */
    activatePopup: function() {
    	//Add a selector control to the vectorLayer with popup functions
        controls = {
          selector: new OpenLayers.Control.SelectFeature(this.positionVectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
        };
        
        // Add the popup to the map
        this.map.addControl(controls['selector']);
        controls['selector'].activate();
    },
    
    createPopup: function(feature) {
    	  feature.popup = new OpenLayers.Popup.FramedCloud("pop",
    	      feature.geometry.getBounds().getCenterLonLat(),
    	      null,
    	      '<div class="markerContent">'+feature.attributes.description+'</div>',
    	      null,
    	      true,
    	      function() { controls['selector'].unselectAll(); }
    	  );
    	  //feature.popup.closeOnMove = true;
    	  this.map.addPopup(feature.popup);
    },
    
    CLASS_NAME: "OpenLayers.Control.StaticGeolocalizationControl"
});


/**
 * Method: createPopup
 * this method open the popup of the feature.
 * 
 * Properties : 
 * feature - the feature of the popup to open
 */
function createPopup(feature) {
	$("body").trigger(
		jQuery.Event("GisLocalization.createPopup", {
			feature: feature
			})
	);
}

/**
 * Method: destroyPopup
 * this method close the popup of the feature.
 * 
 * Properties : 
 * feature - the feature of the popup to close
 */
function destroyPopup(feature) {
  feature.popup.destroy();
  feature.popup = null;
}
