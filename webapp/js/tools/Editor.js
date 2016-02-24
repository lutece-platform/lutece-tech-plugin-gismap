/*global ol*/

/**
 * Editor Class manage all Edition of data on the map
 */
function Editor(){
    'use strict';
    this.editInteraction = [];
    /**
     * selectInteract is the interaction to select a feature on the map
     * @type {ol.interaction.Select}
     */
    this.selectInteract = new ol.interaction.Select();
    /**
     * modifyInteract is the interaction to modify a feature on the map
     * @type {ol.interaction.Select}
     */
    this.modifyInteract = new ol.interaction.Modify({
        features: this.selectInteract.getFeatures()
    });
    /**
     * drawInteract is the interaction to draw a feature on the map
     * @type {ol.interaction.Select}
     */
    //this.drawInteract = new ol.interaction.Draw();

    /**
     * Editor Method
     * initEditInteraction initialize the List of interacts to edit data
     */
    this.initEditInteraction = function(){
        //this.editInteraction.push(this.drawInteract);
        this.editInteraction.push(this.selectInteract);
        this.editInteraction.push(this.modifyInteract);
    };

    /**
     * Editor Method
     * getEditInteract is a getter to access at all editor interaction
     * @returns {*}
     */
    this.getEditInteract = function(){
        return this.editInteraction;
    };

    /**
     * Editor Method
     * getSelectInteract is a getter to access at select editor interaction
     * @returns {*}
     */
    this.getSelectInteract = function(){
        return this.selectInteract;
    };

    /**
     * Editor Method
     * getModifyInteract is a getter to access at modify editor interaction
     * @returns {*}
     */
    this.getModifyInteract = function(){
        return this.modifyInteract;
    };

    /**
     * Editor Method
     * getDrawInteract is a getter to access at draw editor interaction
     * @returns {*}
     */
    this.getDrawInteract = function(){
        return this.modifyInteract;
    };

    /**
     * Editor Method
     * setDrawInteract is a setter to define the layer and geometry of the draw editor interaction
     * @returns {*}
     */
    this.setDrawInteract = function(layer){
        this.drawInteract.setProperties({
            source: layer,
            type: layer.getFeature().getGeometry()
        });
    };
}