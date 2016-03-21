/*global ol, projection, console*/

/**
 * Feature Class manage all features layers in the map
 */

function Feature() {
    'use strict';
    /**
     * ListFeatures contains all Features layers of the map
     * @type {Array}
     */
    this.ListFeatures = [];
    /**
     * wktFormat define the format WKT
     * @type {ol.format.WKT}
     */
    var wktFormat = new ol.format.WKT();
    /**
     * geoJSONFormat define the format GeoJSON
     * @type {ol.format.GeoJSON}
     */
    var geoJSONFormat = new ol.format.GeoJSON();
    /**
     * esrijsonFormat define the format EsriJSON
     * @type {ol.format.EsriJSON}
     */
    var esriJSONFormat = new ol.format.EsriJSON();

    /**
     * Feature Method
     * getListFeatures return an array of layer Source
     * @returns {Array}
     */
    this.getListFeatures = function(){
        return this.ListFeatures;
    };

    /**
     * Feature Method
     * addLayerFeature create the layer with decode data with specific format
     * @param data
     * @param dataFormat
     */
    this.addLayerFeature = function(data, dataFormat){
        var dataOrder = data[0];
        var dataName = data[1];
        var dataProj = data[2];
        var dataUrl = data[3];
        var vectorSource;
        var features = [];
        if(dataFormat === 'WKT'){
            for(var i = 2; i < data.length; i++){
                features.push(wktFormat.readFeatures(dataUrl, {
                    dataProjection: dataProj,
                    featureProjection: projection.getProjection().getCode()
                }));
            }
            vectorSource = new ol.source.Vector({
                features: features
            });
        }else if(dataFormat === 'GeoJSON'){
            vectorSource = new ol.source.Vector({
                loader: function () {
                    $.ajax({
                        url : dataUrl,
                        dataType: 'jsonp',
                        jsonpCallback: 'callback',
                        success: function (response) {
                            if (response.error) {
                                console.log(response.error.message + '\n' + response.error.details.join('\n'));
                            }else {
                                features = geoJSONFormat.readFeatures(response,{
                                    dataProjection: dataProj,
                                    featureProjection: projection.getProjection().getCode()
                                });
                                if (features.length > 0) {
                                    vectorSource.addFeatures(features);
                                }
                            }
                        }
                    });
                }
            });
        }
        this.ListFeatures[dataName]= new ol.layer.Vector({
                title: dataName,
                source: vectorSource
            }
        );
        return dataName;
    };

    /**
     * Feature Method
     * createWFSLayer initialize the layer of the map to specific WFS data
     * @param order
     * @param layerName
     * @param server
     * @param url
     * @param query
     */
    this.createWFSLayer = function(order, layerName,server, url, query) {
        if (server === 'AGS') {
            if(query === '') {
                var vectorSource = new ol.source.Vector({
                    loader: function (extent) {
                        if(extent[0] === -Infinity){
                            extent = projection.getExtent();
                        }
                        var webService = url + '/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' + extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                            ',"spatialReference":{"wkid":' + projection.getProjection().getCode().substring(5, projection.getProjection().getCode().length) +
                            '}}') + '&geometryType=esriGeometryEnvelope&inSR=&outFields=*&' + 'outSR=' +
                            projection.getProjection().getCode().substring(5, projection.getProjection().getCode().length);
                        $.ajax({
                            url: webService,
                            dataType: 'jsonp',
                            success: function (response) {
                                if (response.error) {
                                    console.log(response.error.message + '\n' + response.error.details.join('\n'));
                                }else {
                                    var features = esriJSONFormat.readFeatures(response, {
                                        featureProjection: projection.getProjection().getCode()
                                    });
                                    if (features.length > 0) {
                                        vectorSource.addFeatures(features);
                                    }
                                }
                            }
                        });
                    }
                });
                this.ListFeatures[layerName] = new ol.layer.Vector({
                    title: layerName,
                    source: vectorSource,
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }else {
                var vectorSourceQuery = new ol.source.Vector({
                    loader: function (extent) {
                        if(extent[0] === -Infinity){
                            extent = projection.getExtent();
                        }
                        var webService = url + '/query?where=' + query + '&f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' + extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                            ',"spatialReference":{"wkid":' + projection.getProjection().getCode().substring(5, projection.getProjection().getCode().length) +
                            '}}') + '&geometryType=esriGeometryEnvelope&inSR=&outFields=*&' + 'outSR=' +
                            projection.getProjection().getCode().substring(5, projection.getProjection().getCode().length);
                        $.ajax({
                            url: webService,
                            dataType: 'jsonp',
                            success: function (response) {
                                if (response.error) {
                                    console.log(response.error.message + '\n' + response.error.details.join('\n'));
                                }else {
                                    var features = esriJSONFormat.readFeatures(response, {
                                        featureProjection: projection.getProjection().getCode()
                                    });
                                    if (features.length > 0) {
                                        vectorSourceQuery.addFeatures(features);
                                    }
                                }
                            }
                        });
                    }
                });
                this.ListFeatures[layerName] = new ol.layer.Vector({
                    title: layerName,
                    source: vectorSourceQuery,
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }
        }else if (server === 'GeoServer'){
            var projectionData =  projection.getEpsgData(query, false)[0];
            var vectorLoader= function(extent) {
                if(extent[0] === -Infinity){
                    extent = projection.getExtent();
                }
                var extentCapture = ol.extent.applyTransform(extent, ol.proj.getTransform(projection.getProjection().getCode(), projectionData.getCode()));
                var webService = url + '&outputFormat=text/javascript&format_options=callback:loadFeatures&' +
                    'srsname=' + projectionData.getCode() + '&bbox=' + extentCapture.join(',') + ',' + projectionData.getCode();
                $.ajax({
                    url: webService,
                    dataType: 'jsonp'
                });
            };

            window.loadFeatures = function(response) {
                var features = geoJSONFormat.readFeatures(response, {
                    dataProjection: projectionData.getCode(),
                    featureProjection: projection.getProjection().getCode()
                });
                vectorSourceGeo.addFeatures(features);
            };

            var vectorSourceGeo = new ol.source.Vector({
                loader: vectorLoader,
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                  tileSize: 512
                }))
            });
            this.ListFeatures[layerName] = new ol.layer.Vector({
                title: layerName,
                source: vectorSourceGeo
            });
        }
        return layerName;
    };



     /**
     * LayerRaster Method
     * createWMSQueryLayer initialize the layer of the map to specific WMS data
     * @param order
     * @param layerName
     * @param server
     * @param url
     */
    this.createWMSQueryLayer = function(order, layerName, server, url){
        if(server === 'AGS-IMS'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
                source: new ol.source.TileArcGISRest({
                    url: url+layerName+'/ImageServer'
                }),
                visible:false
            });
        }else if(server === 'AGS-MPS'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
                source: new ol.source.TileArcGISRest({
                    url: url+layerName+'/MapServer'
                }),
                visible:false
            });
        }else if (server === 'GeoServer'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
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
     * Feature Method
     * getFeatureByName is the getter to access at specific feature with this name
     * @param name
     * @returns {*}
     */
    this.getFeatureByName = function(name){
        return this.ListFeatures[name];
    };
}



