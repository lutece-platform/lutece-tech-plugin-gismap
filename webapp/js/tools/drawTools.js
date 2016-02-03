var DrawTools = function(){

    var drawToolSelector = document.getElementById('drawToolSelector');
    var draw;
    var features = new ol.Collection();
    var source = new ol.source.Vector({features: features});
    var drawLayer = new ol.layer.Vector({
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

    var modifyInteract = new ol.interaction.Modify({
        features: features,
    });

    setDrawSelector = function(active){
        drawToolSelector.options[drawToolSelector.selectedIndex].value = 'None';
        drawToolSelector.options[drawToolSelector.selectedIndex].textContent = 'None';
        drawToolSelector.disabled = active;
    }

    getModifyInteract = function(){
        return modifyInteract;
    }

    getDrawLayer = function(){
        return drawLayer;
    }

    getDrawInteraction = function() {
        var value = drawToolSelector.value;
        if (value !== 'None') {
            var geometryFunction, maxPoints;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            } else if (value === 'Box') {
                value = 'LineString';
                maxPoints = 2;
                geometryFunction = function(coordinates, geometry) {
                    if (!geometry) {
                        geometry = new ol.geom.Polygon(null);
                    }
                    var start = coordinates[0];
                    var end = coordinates[1];
                    geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                    ]);
                    return geometry;
                };
            }
            draw = new ol.interaction.Draw({
                source: source,
                type: (value),
                geometryFunction: geometryFunction,
                maxPoints: maxPoints
            });
        }else {
            draw = 'None';
        }
        return draw;
    }
}