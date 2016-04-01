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
        var wmsLibelle = wms[0];
        var wmsServer = wms[1];
        var wmsUrl = wms[2];
        var wmsLayer = wms[3];
        rasterLayer.createWMSLayer(wmsLibelle, wmsServer, wmsUrl, wmsLayer);
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
        rasterLayer.createWMTSLayer(wmtsLibelle, wmtsServer, wmtsUrl, wmtsProj, wmtsReso, wmtsOrigin);
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
        featureLayer.createWMSQueryLayer(wmsName, wmsServer, wmsUrl, wmsLayer, wmsVisbility);
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
        var wfsLayers = featureLayer.createWFSLayer(wfsIdLayer, wfsServer, wfsUrl, wfsProj, wfsQuery, heatmap, thematic, cluster, thematicComplex);
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
        var names = featureLayer.addLayerFeature(data, format, heatmap, thematic, cluster, thematicComplex);
        for(var i = 0; i < names.length; i++) {
            this.ListLayers.push(names[i]);
            this.selectableLayers.push(names[i].split('-')[1]);
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
            var layerMapName = this.ListLayers[layerMap].split('-')[1];
            if(featureLayer.getFeatureByName(layerMapName)!== undefined) {
                ListLayersFeatureMap.push(featureLayer.getFeatureByName(layerMapName));
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

    /**
     * Layer Method
     * showLayer enable or disable a visibility of a layer
     * @param layerName the name of the layer
     * @param visible the indicator of visibility
     */
     this.showLayer = function(layerName, visible){
        if(rasterLayer.getRasterByName(layerName)!== undefined) {
            rasterLayer.getRasterByName(layerName).setVisible(visible);
        }
        if(featureLayer.getFeatureByName(layerName)!== undefined) {
            featureLayer.getFeatureByName(layerName).setVisible(visible);
        }
    };
}
