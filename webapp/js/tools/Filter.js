/*global ol, GlobalMap, featureLayer*/

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
     * geoJSONFormat define the format GeoJSON
     * @type {ol.format.GeoJSON}
     */
    var geoJSONFormat = new ol.format.GeoJSON();

    /**
     * Filter Method
     * filterData add a background map at the ListLayer
     */
    this.filterData = function(name, query, data){

    };

    /**
     * Filter Method
     * filterGeoJson add a background map at the ListLayer
     */
    this.filterGeoJson = function(name, dataGeoJson){
        this.ListLayers[name].getSource().clear();
        var features = geoJSONFormat.readFeatures(dataGeoJson);
        if(features !== null) {
            this.ListFeatures[name].getSource().addFeatures(features);
        }
    };

    /**
     * Filter Method
     * filterWFS add a background map at the ListLayer
     */
    this.filterWFS = function(){
    };

    function actualizeMap(){

    }
}
