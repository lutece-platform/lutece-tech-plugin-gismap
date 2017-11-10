/*global ol, alert, DrawTools, Editor, Measure, SpecificInteracts*/

/**
 * Interaction Class manage interactions on the map
 */

function Interaction(GlobalMap, layer, popup, projection, layerEdit, selectType, fieldParameters){
    'use strict';
    /**
     * featureLayer is a reference of the Feature Layer Object
     * @type {Feature|*}
     */
    var featureLayer = layer.getFeatureLayers();
    /**
     * drawTools is the draw tools object
     * @type {DrawTools}
     */
    var drawTools = new DrawTools();
    /**
     * measureTools is the measure tools object
     * @type {Measure}
     */
    var measureTools = new Measure();
    /**
     * specifInteracts is the specifics interacts object
     * @type {SpecificInteracts}
     */
    var specifInteracts = new SpecificInteracts(this, selectType, layer, featureLayer);
    /**
     * editorTools is the manager of edition tools
     * @type {Editor}
     */
    var editorTools = null;
    if(fieldParameters['TypeEdit'] !== '' && fieldParameters['TypeEdit'] !== undefined && layerEdit !== '' && layerEdit !== undefined) {
        editorTools = new Editor(this, layerEdit, fieldParameters, projection);
    }
	
    /**
     * ListInteracts contains all interactions enable on the map
     * @type {Array}
     */
    this.ListInteracts = [];
    /**
     * ListInteracts contains all interactions enable on the map
     * @type {Array}
     */
    var ListInteractsTemp = [];
    /**
     * currentInteract contains the current Interaction
     * @type {string}
     */
    this.currentInteract = "None";

     /**
     * Interaction Private METHOD
     * manageActiveInteraction disable all interactions of the map
     */
    this.manageActiveInteraction = function(){
        if(this.currentInteract === 'Select'){
            this.activeSpecificTool(false);
        }else if(this.currentInteract === "Measure"){
            this.activeMeasureTool(null, false);
        }else if(this.currentInteract === "Draw"){
            this.activeDrawTool(null, false);
        }else if(this.currentInteract === "Edit"){
            this.activeEditorTool(null, false);
        }else if(this.currentInteract === "SuggestPoiEdit"){
            this.activeEditorTool(null, false);
        }
    };

    /**
     * Interaction Private METHOD
     * activeSpecificTool enable or disable specific interaction
     * @param enable is the marker to indicate activation
     */
    this.activeSpecificTool = function (enable){
        if(enable === false) {
            specifInteracts.getSelectedFeatures().clear();
        }
        specifInteracts.setActiveInteraction(enable);
    };

     /**
     * Interaction Private METHOD
     * activeMeasureTool enable or disable draw interaction
     * @param value is the type of draw mode
     * @param enable is the marker to indicate activation
     */
    this.activeDrawTool = function(value, enable){
         drawTools.setActiveInteraction(value, enable);
    };

     /**
     * Interaction Private METHOD
     * activeMeasureTool enable or disable measure interaction
     * @param value is the type of measure mode
     * @param enable is the marker to indicate activation
     */
    this.activeMeasureTool = function(value, enable){
         measureTools.setActiveInteraction(value, enable);
    };

     /**
     * Interaction Private METHOD
     * activeEditorTool enable or disable editor interaction
     * @param value is the type of editor mode
     * @param enable is the marker to indicate activation
     */
    this.activeEditorTool = function(value, enable){
        if(enable === false) {
            editorTools.getSelectEditInteract().getFeatures().clear();
        }
        editorTools.setActiveInteraction(value, enable);
    };

    /**
     * Interaction Public METHOD
     * initInteractions initialize interaction on the map
     * @param activeInteracts is the list of parameters to initiate interacts
     */
    this.initInteractions = function(activeInteracts){
        var editorInteracts = null;
        if(featureLayer.getClusterLayers() !== null || featureLayer.getClusterLayers() !== undefined){
            this.ListInteracts.push(specifInteracts.getSelectClusterInteraction());
        }
        for(var ctrl = 0; ctrl < activeInteracts.length; ctrl++) {
            if(activeInteracts[ctrl] === "Select") {
                this.ListInteracts.push(specifInteracts.getSelectInteraction());
				this.ListInteracts.push(specifInteracts.getDrawSelectInteraction() );
                this.currentInteract = "Select";
            }
            if (activeInteracts[ctrl] === "Rotate") {
                this.ListInteracts.push(new ol.interaction.DragRotate());
            }
            if (activeInteracts[ctrl] === "ZoomBox") {
                this.ListInteracts.push(new ol.interaction.DragZoom());
            }
            if (activeInteracts[ctrl] === "Draw") {
                var drawInteracts = drawTools.initDrawTools();
                drawInteracts.forEach(function(val, key){
                    ListInteractsTemp.push(val);
                }, drawInteracts);
                for(var i = 0; i < ListInteractsTemp.length; i++){
                    this.ListInteracts.push(ListInteractsTemp[i]);
                }
                ListInteractsTemp = [];
            }
            if (activeInteracts[ctrl] === "Measure") {
               var measureInteracts = measureTools.initMeasureTools(GlobalMap);
                measureInteracts.forEach(function(val, key){
                    ListInteractsTemp.push(val);
                }, measureInteracts);
                for(var j = 0; j < ListInteractsTemp.length; j++){
                    this.ListInteracts.push(ListInteractsTemp[j]);
                }
                ListInteractsTemp = [];
            }
            if (activeInteracts[ctrl] === "Edit" ) {
                editorInteracts = editorTools.initEditInteraction('Draw');
                editorInteracts.forEach(function(val, key){
                    ListInteractsTemp.push(val);
                }, editorInteracts);
                for(var k = 0; k < ListInteractsTemp.length; k++){
                    this.ListInteracts.push(ListInteractsTemp[k]);
                }
                ListInteractsTemp = [];
                this.currentInteract = "Edit";
                this.setEditInteraction();
            }
            if (activeInteracts[ctrl] === "SuggestPOIEdit") {
                editorInteracts = editorTools.initEditInteraction('Suggest');
                editorInteracts.forEach(function(val, key){
                    ListInteractsTemp.push(val);
                }, editorInteracts);
                for(var l = 0; l < ListInteractsTemp.length; l++){
                    this.ListInteracts.push(ListInteractsTemp[l]);
                }
                ListInteractsTemp = [];
                this.currentInteract = "SuggestPoiEdit";
                this.setSuggestEditInteraction();
            }
            if (activeInteracts[ctrl] === "ReadOnly") {
                editorInteracts = editorTools.initEditInteraction('ReadOnly');
            }
        }
    };


    /**
     * Interaction Public METHOD
     * setDrawInteraction define the current draw interaction
     */
    this.setSelectInteraction = function(){
        this.disablePopup();
        this.manageActiveInteraction();
        this.activeSpecificTool(true);
        this.currentInteract = "Select";
    };

    /**
     * Interaction Public METHOD
     * setDrawInteraction define the current draw interaction
     */
    this.setEditInteraction = function(){
        this.disablePopup();
        this.manageActiveInteraction();
        editorTools.getEditorTools();
        this.activeEditorTool("Act", true);
        this.currentInteract = "Edit";
    };

    /**
     * Interaction Public METHOD
     * setDrawInteraction define the current draw interaction
     */
    this.setSuggestEditInteraction = function(){
        this.disablePopup();
        this.manageActiveInteraction();
        editorTools.getEditorTools();
        this.activeEditorTool("Suggest", true);
        this.currentInteract = "SuggestPoiEdit";
    };

    /**
     * Interaction Public METHOD
     * setDrawInteraction define the current draw interaction
     * @param value is the type of geometry drawn
     */
    this.setDrawInteraction = function(value){
        this.disablePopup();
        this.manageActiveInteraction();
        drawTools.getDrawTools(value);
        this.activeDrawTool(value, true);
        this.currentInteract = "Draw";
    };

    /**
     * Interaction Public METHOD
     * setMeasureInteraction define the current measure interaction
     * @param value is the type of measure
     */
    this.setMeasureInteraction = function(value){
        this.disablePopup();
        this.manageActiveInteraction();
        measureTools.getMeasureTools(value);
        this.activeMeasureTool(value, true);
        this.currentInteract = "Measure";
    };


    /**
     * Interaction Public METHOD
     * setMeasureInteraction define the current measure interaction
     */
    this.disablePopup= function(){
        if(popup !== null && popup !== undefined){
            popup.managePopup('off');
        }
    };

     /**
     * Interaction Method
     * deleteFeatures is a method to call an action to delete all selected elements
     * @param value is a marker to indicate a specific process
     */
    this.deleteFeatures = function (value) {
        var selectFeatures = specifInteracts.getSelectedFeatures().getArray();
        if (selectFeatures.length !== 0) {
            var selectedLayer = specifInteracts.getSelectedLayer(selectFeatures[0]);
            if (selectedLayer === measureTools.getMeasureLayer()) {
                measureTools.cleanMeasureLayer(GlobalMap);
            } else if (selectedLayer === drawTools.getDrawLayer()) {
                if (selectFeatures.length === 1) {
                    selectedLayer.getSource().removeFeature(selectFeatures[0]);
                } else if (selectFeatures.length > 1) {
                    for (var selectFeature = 0; selectFeature < selectFeatures.length; selectFeature++) {
                        selectedLayer.getSource().removeFeature(selectFeatures[selectFeature]);
                    }
                }
            } else if (selectedLayer === editorTools.getEditLayer()){
                alert("Cette valeur appartient à la couche d'édition!");
            }
            specifInteracts.getSelectedFeatures().clear();
        }else {
            if(editorTools !== null) {
                editorTools.deleteFeature(value);
                this.setEditInteraction();
            }
        }
    };

    /**
     * Interaction Public METHOD
     * getInteracts get the list of all interactions enable on the map
     * @returns {Array} an array of all interactions
     */
    this.getInteracts = function(){
        return this.ListInteracts;
    };

    /**
     * Interaction Public METHOD
     * getEditor is the accessor of the editor tools
     * @returns {Editor} the manager of edition tools
     */
    this.getEditor = function(){
        return editorTools;
    };

    /**
     * Interaction Public METHOD
     * getDraw is the accessor of the draw tools
     * @returns {DrawTools} the draw tools object
     */
    this.getDraw = function(){
        return drawTools;
    };

    /**
     * Interaction Public METHOD
     * getMeasure is the accessor of the measure tools
     * @returns {Measure} the measure tools object
     */
    this.getMeasure = function(){
        return measureTools;
    };

    /**
     * Interaction Public METHOD
     * getSpecificInteract is the accessor of the specifics interacts object
     * @returns {SpecificInteracts} the specifics interacts object
     */
    this.getSpecificInteract = function(){
        return specifInteracts;
    };
}