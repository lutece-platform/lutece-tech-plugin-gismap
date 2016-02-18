/*global ol, layer, rasterLayer, featureLayer, drawTools, measureTools*/

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
        var wmsLayers = wms[2];
        for(var wmsLayer = 0;  wmsLayer < wmsLayers.length; wmsLayer++){
            rasterLayer.createWMSLayer(wmsServer, wmsUrl, wmsLayers[wmsLayer]);
            this.ListLayers.push(wmsLayers[wmsLayer]);
        }
    };

    /**
     * Layer Method
     * addWMTSLayerRaster add a background map at the ListLayer to a WMTS
     * @param wmts
     */
    this.addWMTSLayerRaster = function(wmts){
        var name = rasterLayer.createWMTSLayer(wmts);
        this.ListLayers.push(name);
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
         return ListLayersMap;
    };
}
