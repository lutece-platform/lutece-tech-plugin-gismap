/*global ol */
/**
 * StyleDefinition Class define all styles of the layers in the map
 */
function StyleDefinition() {
    'use strict';
    /**
     * listStyles contains all styles definition of the map
     * @type {Array}
     */
    this.listStyles = [];
    /**
     * listMaps contains the correspondence table between the data and the style
     * @type {Array}
     */
    this.listMaps = [];

    /**
     * StyleDefinition Method
     * getMapCorrespondence is a getter to access at the right correspondence table
     * @param mapThematic is the name of the correspondence table
     * @returns {*} the correspondence table
     */
    this.getMapCorrespondence = function (mapThematic){
        return this.listMaps[mapThematic];
    };

    /**
     * StyleDefinition Method
     * getStyleThematic is a getter to access at the right style definition
     * @param styleThematic is the name of the style definition
     * @returns {*} the style definition
     */
    this.getStyleThematic = function(styleThematic){
        return this.listStyles[styleThematic];
    };

    /**
     * defaultFill define the default fill style of geometry
     * @type {ol.style.Fill}
     */
    var defaultFill = new ol.style.Fill({
        color: 'rgba(141, 205, 227, 0.3)'
    });

    /**
     * defaultStroke define the default stroke style of geometry
     * @type {ol.style.Stroke}
     */
    var defaultStroke = new ol.style.Stroke({
        color: 'rgba(175, 205, 245, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * defaultFill define the default fill style of text
     * @type {ol.style.Fill}
     */
    var defaultTextFill = new ol.style.Fill({
        color: '#fff'
    });

    /**
     * defaultStroke define the default stroke style of text
     * @type {ol.style.Stroke}
     */
    var defaultTextStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 3
    });

    /**
     * text define the text style for label
     * @type {ol.style.Text}
     */
    var textStyle = new ol.style.Text({
        scale: 1.4,
        fill: defaultTextFill,
        stroke: defaultTextStroke,
        text: ''
    });

    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var thematicFill = new ol.style.Fill({
        color: 'rgba(153, 255, 204, 0.75)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var thematicStroke = new ol.style.Stroke({
        color: 'rgba(153, 255, 255, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fille = new ol.style.Fill({
        color: 'rgba(153, 35, 204, 0.75)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke = new ol.style.Stroke({
        color: 'rgba(153, 35, 255, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * Sample of correspondence table
     * @type {Map}
     */
    this.listMaps['mapStyle1'] = {
        '75116':"5",
        '75115':"4",
        '75114':"3",
        '75113':"2",
        '75112':"1"
    };

    /**
     * Sample of style definition
     * @type {}
     */
    this.listStyles['defaultStyle1'] = {
        '1': new ol.style.Style({
            fill: fille,
            stroke: stroke
        }),
        '2': new ol.style.Style({
            fill: thematicFill,
            stroke: stroke
        }),
        '3': new ol.style.Style({
            fill: fille,
            stroke: stroke
        }),
        '4': new ol.style.Style({
            fill: thematicFill,
            stroke: thematicStroke
        }),
        '5': new ol.style.Style({
            fill: fille,
            stroke: thematicStroke
        }),
        'default': new ol.style.Style({
            fill: defaultFill,
            stroke: defaultStroke
        })
    };

    /**
     * Sample of style definition
     * @type {}
     */
    this.listStyles['IdeationStyle'] = {
        '1': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: stroke
        }),
        '2': new ol.style.Style({
            text: textStyle,
            fill: thematicFill,
            stroke: stroke
        }),
        '3': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: stroke
        }),
        '4': new ol.style.Style({
            text: textStyle,
            fill: thematicFill,
            stroke: thematicStroke
        }),
        '5': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: thematicStroke
        }),
        'default': new ol.style.Style({
            text: textStyle,
            fill: defaultFill,
            stroke: defaultStroke
        })
    };
}