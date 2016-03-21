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
        var wmtsProj = wmts[3];
        var wmtsReso = wmts[4];
        var wmtsOrigin = wmts[5];
        rasterLayer.createWMTSLayer(wmtsServer, wmtsUrl, wmtsLayer, wmtsProj, wmtsReso, wmtsOrigin);
        this.ListLayers.push(wmtsLayer);
    };

    /**
     * Layer Method
     * addWMSQueryLayerRaster add a background map at the ListLayer to a WMS
     * @param wms
     */
    this.addWMSQueryLayerRaster = function(wms){
        var wmsOrder = wms[0];
        var wmsLayer = wms[1];
        var wmsServer = wms[2];
        var wmsUrl = wms[3];
        featureLayer.createWMSQueryLayer(wmsOrder, wmsLayer, wmsServer, wmsUrl);
        this.ListLayers.push(wmsOrder+wmsLayer);
    };

    /**
     * Layer Method
     * addWFSLayer add a layer map at the ListLayer to a WFS
     * @param wfs
     */
    this.addWFSLayer = function(wfs){
        var wfsOrder = wfs[0];
        var wfsLayer = wfs[1];
        var wfsServer = wfs[2];
        var wfsUrl = wfs[3];
        var wfsQuery = wfs[4];
        featureLayer.createWFSLayer(wfsOrder, wfsLayer, wfsServer, wfsUrl, wfsQuery);
        this.ListLayers.push(wfsOrder+wfsLayer);
    };

    /**
     * Layer Method
     * addLayerVector add a layer map at the ListLayer
     */
    this.addLayerVector = function(data, format){
        var name = featureLayer.addLayerFeature(data, format);
        this.ListLayers.push(data[0]+name);
        this.selectableLayers.push(name);
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
     * setDefaultBackGround active the default background to initiate the map
     * @param defaultBackground
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
     * @returns {Array}
     */
    this.getSelectableLayers = function(){
        return this.selectableLayers;
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
     * @returns {Array}
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
             if(editorTools.getLevel()){
                 ListLayersMap.push(editorTools.getEditLayer());
             }
         }
         return ListLayersMap;
    };
}
