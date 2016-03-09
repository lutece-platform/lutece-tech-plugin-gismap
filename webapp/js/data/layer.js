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

    /**
     * Layer Method
     * addLayerRaster add a background map at the ListLayer
     * @param backGround
     */
    this.addLayerRaster = function(backGround){
        var name = rasterLayer.createRasterLayer(backGround);
        this.ListLayers.push(name);
    };

    /**
     * Layer Method
     * addWMSLayerRaster add a background map at the ListLayer to a WMS
     * @param wms
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
     * @param wmts
     */
    this.addWMTSLayerRaster = function(wmts){
        var wmtsServer = wmts[0];
        var wmtsUrl = wmts[1];
        var wmtsLayer = wmts[2];
        var wmtsImg = wmts[3];
        var wmtsMatrix = wmts[4];
        var wmtsProj = wmts[5];
        var wmtsReso = wmts[6];
        var wmtsTile = wmts[7];
        rasterLayer.createWMTSLayer(wmtsServer, wmtsUrl, wmtsLayer, wmtsImg, wmtsMatrix, wmtsProj, wmtsReso, wmtsTile);
        this.ListLayers.push(wmtsLayer);
    };

    /**
     * Layer Method
     * addWFSLayer add a layer map at the ListLayer to a WFS
     * @param wfs
     */
    this.addWFSLayer = function(wfs){
        var wfsServer = wfs[0];
        var wfsUrl = wfs[1];
        var wfsLayer = wfs[2];
        var wfsQuery = wfs[3];
        featureLayer.createWFSLayer(wfsServer, wfsUrl, wfsLayer, wfsQuery);
        this.ListLayers.push(wfsLayer);
    };

    /**
     * Layer Method
     * addLayerVector add a layer map at the ListLayer
     */
    this.addLayerVector = function(wkt, format){
        var name = featureLayer.addLayerFeature(wkt, format);
        this.ListLayers.push(name);
    };

    /**
     * Layer Method
     * getLayers is a getter to all Layers
     * @returns {Array}
     */
    this.getLayers = function(){
        return this.ListLayers;
    };

    /**
     * Layer Method
     * getLayersRasterMap is a getter to all Rasters Layers
     * @returns {Array}
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
     * @returns {Array}
     */
    this.getLayersFeatureMap = function(){
        var ListLayersFeatureMap = [];
        for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(featureLayer.getFeatureByName(this.ListLayers[layerMap])!== undefined) {
                ListLayersFeatureMap.push(featureLayer.getFeatureByName(this.ListLayers[layerMap]));
            }
        }
        return ListLayersFeatureMap;
    };

    /**
     * Layer Method
     * getLayersMap is a getter to all Layers in groups
     * @returns {Array}
     */
     this.getLayersMap = function(){
         var ListLayersMap = [];
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
             if(editorTools.getLevel()){
                 ListLayersMap.push(editorTools.getEditLayer());
             }
         }
         return ListLayersMap;
    };
}
