/*global ol, view*/

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
     * Feature Method
     * addLayerFeature create the layer with decode data with specific format
     * @param data
     * @param dataFormat
     */
    this.addLayerFeature = function(data, dataFormat){
        var dataProj = data[0];
        if(dataFormat === 'WKT'){
            for(var i = 1; i < data.length; i++){
                this.ListFeatures.push(wktFormat.readFeature(data[i], {
                    dataProjection: dataProj,
                    featureProjection: view.getProjection()
                }));
            }
        }else if(dataFormat === 'GeoJSON'){
            for(var j = 1; j < data.length; j++){
                this.ListFeatures.push(geoJSONFormat.readFeature(data[j], {
                    dataProjection: dataProj,
                    featureProjection: view.getProjection()
                }));
            }
        }
        return name;
    };

    //En Cours de Dev
    /**
     * Feature Method
     * createWFSLayer initialize the layer of the map to specific WFS data
     * @param server
     * @param url
     * @param layerName
     */
    this.createWFSLayer = function(server, url, layerName) {
        if (server === 'AGS') {
            this.features.push(this.features[layerName] = new ol.layer.Tile({
                source: new ol.source.TileArcGISRest({
                    url: url + layerName + '/FeatureServer'
                }),
                visible: false
            }));
        } else if (server === 'AGS-MPS') {
            this.features.push(this.features[layerName] = new ol.layer.Tile({
                source: new ol.source.TileArcGISRest({
                    url: url + layerName + '/MapServer'
                }),
                visible: false
            }));
        }
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
        return this.ListRasters[name];
    };
}



