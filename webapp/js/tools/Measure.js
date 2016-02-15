/*global ol */
/**
 * Measure Class manage the several tools to measure on the map
 */
function Measure() {
    'use strict';
    /**
     * Graphic Elements
     */
    var measureSelector = document.getElementById('measureType');
    var geodesicMeasure = document.getElementById('measureAdv');

    /**
     * geodesicSphere define the sphere to geodetic measure
     * @type {ol.Sphere}
     */
    var geodesicSphere = new ol.Sphere(6378137);
    /**
     * measureSource define the type of the feature
     * @type {ol.source.Vector}
     */
    this.measureSource = new ol.source.Vector();
    /**
     * measureLayer configure the layer of the measure elements
     * @type {ol.layer.Vector}
     */
    this.measureLayer = new ol.layer.Vector({
        source: this.measureSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#444444',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#444444'
                })
            })
        })
    });

    /**
     * geomElement is a current element
     * @type {ol.Feature}
     */
    var geomElement;

    /**
     * measureTooltopArray contains all tooltip of each measure
     * @type {Array}
     */
    this.measureTooltipArray = [];
    /**
     * measureTooltipElement define a tooltip for a measure
     */
    /**
     * measureTooltipElement is a measure tooltip element.
     * @type {Element}
     */
    var measureTooltipElement;
    /**
     * measureTooltip is an overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var measureTooltip;

    /**
     * Measure Private Method
     * formatArea define the format to area measure
     * @param polygon
     * @param map
     * @returns {*}
     */
    function formatArea(polygon, map) {
        var area;
        if (geodesicMeasure.checked) {
            var geom = (polygon.clone().transform(map.getView().getProjection(), 'EPSG:4326'));
            var coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(geodesicSphere.geodesicArea(coordinates));
        } else {
            area = polygon.getArea();
        }
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    }


    /**
     * Measure Private Method
     * formatLength define the format to linear measure
     * @param line
     * @param map
     * @returns {*}
     */
    function formatLength(line, map) {
        var length;
        if (geodesicMeasure.checked) {
            var coordinates = line.getCoordinates();
            length = 0;
            var sourceProj = map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += geodesicSphere.haversineDistance(c1, c2);
            }
        } else {
            length = Math.round(line.getLength() * 100) / 100;
        }
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm';
        }
        return output;
    }

    /**
     * Measure Private Method
     * createMeasureTooltip instanciate a new tooltip for each measure
     * @param map
     */
    this.createMeasureTooltip = function(map) {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.measureTooltipArray.push(measureTooltip);
        map.addOverlay(measureTooltip);
    };

    /**
     * Measure Public Method
     * getMeasureLayer is the getter to access at the measure layer
     * @returns {ol.layer.Vector}
     */
    this.getMeasureLayer = function(){
        return this.measureLayer;
    };

    /**
     *
     * @param active
     */
    this.setMeasureSelector = function(active){
        measureSelector.disabled = active;
        geodesicMeasure.disabled = active;
    };

    /**
     * Measure Public Method
     * getMeasureInteracts is an accessor to activate the measure tools and draw a feature on the map
     * @param map
     * @returns {ol.interaction.Draw}
     */
    this.getMeasureInteracts = function(map) {
        var listener;
        var value = measureSelector.value;
        var type = (value === 'Area' ? 'Polygon' : 'LineString');
        var measureInteract = new ol.interaction.Draw({
            source: this.measureSource,
            type:(type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        this.createMeasureTooltip(map);

        measureInteract.on('drawstart', function(evt) {
            geomElement = evt.feature;
            var tooltipCoord = evt.coordinate;

            listener = geomElement.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea((geom), map);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength((geom), map);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

        measureInteract.on('drawend', function() {
            measureTooltip.setOffset([0, -7]);
            geomElement = null;
            measureTooltipElement = null;
            this.createMeasureTooltip(map);
            ol.Observable.unByKey(listener);
        }, this);
        return measureInteract;
    };

    /**
     * Measure Public Method
     * cleanMeasureLayer is a function to delete all feature and overlay of the measure Layer
     * @param map
     */
    this.cleanMeasureLayer = function(map){
        for(var measureTooltipElem = 0; measureTooltipElem < this.measureTooltipArray.length; measureTooltipElem++){
            map.removeOverlay(this.measureTooltipArray[measureTooltipElem]);
        }
        this.measureTooltipArray.splice(0, this.measureTooltipArray.length);
        this.measureLayer.getSource().clear();
    };
}