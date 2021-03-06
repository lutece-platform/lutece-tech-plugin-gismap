/*global ol, LayerRaster, Feature*/

/**
 * Layer Class manage all layers in the map
 */

function Layer(projection, proxy) {
    'use strict';
    /**
     * interact stock a reference of the current interact of the map
     * @type {Interaction}
     */
    var interact = null;
    /**
     * ListLayers contains all Layers of the map
     * @type {Array}
     */
    this.ListLayers = [];
    /**
     * selectableLayers contains all selectable Layers of the map
     * @type {Array}
     */
    this.selectableLayers = [];

    /**
     * defaultWMTSResolutions store the resolution array if defaultbackground is a WMTS layer
	 * @type {Array}
     */	 
	this.defaultWMTSResolutions = [];
	
    /**
     * defaultBackground layer name 
	 * @type {string}
     */	 
	this.defaultBackground = '';
	
	this.setDefaultBackGround = function(layerName){
		this.defaultBackground = layerName;
	};	
	
    /**
     * featureLayerGis is the Feature Layer object
     * @type {Feature}
     */	 
    this.featureLayerGis = new Feature(projection, proxy);
    /**
     * rasterLayerGis is the Raster Layer object
     * @type {LayerRaster}
     */
    this.rasterLayerGis = new LayerRaster(projection, proxy);
    /**
     * Layer Method
     * getLayers is a getter to all Layers
     * @returns {Array} is an array with all data layers of the map
     */
    this.getLayers = function(){
        return this.ListLayers;
    };

     /**
     * Layer Method
     * getVisibleLayers is a getter to all layers and his visible value
     * @returns {Array} is an array with all layers and his visible value of the map
     */
    this.getVisibleLayers = function(){
        var ListVisibleLayers = [];
        var RasterLayer = this.getLayersRasterMap();
        var FeatureLayer = this.getLayersFeatureMap();
        for(var i = 0; i < RasterLayer.length; i++){
            ListVisibleLayers.push("'"+RasterLayer[i].get('title')+"'");
            ListVisibleLayers.push(RasterLayer[i].getVisible());
        }
        for(var j = 0; j < FeatureLayer.length; j++){
            ListVisibleLayers.push("'"+FeatureLayer[j].get('title')+"'");
            ListVisibleLayers.push(FeatureLayer[j].getVisible());
        }
        return ListVisibleLayers;
    };

    /**
     * Layer Method
     * getSelectedLayers is a getter to all selectable Layers
     * @returns {Array} is an array with all selectable layers of the map
     */
    this.getSelectableLayers = function(){
        return this.selectableLayers;
    };

    /**
     * Layer Method
     * getFeatureLayers is a getter to Feature Layer Object
     * @returns {Feature|*}
     */
    this.getFeatureLayers = function(){
        return this.featureLayerGis;
    };

    /**
     * Layer Method
     * getRasterLayers is a getter to Raster Layer Object
     * @returns {LayerRaster|*}
     */
    this.getRasterLayers = function(){
        return this.rasterLayerGis;
    };

    /**
     * Layer Method
     * setInteract is a setter to define the interact reference
     * @param newInteract
     */
    this.setInteract = function(newInteract){
        interact = newInteract;
    };

    /**
     * Layer Method
     * addLayerRaster add a background map at the ListLayer
     * @param backGround is an array with all parameters to define a background
     */
    this.addLayerRaster = function(backGround){
        var name = this.rasterLayerGis.createRasterLayer(backGround);
        this.ListLayers.push(name);
    };

    /**
     * Layer Method
     * addWMSLayerRaster add a background map at the ListLayer to a WMS
     * @param wms is an array with all parameters to define a wms layer
     */
    this.addWMSLayerRaster = function(wms){
        var wmsLibelle = wms[0];
        var wmsServer = wms[1];
        var wmsUrl = wms[2];
        var wmsLayer = wms[3];
        var wmsAttribution = wms[4];
        this.rasterLayerGis.createWMSLayer(wmsLibelle, wmsServer, wmsUrl, wmsLayer, wmsAttribution);
        this.ListLayers.push(wmsLibelle);
    };

    /**
     * Layer Method
     * addWMTSLayerRaster add a background map at the ListLayer to a WMTS
     * @param wmts is an array with all parameters to define a wmts layer
     */
    this.addWMTSLayerRaster = function(wmts){
        var wmtsLibelle = wmts[0];
        var wmtsServer = wmts[1];
        var wmtsUrl = wmts[2];
        var wmtsProj = wmts[3];
        var wmtsReso = wmts[4];
        var wmtsOrigin = wmts[5];
        var wmtsAttribution = wmts[6];
		var isDefault = this.isDefaultBackGround(wmtsLibelle);
		var wmtsResolutions = this.rasterLayerGis.createWMTSLayer(wmtsLibelle, wmtsServer, wmtsUrl, wmtsProj, wmtsReso, wmtsOrigin, wmtsAttribution, isDefault);
		//If DefaultBackground then get the resolutions to apply it to the view
		if(wmtsResolutions !== undefined && wmtsResolutions !== '' && isDefault){
			this.setDefaultWMTSResolutions(wmtsResolutions);
		}
		this.ListLayers.push(wmtsLibelle);
    };

    /**
     * Layer Method
     * addWMSQueryLayerRaster add a background map at the ListLayer to a WMS
     * @param wms is an array with all parameters to define a wms layer
     */
    this.addWMSQueryLayerRaster = function(wms){
        var wmsOrder = wms[0];
        var wmsName = wms[1];
        var wmsServer = wms[2];
        var wmsUrl = wms[3];
        var wmsLayer = wms[4];
        var wmsVisbility = wms[5];
        var wmsAttribution = wms[6];
        var wmsResoMin = wms[7];
        var wmsResoMax = wms[8];
        this.featureLayerGis.createWMSQueryLayer(wmsName, wmsServer, wmsUrl, wmsLayer, wmsVisbility, wmsAttribution, wmsResoMin, wmsResoMax);
        this.ListLayers.push(wmsOrder +'-'+ wmsName);
    };

    /**
     * Layer Method
     * addWFSLayer add a layer map at the ListLayer to a WFS
     * @param wfs is an array with all parameters to define a wfs layer
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param thematicComplex define the thematic complex parameters
     */
    this.addWFSLayer = function(wfs, heatmap, thematic, cluster, thematicComplex){
        var wfsIdLayer = wfs[0];
        var wfsServer = wfs[1];
        var wfsUrl = wfs[2];
        var wfsProj = wfs[3];
        var wfsQuery = wfs[4];
        var wfsAttribution = wfs[5];
        var wfsLayers = this.featureLayerGis.createWFSLayer(wfsIdLayer, wfsServer, wfsUrl, wfsProj, wfsQuery, wfsAttribution, heatmap, thematic, cluster, thematicComplex);
        for(var i = 0; i < wfsLayers.length; i++) {
            this.ListLayers.push(wfsLayers[i]);
        }
    };

    /**
     * Layer Method
     * addLayerVector add a layer map at the ListLayer
     * @param data is an array with all parameters to define a specific layer
     * @param format is the type of data
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param thematicComplex define the thematic complex parameters
     */
    this.addLayerVector = function(data, format, heatmap, thematic, cluster, thematicComplex){
        var names = this.featureLayerGis.addLayerFeature(data, format, heatmap, thematic, cluster, thematicComplex);
        for(var i = 0; i < names.length; i++) {
            this.ListLayers.push(names[i]);
            this.selectableLayers.push(names[i].split('-')[1]);
        }
    };
	
	/**
     * Layer Method
     * returns true if the given layerName is the defaultbackground
     * @param layerName is the name of a layer
     */
	this.isDefaultBackGround = function(layerName){
		return(layerName === this.defaultBackground);
    };

	/**
	* activateDefaultBackGround activates the default background to initiate the map
	*/
	this.activateDefaultBackGround = function(){
		for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(this.ListLayers[layerMap] === this.defaultBackground) {
                if (this.rasterLayerGis.getRasterByName(this.ListLayers[layerMap]) !== undefined){
					this.rasterLayerGis.setRasterVisibility(this.ListLayers[layerMap], true);
				}
            }
        }
	};
	
	
    /**
     * Layer Method
     * getLayersRasterMap is a getter to all Rasters Layers
     * @returns {Array} is an array with all raster layers of the map
     */
    this.getLayersRasterMap = function(){
        var ListLayersRasterMap = [];
        for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(this.rasterLayerGis.getRasterByName(this.ListLayers[layerMap])!== undefined) {
                ListLayersRasterMap.push(this.rasterLayerGis.getRasterByName(this.ListLayers[layerMap]));
            }
        }
        return ListLayersRasterMap;
    };

    /**
     * Layer Method
     * getLayersFeatureMap is a getter to all Features Layers
     * @returns {Array} is an array with all feature layers of the map
     */
    this.getLayersFeatureMap = function(){
        var ListLayersFeatureMap = [];
        for (var layerMap = this.ListLayers.length-1; layerMap >= 0; layerMap--){
            var layerMapName = this.ListLayers[layerMap].split('-')[1];
            if(this.featureLayerGis.getFeatureByName(layerMapName)!== undefined) {
                ListLayersFeatureMap.push(this.featureLayerGis.getFeatureByName(layerMapName));
            }
        }
        return ListLayersFeatureMap;
    };

    /**
     * Layer Method
     * getLayersMap is a getter to all Layers in groups
     * @returns {Array} is an array with all data layers in groups
     */
     this.getLayersMap = function(){
         var ListLayersMap = [];
         this.ListLayers.sort();
         ListLayersMap.push(new ol.layer.Group({
             title:'Fonds de plan',
             layers: this.getLayersRasterMap()
         }));
         ListLayersMap.push(new ol.layer.Group({
             title:'Couches',
             layers: this.getLayersFeatureMap()
         }));
         ListLayersMap.push(interact.getDraw().getDrawLayer());
         ListLayersMap.push(interact.getMeasure().getMeasureLayer());
         if(interact.getEditor() !== null){
             ListLayersMap.push(interact.getEditor().getEditLayer());
         }
         return ListLayersMap;
    };

    /**
     * Layer Method
     * showLayer enable or disable a visibility of a layer
     * @param layerName the name of the layer
     * @param visible the indicator of visibility
     */
     this.showLayer = function(layerName, visible){
        if(this.rasterLayerGis.getRasterByName(layerName)!== undefined) {
            this.rasterLayerGis.getRasterByName(layerName).setVisible(visible);
        }
        if(this.featureLayerGis.getFeatureByName(layerName)!== undefined) {
            this.featureLayerGis.getFeatureByName(layerName).setVisible(visible);
        }
    };
	
	this.setDefaultWMTSResolutions = function(WMTSResolutions) {
		this.defaultWMTSResolutions = WMTSResolutions;
	};
	
	this.getDefaultWMTSResolutions = function() {
		return this.defaultWMTSResolutions;
	};
}
