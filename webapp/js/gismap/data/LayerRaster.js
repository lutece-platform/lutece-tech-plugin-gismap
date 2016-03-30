/*global ol, view, rasterLayer, projection*/
/**
 * LayerRaster Class manage all rasters layers in the map
 */
function LayerRaster() {
    'use strict';
    /**
     * ListRasters contains all Rasters of the map
     * @type {Array}
     */
    this.ListRasters = [];

    /**
     * LayerRaster Method
     * createRasterLayer initialize the background of the map
     * @param data contains the name of the layer and the specific layer
     * @returns {String} is the name of the layer
     */
    this.createRasterLayer = function(data){
        var name = data[0];
        var layer = data[1];
        if (name === 'OSM'){
            this.ListRasters[name] = new ol.layer.Tile({
                title: name,
                type: 'base',
                source: new ol.source.OSM(),
                visible:false
            });
        }else if (name === 'MapQuest'){
            this.ListRasters[name] = new ol.layer.Tile({
                title: name,
                type: 'base',
                source: new ol.source.MapQuest({layer: layer}),
                visible:false
            });
        }
        return name;
    };

    /**
     * LayerRaster Method
     * createWMSLayer initialize the background of the map to specific WMS data
     * @param layerName is the name of the layer in the application
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param dataName is the name of the data on the server
     */
    this.createWMSLayer = function(layerName, server, url, dataName){
        if(server === 'AGS-IMS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    url: url+dataName+'/ImageServer'
                }),
                visible:false
            });
        }else if(server === 'AGS-MPS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    url: url+dataName+'/MapServer'
                }),
                visible:false
            });
        }else if (server === 'GeoServer'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileWMS({
                    url: url,
                    params: {'LAYERS': dataName},
                    serverType:'geoserver'
                }),
                visible:false
            });
        }
    };

    /**
     * LayerRaster Method
     * createWMTSLayer initialize the background of the map to specific WMTS data
     * @param layerName is the name of the layer in the application
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param proj is the projection of the data
     * @param resolutions is the table of the
     * @param origin is the coordinate of the left upper point of the data
     */

    this.createWMTSLayer = function(layerName, server, url, proj, resolutions, origin){
        if(server === 'AGS') {
            var infoProjData = projection.getEpsgData(proj, false);
            var projData = infoProjData[0];
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.XYZ({
                    url: url+'/tile/{z}/{y}/{x}',
                    projection: projData,
                    tileGrid: new ol.tilegrid.TileGrid({
                        origin: origin,
                        resolutions: resolutions
                    })
                }),
                visible: false
            });
        }
    };

    /**
     * LayerRaster Method
     * setRasterVisibility enable or disable the visibility of the layer
     * @param raster the name of the layer
     * @param act the marker to active or not the layer
     */
    this.setRasterVisibility = function(raster, act){
        this.getRasterByName(raster).setVisible(act);
    };

    /**
     * LayerRaster Method
     * getRasterByName is the getter to access at specific raster with this name
     * @param name is the name of the layer to search
     * @returns {ol.layer.Layer} is the layer of the name
     */
    this.getRasterByName = function(name){
        return this.ListRasters[name];
    };
}