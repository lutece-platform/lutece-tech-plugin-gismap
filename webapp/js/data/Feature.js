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
     * @returns {Array} List of all features
     */
    this.getListFeatures = function(){
        return this.ListFeatures;
    };

    /**
     * Feature Method
     * addLayerFeature create the layer with decode data with specific format
     * @param data contains an array with the name, the projection and data
     * @param dataFormat define the type of data
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param ideation define the ideation parameters
     * @returns {Array} an array with the names of the layers
     */
    this.addLayerFeature = function(data, dataFormat, heatmap, thematic, cluster, ideation){
        var dataNames = [];
        var layerName = data[1];
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
            this.ListFeatures[layerName] = new ol.layer.Vector({
                title: layerName,
                source: vectorSource
            });
            dataNames.push(layerName);
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
            var unknown = true;
            var heatMapLayer = this.createHeatMapLayer(layerName, vectorSource, heatmap);
            if(heatMapLayer !== null){
                dataNames.push(heatMapLayer);
                unknown = false;
            }
            var thematicLayer = this.createThematicLayer(layerName, vectorSource, thematic);
            if(thematicLayer !== null){
                dataNames.push(thematicLayer);
                unknown = false;
            }
            var clusterLayer = this.createClusterLayer(layerName, vectorSource, cluster);
            if(clusterLayer !== null){
                dataNames.push(clusterLayer);
                unknown = false;
            }
            var ideationLayer = this.createIdeationLayer(layerName, vectorSource, ideation);
            if(ideationLayer !== null) {
                dataNames.push(ideationLayer);
                unknown = false;
            }
            if(unknown){
                this.ListFeatures[layerName] = new ol.layer.Vector({
                    title: layerName,
                    source: vectorSource
                });
                dataNames.push(layerName);
            }
        }
        return dataNames;
    };

    /**
     * Feature Method
     * createWFSLayer initialize the layer of the map to specific WFS data
     * @param layerName is the name of the layer
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param dataProj is the projection of the data
     * @param query is the initial query to apply on the layer
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param ideation define the ideation parameters
     * @returns {Array} an array with the names of the layers
     */
    this.createWFSLayer = function(layerName,server, url, dataProj, query, heatmap, thematic, cluster, ideation) {
        var vectorSource = null;
        if (server === 'AGS') {
            if(query === '') {
                vectorSource = new ol.source.Vector({
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
                    },
                    strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                        tileSize: 512
                    }))
                });
            }else {
                vectorSource = new ol.source.Vector({
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
                                        vectorSource.addFeatures(features);
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
                vectorSource.addFeatures(features);
            };

            vectorSource = new ol.source.Vector({
                loader: vectorLoader,
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                  tileSize: 512
                }))
            });
        }
        var dataNames = [];
        var unknown = true;
        var heatMapLayer = this.createHeatMapLayer(layerName, vectorSource, heatmap);
        if(heatMapLayer !== null){
            dataNames.push(heatMapLayer);
            unknown = false;
        }
        var thematicLayer = this.createThematicLayer(layerName, vectorSource, thematic);
        if(thematicLayer !== null){
            dataNames.push(thematicLayer);
            unknown = false;
        }
        var clusterLayer = this.createClusterLayer(layerName, vectorSource, cluster);
        if(clusterLayer !== null){
            dataNames.push(clusterLayer);
            unknown = false;
        }
        var ideationLayer = this.createIdeationLayer(layerName, vectorSource, ideation);
        if(ideationLayer !== null) {
            dataNames.push(ideationLayer);
            unknown = false;
        }
        if(unknown){
            this.ListFeatures[layerName] = new ol.layer.Vector({
                title: layerName,
                source: vectorSource
            });
            dataNames.push(layerName);
        }
        return dataNames;
    };



     /**
     * LayerRaster Method
     * createWMSQueryLayer initialize the layer of the map to specific WMS data
     * @param layerName is the name of the layer
     * @param server is the type of the server
     * @param url is the url to access at the service
     */
    this.createWMSQueryLayer = function(layerName, server, url){
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
     * @param name is the name of the layer to search
     * @returns {ol.layer.Layer} is the layer of the name
     */
    this.getFeatureByName = function(name){
        return this.ListFeatures[name];
    };

    /**
     * Feature Method
     * createHeatMapLayer generate heatmap layer
     * @param layerName is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param heatmap is the parameter of the style layer
     */
    this.createHeatMapLayer = function(layerName, vectorSource, heatmap){
        for(var heatmapNb = 0; heatmapNb < heatmap.length; heatmapNb++) {
            if (heatmap[heatmapNb][0] === layerName) {
                console.log(heatmap[heatmapNb]);
                var labelLayer = heatmap[heatmapNb][1];
                var attributeLayer = heatmap[heatmapNb][2];
                var radiusValue = heatmap[heatmapNb][3];
                var blurValue = heatmap[heatmapNb][4];

                vectorSource.on('addfeature', function(event) {
                    var value = event.feature.get(attributeLayer);
                    event.feature.set('weight', parseFloat(value));
                });

                this.ListFeatures[labelLayer] = new ol.layer.Heatmap({
                    title: labelLayer,
                    source: vectorSource,
                    blur: parseInt(blurValue, 10),
                    radius: parseInt(radiusValue, 10)
                });
                return labelLayer;
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createThematicLayer generate thematic layer
     * @param layerName is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param thematic is the parameter of the style layer
     */
    this.createThematicLayer = function(layerName, vectorSource, thematic){
        for(var thematicNb = 0; thematicNb < thematic.length; thematicNb++) {
            if (thematic[thematicNb][1] === layerName) {
                this.ListFeatures[layerName] = new ol.layer.Heatmap(

                );
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createClusterLayer generate cluster layer
     * @param layerName is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param cluster is the parameter of the style layer
     */
    this.createClusterLayer = function(layerName, vectorSource, cluster){
        for(var clusterNb = 0; clusterNb < cluster.length; clusterNb++) {
            if (cluster[clusterNb][1] === layerName) {
                this.ListFeatures[layerName] = new ol.layer.Heatmap(

                );
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createIdeationLayer generate ideation layer
     * @param layerName is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param ideation is the parameter of the style layer
     */
    this.createIdeationLayer = function(layerName, vectorSource, ideation){
        for(var ideationNb = 0; ideationNb < ideation.length; ideationNb++) {
            if (ideation[ideationNb][1] === layerName) {
                this.ListFeatures[layerName] = new ol.layer.Heatmap(

                );
            }
        }
        return null;
    };
}



