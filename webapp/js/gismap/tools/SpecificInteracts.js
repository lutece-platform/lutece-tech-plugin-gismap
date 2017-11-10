/*global ol*/

/**
 * SpecificInteracts Class manage a part of interaction enabled on the map
 */
function SpecificInteracts( interact, selectType, layer, featureLayer){
    'use strict';
    this.drawFeature = new ol.Collection();
    this.drawSource = new ol.source.Vector({features: this.drawFeature});
	this.drawLayer = new ol.layer.Vector({
		source:this.drawSource,
		useSpatialIndex : false
	});
	
	this.getDrawLayer = function(){
		return this.drawLayer;
	};
	var type, geometryFunction, maxPoints;
		
	if (selectType === 'Box'){
		geometryFunction = function(coordinates, geometry) {	
		  if (!geometry) {
			geometry = new ol.geom.Polygon(null);
		  }
		  var start = coordinates[0];
		  var end = coordinates[1];
		  geometry.setCoordinates([
			[start, [start[0], end[1]], end, [end[0], start[1]], start]
		  ]);
		  return geometry;
		};
		maxPoints = 2;
		type = 'LineString';
	}
	else{
		type = selectType;
	}
    
	this.drawSelectInteraction = new ol.interaction.Draw({
			source: this.drawLayer.getSource(),
			type: type,
			geometryFunction: geometryFunction,
			maxPoints: maxPoints
		});
	
	
    /**
     * selectInteract is the interaction to select a feature on the map
     * @type {ol.interaction.Select}
     */
    this.selectInteract = new ol.interaction.Select({
        filter: function(feature) {
            if(feature.get('features') !== undefined && feature.get('features').length !== 1){
                return false;
            }else{
                return true;
            }
        }
    });

    /**
     * selectClusterInteract is the interaction to manipulate the style of clustering features on the map
     * @type {ol.interaction.Select}
     */
    this.selectClusterInteract = new ol.interaction.Select({
        condition: function(evt) {
            return evt.type === 'click';
        },
        layers: function(layer) {
            var layers = featureLayer.getClusterLayers();
            for(var i = 0; i < layers.length; i++){
                if(layers[i] === layer){
                    return true;
                }
            }
            return false;
        },
        style: featureLayer.getSpecificStyle().selectStyleCluster
    });
    
	/**
     * setActiveInteraction activate the select interaction and the draw interaction depending on the selectType parameter
     * @type {ol.interaction.Select}
     */
	this.setActiveInteraction = function (enable){
		this.selectInteract.setActive(enable);
		//Advanced select with geometry draw
		if( enable === true && (selectType === 'Circle' || selectType === 'Box' || selectType === 'Polygon')){
			this.drawSelectInteraction.setActive(true);
		}
		else{ // default click select
			this.drawSelectInteraction.setActive(false);
		}
	}
	
    /**
     * getDrawSelectInteraction is an accessor to a specific draw select interaction on the map
     * @param value is the type of geometry drawn
     * @returns {ol.interaction.Draw} the draw interaction
     */
    this.getDrawSelectInteraction = function() {
        return this.drawSelectInteraction;
    };
    
	 /**
     * drawEditInteract.on is a Listener to disable single-click Select while starting draw
     */
    this.drawSelectInteraction.on('drawstart', function (event) { 
	var selectInteraction = interact.getSpecificInteract().getSelectInteraction();
	selectInteraction.getFeatures().clear();
	selectInteraction.setActive(false); 
	});
		
    /**
     * drawEditInteract.on is a Listener to add selected features after drawing
     */
    this.drawSelectInteraction.on('drawend', function (event) {

		var selectInteraction = interact.getSpecificInteract().getSelectInteraction();
		selectInteraction.getFeatures().clear();
		interact.getSpecificInteract().getDrawLayer().getSource().clear();

		var parser = new jsts.io.OL3Parser();
		var reader_wkt = new jsts.io.WKTReader();
    	var geometry = event.feature.getGeometry();
		var geometry_select;
		
		if (geometry.getType() === 'Circle'){
			var pt = reader_wkt.read('POINT (' + geometry.getCenter().join(' ')+ ')');
			geometry_select = pt.buffer(geometry.getRadius());
		}
		else{
			geometry_select = parser.read(geometry);
		}
		var extent = event.feature.getGeometry().getExtent();
		var bduplicate = false;
		var tempSelectedFeaturesIds = [];
		for (var i = 0 ; i < layer.getLayersFeatureMap().length; i++){
			var featureLayer = layer.getLayersFeatureMap()[i];
			if(featureLayer.getVisible()){

              var layer_select_geometries = featureLayer
                .getSource()
                .getFeatures()
                .filter(function(el) {
                  if (geometry_select.contains(parser.read(el.getGeometry()))) {
					  for( var j= 0; j< tempSelectedFeaturesIds.length; j++){						
						if (tempSelectedFeaturesIds[j] === el.getId())
						{
							console.log("duplicate feature ID " + el.getId() + " will be ignored in current selection");
							return false;
						}
					  }
					  tempSelectedFeaturesIds.push(el.getId() );
					  return true;
                  }
                });
              selectInteraction.getFeatures().extend(layer_select_geometries);
			}			
		}
		tempSelectedFeaturesIds = [];
		//enable select after 300ms to avoid unwanted unselect
		setTimeout(function(){ 
			interact.getSpecificInteract().getSelectInteraction().setActive(true); 
		}, 300);
    });

    /**
     * SpecificInteracts Method
     * getSelectInteraction is a getter to access at the Selector
     * @returns {ol.interaction.Select} the select interaction
     */
    this.getSelectInteraction = function(){
        return this.selectInteract;
    };

    /**
     * SpecificInteracts Method
     * getSelectClusterInteraction is a getter to access at the Selector for cluster layer
     * @returns {ol.interaction.Select} the select cluster interaction
     */
    this.getSelectClusterInteraction = function(){
        return this.selectClusterInteract;
    };


    /**
     * SpecificInteracts Method
     * getSelectedFeatures is a getter to access at all features selected
     * @returns {*} an array of all selected features
     */
    this.getSelectedFeatures = function(){
        return this.selectInteract.getFeatures();
    };

    /**
     * SpecificInteracts Method
     * getSelectedLayer is a getter to access at the layer to contains selected features
     * @param feature is the selected feature
     * @returns {*} the layer
     */
    this.getSelectedLayer = function(feature){
        return this.selectInteract.getLayer(feature);
    };

    /**
     * SpecificInteracts Method
     * getSpecificSelectedFeatures is a getter to send all features selected to another plugin
     * @returns {*} an array of the Ids
     */
    this.getSpecificSelectedFeatures = function(){
        var selectedElementId = [];
        var selectableLayers = layer.getSelectableLayers();
        var selection = this.selectInteract.getFeatures().getArray();
        for(var i = 0; i < selection.length; i++){
			selectedElementId.push(selection[i].getId());
		}
        return selectedElementId;
    };

    /**
     * SpecificInteracts Method
     * setSpecificSelectedFeatures is a setter to select features by another plugin
     * @param idFeature is an array of the Ids
     */
    this.setSpecificSelectedFeatures = function(idFeatures){
        this.getSelectedFeatures().clear();
        var features = this.selectInteract.getFeatures();
        var selectableLayers = layer.getSelectableLayers();
        for(var i = 0; i < idFeatures.length; i++) {
            for (var j = 0; j < selectableLayers.length; j++) {
				var feature_to_select = featureLayer.getFeatureByName(selectableLayers[j]).getSource().getFeatureById(idFeatures[i]);
				if (feature_to_select != undefined){features.push(feature_to_select);}				
				} 
		}
    };
}