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
        var wfsLayers = wfs[2];
        for(var wfsLayer = 0;  wfsLayer < wfsLayers.length; wfsLayer++){
            featureLayer.createWFSLayer(wfsServer, wfsUrl, wfsLayers[wfsLayer]);
            this.ListLayers.push(wfsLayers[wfsLayer]);
        }
    };

    /**
     * Layer Method
     * addLayerVector add a layer map at the ListLayer
     */
    this.addLayerVector = function(){
        var layerTemp = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: this.layerVectors.getFeatures()
            })
        });
        this.ListLayers.push(layerTemp);
    };

    this.getLayers = function(){
        return this.ListLayers;
    };

    this.getLayersMap = function(){
        var ListLayersMap = [];
        for (var layerMap = 0; layerMap < this.ListLayers.length; layerMap++){
            if(rasterLayer.getRasterByName(this.ListLayers[layerMap])!== null) {
                ListLayersMap.push(rasterLayer.getRasterByName(this.ListLayers[layerMap]));
            }else if(featureLayer.getFeatureByName(this.ListLayers[layerMap])!== null) {
                ListLayersMap.push(featureLayer.getFeatureByName(this.ListLayers[layerMap]));
            }
        }
        ListLayersMap.push(drawTools.getDrawLayer());
        ListLayersMap.push(measureTools.getMeasureLayer());
        return ListLayersMap;
    };
}
