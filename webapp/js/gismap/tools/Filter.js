/*global ol, GlobalMap, featureLayer, projection, console*/

/**
 * Filter Class manage the query to filter data of all vectors layers in the map
 */

function Filter() {
    'use strict';
    /**
     * ListLayers contains all queryable Layers of the map
     * @type {Array}
     */
    this.ListLayers = featureLayer.getListFeatures();
    /**
     * ListDataLayers contains all data about queryable Layers of the map
     * @type {Array}
     */
    this.ListDataLayers = featureLayer.getListFilterFeatures();
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
     * Filter Method
     * filterLayerGEOSJON apply a filter on the Lutece Web Service
     * @param name the layer name
     * @param urlGeoJson the new url ot filter data
     */
    this.filterLayerGEOSJON = function(name, urlGeoJson){
        var dataProj = this.ListLayers[name].getSource().getProjection();
        var vectorSource = new ol.source.Vector({
            loader: function () {
                $.ajax({
                    url : urlGeoJson,
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: function (response) {
                        if (response.error) {
                            console.log(response.error.message + '\n' + response.error.details.join('\n'));
                        }else {
                            var features = geoJSONFormat.readFeatures(response,{
                                dataProjection: dataProj,
                                featureProjection: projection.getProjection().getCode()
                            });
                            if (features.length > 0) {
                                if(vectorSource instanceof ol.source.Cluster) {
                                    vectorSource.getSource().addFeatures(features);
                                }else{
                                    vectorSource.addFeatures(features);
                                }
                            }
                        }
                    }
                });
            }
        });
        this.ListLayers[name].setSource(vectorSource);
    };

    /**
     * Filter Method
     * filterLayerWFS apply a filter on the all Web Service
     * @param name the layer name
     * @param query the query to apply to filter data
     */
    this.filterLayerWFS = function(name, query){
        var server = this.ListDataLayers[name][0];
        var url = this.ListDataLayers[name][1];
        var dataProj = this.ListDataLayers[name][2];
        var queryOrigin = this.ListDataLayers[name][3];
        var queryFinal = '';
        var vectorSource = null;
        if(queryOrigin !== '' && query !== ''){
            queryFinal = queryOrigin + ' AND ' + query;
        }else if (query === ''){
            queryFinal = queryOrigin;
        }else{
            queryFinal = query;
        }
        if (server === 'AGS') {
            if(queryFinal === '') {
                vectorSource = new ol.source.Vector({
                    loader: function (extent) {
                        if (extent[0] === -Infinity) {
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
                                } else {
                                    var features = esriJSONFormat.readFeatures(response, {
                                        featureProjection: projection.getProjection().getCode()
                                    });
                                    if (features.length > 0) {
                                        if(vectorSource instanceof ol.source.Cluster) {
                                            vectorSource.getSource().addFeatures(features);
                                        }else{
                                            vectorSource.addFeatures(features);
                                        }
                                    }
                                }
                            }
                        });
                    },
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }else{
                vectorSource = new ol.source.Vector({
                    loader: function (extent) {
                        if(extent[0] === -Infinity){
                            extent = projection.getExtent();
                        }
                        var webService = url + '/query?where=' + queryFinal + '&f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
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
                                        if(vectorSource instanceof ol.source.Cluster) {
                                            vectorSource.getSource().addFeatures(features);
                                        }else{
                                            vectorSource.addFeatures(features);
                                        }
                                    }
                                }
                            }
                        });
                    },
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }
        }else if (server === 'GeoServer'){
            var projectionData =  projection.getEpsgData(dataProj, false)[0];
            if(queryFinal !== ''){
                queryFinal = "&CQL_FILTER=" + queryFinal;
            }
            vectorSource = new ol.source.Vector({
                loader: function(extent) {
                    var webService = '';
                    if(queryFinal !== '') {
                        webService = url + queryFinal + '&outputFormat=text/javascript&srsname=' + projectionData.getCode() + '&format_options=callback:loadFeatures';
                    }else{
                        if(extent[0] === -Infinity){
                            extent = projection.getExtent();
                        }
                        var extentCapture = ol.extent.applyTransform(extent, ol.proj.getTransform(projection.getProjection().getCode(), projectionData.getCode()));
                        webService = url + '&outputFormat=text/javascript&format_options=callback:loadFeatures&' +
                            'srsname=' + projectionData.getCode() + '&bbox=' + extentCapture.join(',') + ',' + projectionData.getCode();
                    }
                    $.ajax({
                        url: webService,
                        dataType: 'jsonp'
                    });
                    window.loadFeatures = function(response) {
                        var features = geoJSONFormat.readFeatures(response, {
                            dataProjection: projectionData.getCode(),
                            featureProjection: projection.getProjection().getCode()
                        });
                        if(vectorSource instanceof ol.source.Cluster) {
                            vectorSource.getSource().addFeatures(features);
                        }else{
                            vectorSource.addFeatures(features);
                        }
                    };
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    tileSize: 512
                }))
            });
        }
        this.ListLayers[name].setSource(vectorSource);
    };
}
