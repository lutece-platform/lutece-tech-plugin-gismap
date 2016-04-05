/*globals ol*/

/**
 *  GeoPoint Class manage the Geolocation system
 */

function GeoPoint(currentMap, viewGisMap) {
    'use strict';
    /**
     * geoloc is the definition of the geolocalization on the current view
     * @type {ol.Geolocation}
     */
    this.geoloc = new ol.Geolocation({
        projection: viewGisMap.getView().getProjection()
    });

    /**
     * enable is the current value to show the GPS activity
     * @type {boolean}
     */
    this.enable = false;

    /**
     * geolocFeature contains all geoloc features
     * @type {Kw.http://www.opengis.net/wfs.Feature}
     */
    var geolocFeature = new ol.Feature();

    /**
     * geolocFeature style definition
     */
    geolocFeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                })
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            })
        })
    );

    /**
     * Handler to set the geometry of the geolocation
     */
    this.geoloc.on('change:position', function() {
        var coordinates = this.getPosition();
        geolocFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        viewGisMap.getView().fit(geolocFeature.getGeometry(), currentMap.getSize(),{
            maxZoom: viewGisMap.getZoomSelect()
        });
        currentMap.render();
    });

    /**
     * accuracyFeature contains all geoloc features about accuracy
     * @type {Kw.http://www.opengis.net/wfs.Feature}
     */
    var accuracyFeature = new ol.Feature();

    /**
     * Handler to set the geometry of the accuracy geolocation
     */
    this.geoloc.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(this.getAccuracyGeometry());
        currentMap.render();
    });

    /**
     * geolocLayer is the layer of the point of the geolocation
     * @type {ol.layer.Vector}
     */
    this.geolocLayer =  new ol.layer.Vector({
        map: currentMap,
        visible : false,
        source: new ol.source.Vector({
            features: [accuracyFeature, geolocFeature]
        })
    });

    /**
     * GeoPoint METHOD
     * enableGPS active the tracking GPS and the draw the layer on the map
     */
    this.enableGPS = function(){
        this.enable = true;
        this.geoloc.setTracking(true);
        this.geolocLayer.setVisible(true);
    };

    /**
     * GeoPoint METHOD
     * disableGPS inactive the tracking GPS and the delete the layer on the map
     */
    this.disableGPS = function(){
        this.enable = false;
        this.geoloc.setTracking(false);
        this.geolocLayer.setVisible(false);
        currentMap.render();
    };

    /**
     * GeoPoint METHOD
     * manageGPS is the method to manage the tracking GPS
     */
    this.manageGPS = function(){
        if(this.enable){
            this.disableGPS();
        }else{
            this.enableGPS();
        }
    };
}
