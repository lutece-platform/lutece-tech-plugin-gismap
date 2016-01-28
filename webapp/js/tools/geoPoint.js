var GeoPoint = function(map) {
    var geolocation = new ol.Geolocation({
        projection: view.getProjection()
    });

    var positionFeature = new ol.Feature()
    positionFeature.setStyle(
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
    geolocation.on('change:position', function() {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        map.render();
    });

    var accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        map.render();
    });

    var geolocLayer =  new ol.layer.Vector({
        map: map,
        visible : false,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });

    /**
     * PUBLIC METHODS
     */

    activeGPS = function(){
        geolocation.setTracking(true);
        geolocLayer.setVisible(true);
        return;
    };

    disactiveGPS = function(){
        geolocation.setTracking(false);
        geolocLayer.setVisible(false);
        map.render();
        return;
    };
};