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
    /**
     *
     * @type {ol.style.Fill}
     */
    var invisibleClusterFill = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    });

    /**
     * thematicSimpleValues contains all information for simple thematic representation
     * @type {Array}
     */
    var thematicSimpleValues = [];
    /**
     * thematicComplexValues contains all information for complex thematic representation
     * @type {Array}
     */
    var thematicComplexValues = [];

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
        thematicSimpleValues[field] = [field, styleLayerDefinition.getMapCorrespondence(mapThematic),
            styleLayerDefinition.getStyleThematic(styleThematic)];
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
        thematicComplexValues[field1] = [field1, field2, field3, styleLayerDefinition.getMapCorrespondence(mapThematicComplex),
            styleLayerDefinition.getStyleThematic(styleThematicComplex), coef];
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
     * styleCluster define the cluster representation of select element
     * @param feature contains by the layer
     * @returns {*} the cluster style
     */
    this.selectStyleCluster = function(feature){
        var size = feature.get('features').length;
        var styles = [new ol.style.Style({
            image: new ol.style.Circle({
                radius: Math.max(15 ,size * clusterCoef),
                fill: invisibleClusterFill
            })
        })];
        var originalFeatures = feature.get('features');
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
            styles.push(new ol.style.Style({
                geometry: originalFeatures[i].getGeometry(),
                image: new ol.style.Circle({
                    radius: 5,
                    fill: clusterFill,
                    stroke: clusterStroke
                })
            }));
        }
        return styles;
    };

    /**
     * SpecificStyle Method
     * styleThematicApply define the simple thematic representation
     * @param feature contains by the layer
     * @returns {*} the simple thematic style
     */
    this.styleThematicApply = function(feature) {
        var array = feature.getKeys();
        for(var i = 0; i < array.length ; i++){
            if(thematicSimpleValues[array[i]] !== undefined) {
                var thematicFieldSimple = thematicSimpleValues[array[i]][0];
                var thematicMapSimple = thematicSimpleValues[array[i]][1];
                var thematicStyleSimple = thematicSimpleValues[array[i]][2];
                if (thematicMapSimple[feature.get(thematicFieldSimple)]) {
                    return thematicStyleSimple[thematicMapSimple[feature.get(thematicFieldSimple)]];
                } else {
                    return thematicStyleSimple['default'];
                }
            }
        }
    };

    /**
     * SpecificStyle Method
     * styleThematicComplexApply define the complex thematic representation
     * @param feature contains by the layer
     * @returns {*} the complex thematic style
     */
    this.styleThematicComplexApply = function(feature){
        var array = feature.getKeys();
        for(var i = 0; i < array.length ; i++) {
            if (thematicComplexValues[array[i]] !== undefined) {
                var finalStyle = null;
                var thematicField1= thematicComplexValues[array[i]][0];
                var thematicField2= thematicComplexValues[array[i]][1];
                var thematicField3 = thematicComplexValues[array[i]][2];
                var thematicMap = thematicComplexValues[array[i]][3];
                var thematicStyle = thematicComplexValues[array[i]][4];
                var thematicCoef = thematicComplexValues[array[i]][5];
                if (thematicMap[feature.get(thematicField1)]) {
                    finalStyle = thematicStyle[thematicMap[feature.get(thematicField1)]];
                } else {
                    finalStyle = thematicStyle['default'];
                }
                if (thematicField2 !== '' && thematicField2 !== undefined && thematicField2 !== null) {
                    if (feature.get(thematicField2) !== '' || feature.get(thematicField2) !== undefined) {
                        if (thematicCoef === '' && thematicCoef === undefined && thematicField2 !== null) {
                            thematicCoef = 1;
                        }
                        var size = parseFloat(feature.get(thematicField2)) * parseFloat(thematicCoef);
                        if (finalStyle.getImage() !== null) {
                            if (finalStyle.getImage() instanceof ol.style.Icon) {
                                finalStyle.getImage().setScale(size);
                            } else if (finalStyle.getImage() instanceof ol.style.Circle) {
                                finalStyle = new ol.style.Style({
                                    text: finalStyle.getText(),
                                    image: new ol.style.Circle({
                                        radius: size,
                                        fill: finalStyle.getImage().getFill(),
                                        stroke: finalStyle.getImage().getStroke()
                                    }),
                                });
                            }
                        } else if (finalStyle.getStroke !== null) {
                            finalStyle.getStroke().setWidth(size);
                        }
                    }
                }
                if (finalStyle.getText() !== null && feature.get(thematicField3) !== null && feature.get(thematicField3) !== '' && feature.get(thematicField3) !== undefined) {
                    finalStyle.getText().setText(feature.get(thematicField3).toString());
                }
                return finalStyle;
            }
        }
    };

}



