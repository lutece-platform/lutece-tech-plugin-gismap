/*global ol, drawTools, measureTools, specifInteracts */

/**
 * Interaction Class manage interactions on the map
 */

function Interaction (){
    'use strict';
    var toolSelector = document.getElementById('specificToolSelector');

    /**
     * ListInteracts contains all interactions enable on the map
     * @type {Array}
     */
    this.ListInteracts = [];
    /**
     * currentDrawInteraction contains the current draw Interaction
     * @type {null}
     */
    this.currentDrawInteraction = null;
    /**
     * currentMeasureInteraction contains the current measure Interaction
     * @type {null}
     */
    this.currentMeasureInteraction = null;
    /**
     * currentSpecificInteract contains the current specific Interaction
     * @type {null}
     */
    this.currentSpecificInteract = null;

    /**
     * Interaction Private METHOD
     * inactiveSpecificTool disable specific interaction
     * @param map
     */
     this.inactiveSpecificTool = function (map){
        if(this.currentSpecificInteract !== null){
            map.removeInteraction(this.currentSpecificInteract);
            this.ListInteracts.pop();
            this.currentSpecificInteract = null;
        }
    };

     /**
     * Interaction Private METHOD
     * inactiveDrawTool disable draw interaction
     * @param map
     */
    this.inactiveDrawTool = function(map){
        if(this.currentDrawInteraction !== null) {
            map.removeInteraction(this.currentDrawInteraction);
            this.ListInteracts.pop();
            drawTools.setDrawSelector(true);
            this.currentDrawInteraction = drawTools.getDrawInteraction();
        }
    };

     /**
     * Interaction Private METHOD
     * inactiveMeasureTool disable measure interaction
     * @param map
     */
    this.inactiveMeasureTool = function(map){
        if(this.currentMeasureInteraction !== null) {
            map.removeInteraction(this.currentMeasureInteraction);
            this.ListInteracts.pop();
            measureTools.setMeasureSelector(true);
            this.currentMeasureInteraction = measureTools.getMeasureInteracts(map);
        }
    };

     /**
     * Interaction Private METHOD
     * setSpecificInteraction define the current specific interaction
     * @param map
     */
    this.setSpecificInteraction = function(map){
        this.currentSpecificInteract = specifInteracts.getSelectInteraction();
        this.ListInteracts.push(this.currentSpecificInteract);
        map.addInteraction(this.currentSpecificInteract);
    };

    /**
     * Interaction Public METHOD
     * initInteractions initialize interaction on the map
     */
    this.initInteractions = function(){
        this.ListInteracts.push(new ol.interaction.DragRotate());
        this.ListInteracts.push(new ol.interaction.DragZoom());
        this.currentSpecificInteract = specifInteracts.getSelectInteraction();
        this.ListInteracts.push(this.currentSpecificInteract);
    };

    /**
     * Interaction Public METHOD
     * setDrawInteraction define the current draw interaction
     * @param map
     */
    this.setDrawInteraction = function(map){
        map.removeInteraction(this.currentDrawInteraction);
        this.ListInteracts.pop();
        this.currentDrawInteraction = drawTools.getDrawInteraction();
        this.ListInteracts.push(this.currentDrawInteraction);
        map.addInteraction(this.currentDrawInteraction);
    };

    /**
     * Interaction Public METHOD
     * setMeasureInteraction define the current measure interaction
     * @param map
     */
    this.setMeasureInteraction = function(map){
        map.removeInteraction(this.currentMeasureInteraction);
        this.ListInteracts.pop();
        this.currentMeasureInteraction = measureTools.getMeasureInteracts(map);
        this.ListInteracts.push(this.currentMeasureInteraction);
        map.addInteraction(this.currentMeasureInteraction);
    };

    /**
     * Interaction Public METHOD
     * setTypeInteraction define the current interaction on the map
     * @param map
     */
    this.setTypeInteraction = function(map){
        var toolSelectorValue = toolSelector.value;
        if(toolSelectorValue === "Select"){
            this.inactiveDrawTool(map);
            this.inactiveMeasureTool(map);
            this.setSpecificInteraction(map);
        }else if(toolSelectorValue === "Measure"){
            measureTools.setMeasureSelector(false);
            this.inactiveDrawTool(map);
            this.inactiveSpecificTool(map);
            this.setMeasureInteraction(map);
        }else if(toolSelectorValue === "Draw"){
            drawTools.setDrawSelector(false);
            this.inactiveMeasureTool(map);
            this.inactiveSpecificTool(map);
            this.setDrawInteraction(map);
        }
    };

    /**
     * Interaction Public METHOD
     * getInteracts get the list of all interactions enable on the map
     * @returns {Array}
     */
    this.getInteracts = function(){
        return this.ListInteracts;
    };
}