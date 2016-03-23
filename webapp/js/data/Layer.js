/*global ol, layer, rasterLayer, featureLayer, drawTools, measureTools, editorTools*/

/**
 * Layer Class manage all layers in the map
 */

function Layer() {
    'use strict';
    /**
     * ListLayers contains all Layers of the map
     * @type {Array}
     */
    this.ListLayers = [];
    this.selectableLayers = [];

    /**
     * Layer Method
     * addLayerRaster add a background map at the ListLayer
     * @param backGround is an array with all parameters to define a background
     */
    this.addLayerRaster = function(backGround){
        var name = rasterLayer.createRasterLayer(backGround);
        this.ListLayers.push(name);
    };

    /**
     * Layer Method
     * addWMSLayerRaster add a background map at the ListLayer to a WMS
     * @param wms is an array with all parameters to define a wms layer
     */
    this.addWMSLayerRaster = function(wms){
        var wmsServer = wms[0];
        var wmsUrl = wms[1];
        var wmsLayer = wms[2];
        rasterLayer.createWMSLayer(wmsServer, wmsUrl, wmsLayer);
        this.ListLayers.push(wmsLayer);
    };

    /**
     * Layer Method
     * addWMTSLayerRaster add a background map at the ListLayer to a WMTS
     * @param wmts is an array with all parameters to define a wmts layer
     */
    this.addWMTSLayerRaster = function(wmts){
        var wmtsServer = wmts[0];
        var wmtsUrl = wmts[1];
        var wmtsLayer = wmts[2];
        var wmtsProj = wmts[3];
        var wmtsReso = wmts[4];
        var wmtsOrigin = wmts[5];
        rasterLayer.createWMTSLayer(wmtsServer, wmtsUrl, wmtsLayer, wmtsProj, wmtsReso, wmtsOrigin);
        this.ListLayers.push(wmtsLayer);
    };

    /**
     * Layer Method
     * addWMSQueryLayerRaster add a background map at the ListLayer to a WMS
     * @param wms is an array with all parameters to define a wms layer
     */
    this.addWMSQueryLayerRaster = function(wms){
        var wmsOrder = wms[0];
        var wmsLayer = wms[1];
        var wmsServer = wms[2];
        var wmsUrl = wms[3];
        featureLayer.createWMSQueryLayer(wmsLayer, wmsServer, wmsUrl);
        this.ListLayers.push(wmsOrder+wmsLayer);
    };

    /**
     * Layer Method
     * addWFSLayer add a layer map at the ListLayer to a WFS
     * @param wfs is an array with all parameters to define a wfs layer
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param ideation define the ideation parameters
     */
    this.addWFSLayer = function(wfs, heatmap, thematic, cluster, ideation){
        var wfsOrder = wfs[0];
        var wfsLayer = wfs[1];
        var wfsServer = wfs[2];
        var wfsUrl = wfs[3];
        var wfsProj = wfs[4];
        var wfsQuery = wfs[5];
        var wfsLayers = featureLayer.createWFSLayer(wfsLayer, wfsServer, wfsUrl, wfsProj, wfsQuery, heatmap, thematic, cluster, ideation);
        for(var i = 0; i < wfsLayers.length; i++) {
            this.ListLayers.push(wfsOrder + wfsLayers[i]);
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
     * @param ideation define the ideation parameters
     */
    this.addLayerVector = function(data, format, heatmap, thematic, cluster, ideation){
        var names = featureLayer.addLayerFeature(data, format, heatmap, thematic, cluster, ideation);
        for(var i = 0; i < names.length; i++) {
            this.ListLayers.push(data[0] + names[i]);
            this.selectableLayers.push(names[i]);
        }
    };

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
     * setDefaultBackGround active the default background to initiate the map
     * @param defaultBackground is the name of a layer
     */
    this.setDefaultBackGround = function(defaultBackground){
        for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(rasterLayer.getRasterByName(this.ListLayers[layerMap])=== rasterLayer.getRasterByName(defaultBackground)) {
                rasterLayer.setRasterVisibility(this.ListLayers[layerMap], true);
            }
        }
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
     * getLayersRasterMap is a getter to all Rasters Layers
     * @returns {Array} is an array with all raster layers of the map
     */
    this.getLayersRasterMap = function(){
        var ListLayersRasterMap = [];
        for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(rasterLayer.getRasterByName(this.ListLayers[layerMap])!== undefined) {
                ListLayersRasterMap.push(rasterLayer.getRasterByName(this.ListLayers[layerMap]));
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
            if(featureLayer.getFeatureByName(this.ListLayers[layerMap].substring(1,this.ListLayers[layerMap].length))!== undefined) {
                ListLayersFeatureMap.push(featureLayer.getFeatureByName(this.ListLayers[layerMap].substring(1,this.ListLayers[layerMap].length)));
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
             title:'Base maps',
             layers: this.getLayersRasterMap()
         }));
         ListLayersMap.push(new ol.layer.Group({
             title:'Layers',
             layers: this.getLayersFeatureMap()
         }));
         ListLayersMap.push(drawTools.getDrawLayer());
         ListLayersMap.push(measureTools.getMeasureLayer());
         if(editorTools !== null){
             ListLayersMap.push(editorTools.getEditLayer());
         }
         return ListLayersMap;
    };
}
