/*global ol, Map*/
/**
 * DrawTools Class manage the several tools to draw geometries on the map
 */
function DrawTools (){
    'use strict';
    /**
     * listDrawInteraction is the list of draw interaction active on the map
     * @type {Map}
     */
    this.listDrawInteraction = new Map();
    /**
     * drawInteraction is the current interaction active on the map
     * @type {null}
     */
    this.drawInteraction = null;
    /**
     * drawFeature contains all features drawn
     * @type {ol.Collection}
     */
    this.drawFeature = new ol.Collection();
    /**
     * drawSource define the type of the feature
     * @type {ol.source.Vector}
     */
    this.drawSource = new ol.source.Vector({features: this.drawFeature});
    /**
     * drawLayer configure the layer of the drawn elements
     * @type {ol.layer.Vector}
     */
    this.drawLayer = new ol.layer.Vector({
        source: this.drawSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#000000'
                })
            })
        })
    });
    /**
     * modifyInteract instantiate the interaction to modify a geometry
     * @type {ol.interaction.Modify}
     */
    this.modifyInteract = new ol.interaction.Modify({
        features: this.drawFeature
    });

    /**
     * DrawTools METHOD
     * getModifyInteract is a getter to access at modify interaction to draw elements
     * @returns {ol.interaction.Modify}
     */
    this.getModifyDrawInteract= function (){
         return this.modifyInteract;
    };

    /**
     * DrawTools METHOD
     * getDrawLayer is an accessor to get the draw layer
     * @returns {ol.layer.Vector}
     */
    this.getDrawLayer = function(){
        return this.drawLayer;
    };

    /**
     * DrawTools METHOD
     * getDrawInteraction is an accessor to activate a specific draw interaction on the map
     * @returns {ol.interaction.Draw}
     */
    this.getDrawInteraction = function(value) {
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
        this.drawInteraction = new ol.interaction.Draw({
            source: this.drawSource,
            type: (value),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        return this.drawInteraction;
    };

    /**
     * DrawTools METHOD
     * setActiveInteraction enable or disable draw interaction
     * @param value
     * @param active
     */
    this.setActiveInteraction = function(value, active){
        if (value === null){
            this.listDrawInteraction.forEach(function(val, key){
                val.setActive(false);
            });
        }else {
            this.listDrawInteraction.get(value).setActive(active);
            this.listDrawInteraction.get('Modify').setActive(active);
        }
    };

    /**
     * DrawTools METHOD
     * initDrawTools initialize all draw interaction on the map
     * @returns {Map}
     */
    this.initDrawTools = function(){
        this.listDrawInteraction.set('Modify',this.getModifyDrawInteract());
        this.listDrawInteraction.set('Point',this.getDrawInteraction('Point'));
        this.listDrawInteraction.set('LineString',this.getDrawInteraction('LineString'));
        this.listDrawInteraction.set('Polygon',this.getDrawInteraction('Polygon'));
        this.setActiveInteraction(null, false);
        return this.listDrawInteraction;
    };

    /**
     * DrawTools METHOD
     * getDrawTools is a getter to access at the draw interaction
     * @param value
     * @returns {Array}
     */
    this.getDrawTools = function(value){
        var listDraw = [];
        listDraw.push(this.listDrawInteraction.get(value));
        listDraw.push(this.listDrawInteraction.get('Modify'));
        return listDraw;
    };
}
