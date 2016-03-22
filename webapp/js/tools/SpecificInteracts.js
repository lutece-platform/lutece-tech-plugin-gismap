/*global ol, layer, featureLayer*/

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
     * @returns {ol.interaction.Select} the select interaction
     */
    this.getSelectInteraction = function(){
        return this.selectInteract;
    };

    /**
     * SpecificInteracts Method
     * getSelectedFeatures is a getter to access at all features selected
     * @returns {*} an array of all selected features
     */
    this.getSelectedFeatures = function(){
        return this.selectInteract.getFeatures();
    };

    /**
     * SpecificInteracts Method
     * getSpecificSelectedFeatures is a getter to send all features selected to another plugin
     * @returns {*} an array of the Ids
     */
    this.getSpecificSelectedFeatures = function(){
        var selectedElementId = [];
        var selectableLayers = layer.getSelectableLayers();
        var selection = this.selectInteract.getFeatures().getArray();
        for(var i = 0; i < selection.length; i++){
            for(var j = 0; j < selectableLayers.length; j++){
                if(selectableLayers[j] === this.selectInteract.getLayer(selection[i]).getProperties()['title']) {
                    selectedElementId.push(selection[i].getId());
                }
            }
        }
        return selectedElementId;
    };

    /**
     * SpecificInteracts Method
     * setSelectedFeatures is a setter to select features by another plugin
     * @param idFeature is an array of the Ids
     */
    this.setSelectedFeatures = function(idFeatures){
        var features = this.selectInteract.getFeatures();
        var selectableLayers = layer.getSelectableLayers();
        for(var i = 0; i < idFeatures.length; i++) {
            for (var j = 0; j < selectableLayers.length; j++) {
                features.push(featureLayer.getFeatureByName(selectableLayers[j]).getSource().getFeatureById(idFeatures[i]));
            }
        }
    };

    /**
     * SpecificInteracts Method
     * getSelectedLayer is a getter to access at the layer to contains selected features
     * @param feature is the selected feature
     * @returns {*} the layer
     */
    this.getSelectedLayer = function(feature){
        return this.selectInteract.getLayer(feature);
    };
}