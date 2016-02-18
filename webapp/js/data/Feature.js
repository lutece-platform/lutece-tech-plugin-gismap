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
    var esrijsonFormat = new ol.format.EsriJSON();

    /**
     * Feature Method
     * addLayerFeature create the layer with decode data with specific format
     * @param data
     * @param dataFormat
     */
    this.addLayerFeature = function(data, dataFormat){
        var dataName = data[0];
        var dataProj = data[1];
        var features = [];
        if(dataFormat === 'WKT'){
            for(var i = 2; i < data.length; i++){
                features.push(wktFormat.readFeature(data[i], {
                    dataProjection: dataProj,
                    featureProjection: projection.getProjection().getCode()
                }));
            }
        }else if(dataFormat === 'GeoJSON'){
            features = geoJSONFormat.readFeatures(data[2]);
        }
        if(features !== null) {
            this.ListFeatures[dataName]= new ol.layer.Vector({
                    title: dataName,
                    source: new ol.source.Vector({
                        features: features
                    })
                }
            );
            return dataName;
        }
    };

    //En Cours de Dev
    /**
     * Feature Method
     * createWFSLayer initialize the layer of the map to specific WFS data
     * @param server
     * @param url
     * @param layerName
     */
    this.createWFSLayer = function(server, url, layerName,query) {
        if (server === 'AGS') {
            if(query === '') {
                var vectorSource = new ol.source.Vector({
                    loader: function (extent) {
                        var webService = url + '/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
                            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' + extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                            ',"spatialReference":{"wkid":' + projection.getProjection().getCode().substring(4, projection.getProjection().getCode().length) +
                            '}}') + '&geometryType=esriGeometryEnvelope&inSR=&outFields=*&' + 'outSR=' + projection.getProjection().getCode();
                        $.ajax({
                            url: webService, dataType: 'jsonp', success: function (response) {
                                if (response.error) {
                                    console.log(response.error.message + '\n' + response.error.details.join('\n'));
                                }else {
                                    var features = esrijsonFormat.readFeatures(response, {
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
                this.ListFeatures[layerName] = new ol.layer.Vector({
                    title: layerName,
                    source: new ol.source.Vector({
                        format: esrijsonFormat,
                        url: url + '/query?where=' + query + '&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&' +
                        'inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&' +
                        'geometryPrecision=&outSR=' + projection.getProjection().getCode() + '&gdbVersion=&returnIdsOnly=false&returnCountOnly=false&' +
                        'orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&f=pjson'
                    }),
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }
        }else if (server === 'GeoServer'){
            var vectorLoader= function(extent) {
                var extentCapture = ol.extent.applyTransform(extent, ol.proj.getTransform(projection.getProjection().getCode(), query));
                var webService = url + '&outputFormat=text/javascript&format_options=callback:loadFeatures&' +
                    'srsname=' + query + '&bbox=' + extentCapture.join(',') + ',' + query;
                $.ajax({
                    url: webService,
                    dataType: 'jsonp'
                });
            };

            window.loadFeatures = function(response) {
                var features = geoJSONFormat.readFeatures(response, {
                    dataProjection: query,
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
     * Feature Method
     * getFeaturesLayers is the getter to access at the list of features layers
     * @returns {Array}
     */
    this.getFeaturesLayers = function(){
        return this.ListFeatures;
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



