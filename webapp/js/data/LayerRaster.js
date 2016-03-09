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
     * currentRaster define the current raster
     * @type {null}
     */
    this.currentRaster = null;

    /**
     * LayerRaster Method
     * createRasterLayer initialize the background of the map
     * @param data
     * @returns {*}
     */
    this.createRasterLayer = function(data){
        var name = data[0];
        var layer = data[1];
        if (name === 'OSM'){
            this.ListRasters[name] = new ol.layer.Tile({
                title: name,
                type: 'base',
                source: new ol.source.OSM(),
                visible:true
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
     * @param server
     * @param url
     * @param layerName
     */
    this.createWMSLayer = function(server, url, layerName){
        if(server === 'AGS-IMS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    url: url+layerName+'/ImageServer'
                }),
                visible:false
            });
        }else if(server === 'AGS-MPS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    url: url+layerName+'/MapServer'
                }),
                visible:false
            });
        }else if (server === 'GeoServer'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileWMS({
                    url: url,
                    params: {'LAYERS': layerName},
                    serverType:'geoserver'
                }),
                visible:false
            });
        }
    };

    /**
     * LayerRaster Method
     * createWMTSLayer initialize the background of the map to specific WMTS data
     * @param wmts
     */
    this.createWMTSLayer = function(server, url, layerName, formatImage, matrixSet, proj, resolution, tileSize){
        if(server === 'AGS'){
            var infoProjData = projection.getEpsgData(proj, false);
            var projData = infoProjData[0];
            var extent = [636297.3752,6842143.7202,672752.1101,6880245.6689];
            var resolutions = new Array(resolution);
            var size = ol.extent.getWidth(extent) / tileSize;
            var matrixIds = new Array(resolution);
            for (var i = 0; i < resolution; ++i) {
                resolutions[i] = size / Math.pow(2, i);
                matrixIds[i] = i;
            }
            console.log(matrixIds);
            console.log(resolutions);
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.WMTS({
                    url: url,
                    layer: layerName,
                    requestEncoding: 'REST',
                    format: formatImage,
                    matrixSet: matrixSet,
                    projection: projData,
                    extent: extent,
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: ol.extent.getTopLeft(extent),
                        resolutions: resolutions,
                        matrixIds: matrixIds
                    }),
                }),
                visible:false
            });
        }else if(server === 'GeoServer'){
           console.log('coucou')
        }
    };

    /**
     * LayerRaster Method
     * setRasterVisibility enable or disable the display of the raster on the map
     * @param raster
     * @param act
     */
    this.setRasterVisibility = function(raster, act){
        this.getRasterByName(raster).setVisible(act);
    };

    /**
     * LayerRaster Method
     * getCurrentRaster is the getter to access at the current raster
     * @returns {null}
     */
    this.getCurrentRaster = function(){
        return this.currentRaster;
    };

    /**
     * LayerRaster Method
     * setCurrentRaster is the setter to define the current raster
     * @param newCurrentRaster
     */
    this.setCurrentRaster = function(newCurrentRaster){
        this.currentRaster = newCurrentRaster;
    };

    /**
     * LayerRaster Method
     * getRasterLayers is the getter to access at the list of rasters
     * @returns {Array}
     */
    this.getRasterLayers = function(){
        return this.ListRasters;
    };

    /**
     * LayerRaster Method
     * getRasterByName is the getter to access at specific raster with this name
     * @param name
     * @returns {*}
     */
    this.getRasterByName = function(name){
        return this.ListRasters[name];
    };
}