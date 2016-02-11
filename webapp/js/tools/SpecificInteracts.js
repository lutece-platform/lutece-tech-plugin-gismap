/*global ol*/

/**
 * SpecificInteracts Class manage a part of interaction enabled on the map
 */
function SpecificInteracts(){
    'use strict';
    /**
     * selectInteract is the interaction to select a feature on the map
     * @type {ol.interaction.Select}
     */
    this.selectInteract = new ol.interaction.Select();

    /**
     * SpecificInteracts Method
     * getSelectInteraction is a getter to access at the Selector
     * @returns {ol.interaction.Select}
     */
    this.getSelectInteraction = function(){
        return this.selectInteract;
    };

    /**
     * SpecificInteracts Method
     * getSelectedFeatures is a getter to access at all features selected
     * @returns {*}
     */
    this.getSelectedFeatures = function(){
        return this.selectInteract.getFeatures();
    };

    /**
     * SpecificInteracts Method
     * getSelectedLayer is a getter to access at the layer to contains selected features
     * @param feature
     * @returns {*}
     */
    this.getSelectedLayer = function(feature){
        return this.selectInteract.getLayer(feature);
    };
}