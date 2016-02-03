var Measure = function(){
    var geodesicSphere = new ol.Sphere(6378137);
    var measureSelector = document.getElementById('measureType');
    var geodesicMeasure = document.getElementById('measureAdv');
    var source = new ol.source.Vector();

    var measureInteract = 'None';
    var measureTooltipElement;
    var measureTooltip;
    var sketch;

    var measureLayer = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    getMeasureLayer = function(){
        return measureLayer;
    }

    setMeasureSelector = function(active){
        measureSelector.options[measureSelector.selectedIndex].value = 'None';
        measureSelector.options[measureSelector.selectedIndex].textContent = 'None';
        measureSelector.disabled = active;
        geodesicMeasure.disabled = active;
    }

    var formatLength = function(line, map) {
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
    };

    var formatArea = function(polygon, map) {
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
    };

    function createMeasureTooltip(map) {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        map.addOverlay(measureTooltip)
    }

    getMeasureInteracts = function(map) {
        var value = measureSelector.value;
        if(value != 'None'){
            var type = (value == 'Area' ? 'Polygon' : 'LineString');
            measureInteract = new ol.interaction.Draw({
                source: source,
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
            createMeasureTooltip(map);

            measureInteract.on('drawstart', function(evt) {
                sketch = evt.feature;
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
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
                sketch = null;
                measureTooltipElement = null;
                createMeasureTooltip(map);
                ol.Observable.unByKey(listener);
            }, this);
        }else{
            measureInteract = 'None';
        }
        return measureInteract;
    }
}