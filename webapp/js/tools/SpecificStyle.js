/*global ol, StyleDefinition*/
/**
 * SpecificStyle Class manage all styles of the layers in the map
 */
function SpecificStyle() {
    'use strict';
    /**
     * styleLayerDefinition contains alla specific definition
     * @type {StyleDefinition}
     */
    var styleLayerDefinition = new StyleDefinition();
    /**
     * clusterCoef define the coefficient to calculate size of the cluster representation
     * @type {number}
     */
    var clusterCoef = 0.1;
    /**
     * clusterGroupFill define the fill style for the cluster group representation
     * @type {ol.style.Fill}
     */
    var clusterGroupFill = new ol.style.Fill({
        color: 'rgba(255, 153, 0, 0.4)'
    });
    /**
     * clusterFill define the fill style for the cluster simple representation
     * @type {ol.style.Fill}
     */
    var clusterFill = new ol.style.Fill({
        color: 'rgba(255, 153, 0, 0.8)'
    });
    /**
     * clusterStroke define the stroke style for the cluster simple and group representation
     * @type {ol.style.Stroke}
     */
    var clusterStroke = new ol.style.Stroke({
        color: 'rgba(255, 204, 0, 0.2)',
        width: 1
    });
    /**
     * clusterTextFill define the fill style for the cluster text representation
     * @type {ol.style.Fill}
     */
    var clusterTextFill = new ol.style.Fill({
        color: '#fff'
    });
    /**
     * clusterTextStroke define the stroke style for the cluster text representation
     * @type {ol.style.Stroke}
     */
    var clusterTextStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 3
    });
    /*var invisibleFill = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    });*/


    /**
     * thematicMap contains the name of the correspondence table for thematic representation
     * @type {null}
     */
    var thematicMap = null;
    /**
     * thematicStyle contains the name of the style for thematic representation
     * @type {null}
     */
    var thematicStyle = null;
    /**
     * thematicField1 contains the name of the field to define the color representation
     * @type {string}
     */
    var thematicField1 = '';
    /**
     * thematicField2 contains the name of the field to define the size representation
     * @type {string}
     */
    var thematicField2 = '';
    /**
     * thematicField3 contains the name of the field to define the label
     * @type {string}
     */
    var thematicField3 = '';
    /**
     * thematicCoef contains the value of the coefficient to calculate the size of style representation
     * @type {string}
     */
    var thematicCoef = '';

    /**
     * SpecificStyle Method
     * initClusterValue define the parameters for the cluster representation
     * @param coef value of the coefficient
     */
    this.initClusterValue = function(coef){
        if(coef !== undefined && coef !== '') {
            clusterCoef = parseFloat(coef);
        }
    };

     /**
     * SpecificStyle Method
     * initThematicValue define the parameters for the simple thematic representation
     * @param field the name of the color field
     * @param mapThematic the name of the correspondence table
     * @param styleThematic the name of the style definition
     */
    this.initThematicValue = function(field, mapThematic, styleThematic){
        thematicField1 = field;
        thematicMap = styleLayerDefinition.getMapCorrespondence(mapThematic);
        thematicStyle = styleLayerDefinition.getStyleThematic(styleThematic);
    };

     /**
     * SpecificStyle Method
     * initThematicComplexValue define the parameters for the complex thematic representation
     * @param field1 the name of the color field
     * @param field2 the name of the size field
     * @param field3 the name of the label field
     * @param mapThematicComplex the name of the correspondence table
     * @param styleThematicComplex the name of the style definition
     * @param coef value of the coefficient
     */
    this.initThematicComplexValue = function(field1, field2, field3, mapThematicComplex, styleThematicComplex, coef){
        thematicField1 = field1;
        thematicField2 = field2;
        thematicField3 = field3;
        thematicMap = styleLayerDefinition.getMapCorrespondence(mapThematicComplex);
        thematicStyle = styleLayerDefinition.getStyleThematic(styleThematicComplex);
        thematicCoef = coef;
    };

    /**
     * SpecificStyle Method
     * styleCluster define the cluster representation
     * @param feature contains by the layer
     * @returns {*} the cluster style
     */
    this.styleCluster = function(feature){
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: Math.max(15 ,size * clusterCoef),
                    fill: clusterGroupFill
                }),
                text: new ol.style.Text({
                    scale: 1.4,
                    text: size.toString(),
                    fill: clusterTextFill,
                    stroke: clusterTextStroke
                })
            });
        } else {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: clusterFill,
                    stroke: clusterStroke
                })
            });
        }
        return style;
    };

    /**
     * SpecificStyle Method
     * styleThematicApply define the simple thematic representation
     * @param feature contains by the layer
     * @returns {*} the simple thematic style
     */
    this.styleThematicApply = function(feature){
        if (thematicMap[feature.get(thematicField1)]){
            return thematicStyle[thematicMap[feature.get(thematicField1)]];
        }else{
            return thematicStyle['default'];
        }
    };

    /**
     * SpecificStyle Method
     * styleThematicComplexApply define the complex thematic representation
     * @param feature contains by the layer
     * @returns {*} the complex thematic style
     */
    this.styleThematicComplexApply = function(feature){
        var finalStyle = null;
        if (thematicMap[feature.get(thematicField1)]){
            finalStyle = thematicStyle[thematicMap[feature.get(thematicField1)]];
        }else{
            finalStyle = thematicStyle['default'];
        }
        if (thematicField2 !== '' || thematicField2 !== undefined){
            if (feature.get(thematicField2) !== '' || feature.get(thematicField2) !== undefined ) {
               if (thematicCoef === '' || thematicCoef === undefined){
                    thematicCoef = 1;
                }
                var size = parseFloat(feature.get(thematicField2))*parseFloat(thematicCoef);
                if(finalStyle.getImage() !== null){
                    finalStyle.getImage().setScale(size);
                }else if(finalStyle.getStroke !== null){
                    finalStyle.getStroke().setWidth(size);
                }
            }
        }
        if(finalStyle.getText() !== null || thematicField3 !== '' || thematicField3 !== undefined) {
            finalStyle.getText().setText(feature.get(thematicField3).toString());
        }
        return finalStyle;
    };

}



