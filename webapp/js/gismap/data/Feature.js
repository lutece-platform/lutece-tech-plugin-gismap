/*global ol, console, SpecificStyle*/

/**
 * Feature Class manage all features layers in the map
 */

function Feature(projection, proxy) {
    'use strict';
    /**
     * style define the specific style several representation of the layer
     * @type {SpecificStyle}
     */
    this.style = new SpecificStyle();
    /**
     * ListFeatures contains all Features layers of the map
     * @type {Array}
     */
    this.ListFeatures = [];
    /**
     * ListFilterFeatures contains all Features layers who can apply a filter of the map
     * @type {Array}
     */
    this.ListFilterFeatures = [];
    /**
     * clusterLayer contains all cluster layers of the map
     * @type {Array}
     */
    this.clusterLayer = [];
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
     * getListFilterFeatures return an array of layer Source
     * @returns {Array} List of all features
     */
    this.getListFilterFeatures = function(){
        return this.ListFilterFeatures;
    };

    /**
     * Feature Method
     * getSpecificStyle return an the style manager
     * @returns {SpecificStyle} the style manager
     */
    this.getSpecificStyle = function(){
        return this.style;
    };

    /**
     * Feature Method
     * getClusterLayers return a list of all cluster layers
     * @returns {Array} the list of cluster layers
     */
    this.getClusterLayers = function(){
        var clusterLayersList = [];
        for(var i = 0; i < this.clusterLayer.length; i++){
            clusterLayersList.push(this.ListFeatures[this.clusterLayer[i]]);
        }
        return clusterLayersList;
    };

    /**
     * Feature Method
     * addLayerFeature create the layer with decode data with specific format
     * @param data contains an array with the name, the projection and data
     * @param dataFormat define the type of data
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param thematicComplex define the thematic complex parameters
     * @returns {Array} an array with the names of the layers
     */
    this.addLayerFeature = function(data, dataFormat, heatmap, thematic, cluster, thematicComplex){
        var dataNames = [];
        var idLayer = data[0];
        var dataProj = data[1];
        var refreshmode = data[3];
        var dataAttribution = data[4];
        var dataUrlBbox = data[2];
        var dataUrl = data[6];
        var vectorSource;
        var features = [];
        var indexlr = dataUrl.lastIndexOf('/');
        var dataUrlWithPostMethod = dataUrl.substring(0, indexlr) + '/post';
        var dataForPostMethod = dataUrl.substring(indexlr + 1);

        if(dataFormat === 'WKT'){
            for(var i = 2; i < data.length; i++){
                features.push(wktFormat.readFeatures(dataUrl, {
                    dataProjection: dataProj,
                    featureProjection: projection.getProjection().getCode()
                }));
            }
            vectorSource = new ol.source.Vector({
                attributions: [
                    new ol.Attribution({
                        html: dataAttribution
                    })
                ],
                features: features
            });
            this.ListFeatures[idLayer] = new ol.layer.Vector({
                title: idLayer,
                source: vectorSource
            });
            dataNames.push( '-'+ idLayer);
        }else if(dataFormat === 'GeoJSON'){
        	if(dataUrlBbox !== ''){
        		if(refreshmode === 'static'){
        			vectorSource = new ol.source.Vector({
                        attributions: [
                            new ol.Attribution({
                                html: dataAttribution
                            })
                        ],
                        loader: function (extent) {
                            if(extent[0] === -Infinity){
                                extent = projection.getExtent();
                            }
                            var webService = dataUrlBbox + "?callback=callback"; 
                            $.ajax({
                                url: webService,
                                type: 'GET',
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
        		if(refreshmode === 'dynamic'){
        			vectorSource = new ol.source.Vector({
                        attributions: [
                            new ol.Attribution({
                                html: dataAttribution
                            })
                        ],
                        loader: function (extent) {
                            if(extent[0] === -Infinity){
                                extent = projection.getExtent();
                            }
                            var webService = dataUrlBbox + "?callback=callback&bbox=" + extent.join(','); 
                            $.ajax({
                                url: webService,
                                type: 'GET',
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
                        },
                        strategy: ol.loadingstrategy.bbox
                    });
        		}
        	}
        	else{
        		vectorSource = new ol.source.Vector({
                attributions: [
                    new ol.Attribution({
                        html: dataAttribution
                    })
                ],
                loader: function () {
                    $.ajax({
                        url: dataUrlWithPostMethod,
                        type: 'POST',
                        dataType: 'jsonp',
                        data: dataForPostMethod,
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
            
            var unknown = true;
            var heatMapLayer = this.createHeatMapLayer(idLayer, vectorSource, heatmap);
            if(heatMapLayer !== null){
                dataNames.push(heatMapLayer);
                unknown = false;
            }
            var thematicLayer = this.createThematicLayer(idLayer, vectorSource, thematic);
            if(thematicLayer !== null){
                dataNames.push(thematicLayer);
                unknown = false;
            }
            var clusterLayer = this.createClusterLayer(idLayer, vectorSource, cluster);
            if(clusterLayer !== null){
                dataNames.push(clusterLayer);
                unknown = false;
            }
            var thematicComplexLayer = this.createThematicComplexLayer(idLayer, vectorSource, thematicComplex);
            if(thematicComplexLayer !== null) {
                dataNames.push(thematicComplexLayer);
                unknown = false;
            }
            if(unknown){
                this.ListFeatures[idLayer] = new ol.layer.Vector({
                    title: idLayer,
                    source: vectorSource,
                    visible: true
                });
                dataNames.push( '-'+ idLayer);
            }
        }
        return dataNames;
    };

    /**
     * Feature Method
     * createWFSLayer initialize the layer of the map to specific WFS data
     * @param idLayer is the id to identify the layer
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param dataProj is the projection of the data
     * @param query is the initial query to apply on the layer
     * @param dataAttribution is the information about the data
     * @param heatmap define the heatmap parameters
     * @param thematic define the thematic parameters
     * @param cluster define the cluster parameters
     * @param thematicComplex define the thematic complex parameters
     * @returns {Array} an array with the names of the layers
     */
    this.createWFSLayer = function(idLayer, server, url, dataProj, query, dataAttribution, heatmap, thematic, cluster, thematicComplex) {
        var vectorSource = null;
        var dataFilter = [server, url, dataProj, query, dataAttribution];
        if (server === 'AGS') {
            if(query === '') {
                vectorSource = new ol.source.Vector({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
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
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
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
            if(query !== ''){
                query = "&CQL_FILTER=" + query;
            }
            vectorSource = new ol.source.Vector({
                attributions: [
                    new ol.Attribution({
                        html: dataAttribution
                    })
                ],
                loader: function (extent) {
                    var webService = '';
                    if (query !== '') {
                        webService = url + query + '&outputFormat=text/javascript&srsname=' + projectionData.getCode() + '&format_options=callback:loadFeatures';
                    } else {
                        if (extent[0] === -Infinity) {
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

                    window.loadFeatures = function (response) {
                        var features = geoJSONFormat.readFeatures(response, {
                            dataProjection: projectionData.getCode(),
                            featureProjection: projection.getProjection().getCode()
                        });
                        vectorSource.addFeatures(features);
                    };
                },
                strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
                    tileSize: 512
                }))
            });
        }
        var dataNames = [];
        var unknown = true;
        var heatMapLayer = this.createHeatMapLayer(idLayer, vectorSource, heatmap, dataFilter);
        if(heatMapLayer !== null){
            dataNames.push(heatMapLayer);
            unknown = false;
        }
        var thematicLayer = this.createThematicLayer(idLayer, vectorSource, thematic, dataFilter);
        if(thematicLayer !== null){
            dataNames.push(thematicLayer);
            unknown = false;
        }
        var clusterLayer = this.createClusterLayer(idLayer, vectorSource, cluster, dataFilter);
        if(clusterLayer !== null){
            dataNames.push(clusterLayer);
            unknown = false;
        }
        var thematicComplexLayer = this.createThematicComplexLayer(idLayer, vectorSource, thematicComplex, dataFilter);
        if(thematicComplexLayer !== null) {
            dataNames.push(thematicComplexLayer);
            unknown = false;
        }
        if(unknown){
            this.ListFeatures[idLayer] = new ol.layer.Vector({
                title: idLayer,
                source: vectorSource
            });
            this.ListFilterFeatures[idLayer] = dataFilter;
            dataNames.push( '-'+ idLayer);
        }
        return dataNames;
    };



     /**
     * LayerRaster Method
     * createWMSQueryLayer initialize the layer of the map to specific WMS data
     * @param layerName is the name of the layer
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param dataName is the name of the data on the server
     * @param visibility is the indicator to display or not at the start
     * @param dataAttribution is the information about the data
     * @param resoMin is the minimal resolution to display the layer
     * @param resoMax is the maximal resolution to display the layer
     */
    this.createWMSQueryLayer = function(layerName, server, url, dataName, visibility, dataAttribution, resoMin, resoMax){
        if(resoMin === ''){
            resoMin = 0;
        }
        if(resoMax === ''){
            resoMax = 156543.03;
        }
        if(server === 'AGS-IMS'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
                source: new ol.source.TileArcGISRest({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url + dataName + '/ImageServer'),
                    crossOrigin:'anonymous'
                }),
                minResolution: parseFloat(resoMin),
                maxResolution: parseFloat(resoMax),
                visible: visibility
            });
        }else if(server === 'AGS-MPS'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
                source: new ol.source.TileArcGISRest({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url + dataName + '/MapServer'),
                    crossOrigin:'anonymous'
                }),
                minResolution: parseFloat(resoMin),
                maxResolution: parseFloat(resoMax),
                visible: visibility
            });
        }else if (server === 'GeoServer'){
            this.ListFeatures[layerName] = new ol.layer.Tile({
                title: layerName,
                source: new ol.source.TileWMS({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url),
                    params: {'LAYERS': dataName},
                    serverType:'geoserver',
                    crossOrigin:'anonymous'
                }),
                minResolution: parseFloat(resoMin),
                maxResolution: parseFloat(resoMax),
                visible: visibility
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
     * @param idLayer is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param heatmap is the parameter of the style layer
     * @param dataFilter is the parameter to stock all information of the layer
     * @returns {*} the name of the layer
     */
    this.createHeatMapLayer = function(idLayer, vectorSource, heatmap, dataFilter){
        for(var heatmapNb = 0; heatmapNb < heatmap.length; heatmapNb++) {
            if (heatmap[heatmapNb][2] === idLayer) {
                var labelLayer = heatmap[heatmapNb][0];
                var orderLayer = heatmap[heatmapNb][1];
                var visibility = heatmap[heatmapNb][3];
                var attributeLayer = heatmap[heatmapNb][4];
                var radiusValue = parseInt(heatmap[heatmapNb][5]);
                var blurValue = parseInt(heatmap[heatmapNb][6]);
                var maxValue = parseFloat(heatmap[heatmapNb][7]);
                var resoMin = heatmap[heatmapNb][8] === '' ? 0 : parseFloat(heatmap[heatmapNb][8]);
                var resoMax = heatmap[heatmapNb][9] === '' ? 156543.03 : parseFloat(heatmap[heatmapNb][9]);

                vectorSource.on('addfeature', function(event) {
                    var value = event.feature.get(attributeLayer);
                    event.feature.set('weight', parseFloat(value)/maxValue);
                });

                this.ListFeatures[labelLayer] = new ol.layer.Heatmap({
                    title: labelLayer,
                    source: vectorSource,
                    blur: blurValue,
                    radius: radiusValue,
                    minResolution: parseFloat(resoMin),
                    maxResolution: parseFloat(resoMax),
                    visible: visibility
                });
                this.ListFilterFeatures[labelLayer] = dataFilter;
                return orderLayer +'-'+ labelLayer;
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createClusterLayer generate cluster layer
     * @param idLayer is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param cluster is the parameter of the style layer
     * @param dataFilter is the parameter to stock all information of the layer
     * @returns {*} the name of the layer
     */
    this.createClusterLayer = function(idLayer, vectorSource, cluster, dataFilter){
        for(var clusterNb = 0; clusterNb < cluster.length; clusterNb++) {
            if (cluster[clusterNb][2] === idLayer) {
                var labelLayer = cluster[clusterNb][0];
                var orderLayer = cluster[clusterNb][1];
                var visibility = cluster[clusterNb][3];
                var distCluster = parseInt(cluster[clusterNb][4]);
                this.style.initClusterValue(cluster[clusterNb][5]);
                var resoMin = cluster[clusterNb][6] === '' ? 0 : parseFloat(cluster[clusterNb][6]);
                var resoMax = cluster[clusterNb][7] === '' ? 156543.03 : parseFloat(cluster[clusterNb][7]);

                this.ListFeatures[labelLayer] = new ol.layer.Vector({
                    title: labelLayer,
                    source: new ol.source.Cluster({
                        attributions: vectorSource.getAttributions(),
                        source: vectorSource,
                        distance: distCluster
                    }),
                    style: this.style.styleCluster,
                    minResolution: parseFloat(resoMin),
                    maxResolution: parseFloat(resoMax),
                    visible: visibility
                });
                this.clusterLayer.push(labelLayer);
                this.ListFilterFeatures[labelLayer] = dataFilter;
                return orderLayer +'-'+ labelLayer;
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createThematicLayer generate thematic layer
     * @param idLayer is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param thematic is the parameter of the style layer
     * @param dataFilter is the parameter to stock all information of the layer
     * @returns {*} the name of the layer
     */
    this.createThematicLayer = function(idLayer, vectorSource, thematic, dataFilter){
        for(var thematicNb = 0; thematicNb < thematic.length; thematicNb++) {
            if (thematic[thematicNb][2] === idLayer) {
                var labelLayer = thematic[thematicNb][0];
                var orderLayer = thematic[thematicNb][1];
                var visibility = thematic[thematicNb][3];
                this.style.initThematicValue(thematic[thematicNb][4], thematic[thematicNb][5], thematic[thematicNb][6]);
                var resoMin = thematic[thematicNb][7] === '' ? 0 : parseFloat(thematic[thematicNb][7]);
                var resoMax = thematic[thematicNb][8] === '' ? 156543.03 : parseFloat(thematic[thematicNb][8]);

                this.ListFeatures[labelLayer] = new ol.layer.Vector({
                    title: labelLayer,
                    source: vectorSource,
                    style: this.style.styleThematicApply,
                    minResolution: parseFloat(resoMin),
                    maxResolution: parseFloat(resoMax),
                    visible: visibility
                });
                this.ListFilterFeatures[labelLayer] = dataFilter;
                return orderLayer +'-'+ labelLayer;
            }
        }
        return null;
    };

    /**
     * Feature Method
     * createThematicComplexLayer generate thematic complex layer
     * @param idLayer is the name of the source layer
     * @param vectorSource is the source of the data layer
     * @param thematicComplex is the parameter of the style layer
     * @param dataFilter is the parameter to stock all information of the layer
     * @returns {*} the name of the layer
     */
    this.createThematicComplexLayer = function(idLayer, vectorSource, thematicComplex, dataFilter){
        for(var thematicComplexNb = 0; thematicComplexNb < thematicComplex.length; thematicComplexNb++) {
             if (thematicComplex[thematicComplexNb][2] === idLayer) {
                 var labelLayer = thematicComplex[thematicComplexNb][0];
                 var orderLayer = thematicComplex[thematicComplexNb][1];
                 var visibility = thematicComplex[thematicComplexNb][3];
                 this.style.initThematicComplexValue(thematicComplex[thematicComplexNb][4],
                    thematicComplex[thematicComplexNb][5], thematicComplex[thematicComplexNb][6],
                    thematicComplex[thematicComplexNb][7], thematicComplex[thematicComplexNb][8],
                    thematicComplex[thematicComplexNb][9]);
                 var resoMin = thematicComplex[thematicComplexNb][10] === '' ? 0 : parseFloat(thematicComplex[thematicComplexNb][10]);
                 var resoMax = thematicComplex[thematicComplexNb][11] === '' ? 156543.03 : parseFloat(thematicComplex[thematicComplexNb][11]);

                 this.ListFeatures[labelLayer] = new ol.layer.Vector({
                    title: labelLayer,
                    source: vectorSource,
                    style: this.style.styleThematicComplexApply,
                    minResolution: parseFloat(resoMin),
                    maxResolution: parseFloat(resoMax),
                    visible: visibility
                 });
                 this.ListFilterFeatures[labelLayer] = dataFilter;
                 return orderLayer +'-'+ labelLayer;
             }
        }
        return null;
    };
}


