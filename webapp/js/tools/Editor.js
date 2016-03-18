/*global ol, alert, Map, projection, GlobalMap, interact, editorTools*/

/**
 * Editor Class manage all Edition of data on the map
 */
function Editor(layerEdit, fieldName) {
    'use strict';
    /**
     * editInteraction is the map to stock all edit interaction
     * @type {Map}
     */
    this.editInteraction = new Map();
    /**
     * geoJSONFormat is the format to write on the GeoJSON data
     * @type {ol.format.GeoJSON}
     */
    this.geoJSONFormat = new ol.format.GeoJSON();
    /**
     * dirty is an array to stock the information of the edit feature
     * @type {{}}
     */
    var dirty = {};
    /**
     * fieldData is the field where we stock data value
     * @type {Element}
     */
    this.fieldData = document.getElementById(fieldName['GeomGeoJson']);
    /**
     * fieldCentroidX is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidX = document.getElementById(fieldName['GeomCentroidX']);
    /**
     * fieldCentroidY is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidY = document.getElementById(fieldName['GeomCentroidY']);
    /**
     * fieldEditionStatus is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldEditionStatus = document.getElementById(fieldName['GeomState']);
    /**
     * editSource is the source of the data can be edit on the map
     * @type {String}
     */
    var editData = this.fieldData.value === null ? '' : this.fieldData.value;
    /**
     * editAvailable is the marker to expose the editable data of the map
     * @type {boolean}
     */
    this.editAvailable = editData === '' ? true : false;
    /**
     * editSource is the source of data can be edit on the map
     * @type {ol.Collection}
     */
    this.editSource = new ol.source.Vector({
        features: new ol.Collection()
    });
    /**
     * editLayer is the layer can be edit on the map
     * @type {ol.layer.Layer}
     */
    this.editLayer = new ol.layer.Vector({
        name:"EditLayer",
        source: this.editSource,
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
        }),
        wrapX: false
    });
    /**
     * editProj is the projection of the data can be edit
     * @type {String}
     */
    this.editProj = layerEdit[0];
    /**
     * editType is the type of the data can be edit
     * @type {String}
     */
    var editType = fieldName['TypeEdit'] === 'SuggestPOI' ? 'Point': fieldName['TypeEdit'];
    /**
     * suggestPoiEdit is the marker to know the mode of edition on the map
     * @type {ol.interaction.Draw}
     */
    this.suggestPoiEdit = fieldName['TypeEdit'] === 'SuggestPOI' ? true : false;
    /**
     * selectInteract is the interaction to select a feature on the map
     * @type {ol.interaction.Select}
     */
    this.selectInteract = new ol.interaction.Select();
    /**
     * modifyInteract is the interaction to modify a feature on the map
     * @type {ol.interaction.Modify}
     */
    this.modifyInteract = new ol.interaction.Modify({
        features: this.selectInteract.getFeatures()
    });
    /**
     * drawInteract is the interaction to draw a feature on the map
     * @type {ol.interaction.Draw}
     */
    this.drawEditInteract = new ol.interaction.Draw({
        source: this.editSource,
        type: editType
    });
    /**
     * Editor Method
     * getLevel is a getter to know the editor interaction use
     * @returns {boolean}
     */
    this.getLevel = function(){
        return true;
    };
    /**
     * Editor Method
     * getEditProj is a getter to know the projection of editor data
     * @returns {String}
     */
    this.getEditProj = function(){
        return this.editProj;
    };
    /**
     * Editor Method
     * getSelectInteract is a getter to access at select editor interaction
     * @returns {*}
     */
    this.getSelectEditInteract = function () {
        return this.selectInteract;
    };
    /**
     * Editor Method
     * getSelectedEditFeatures is a getter to access at all features selected
     * @returns {*}
     */
    this.getSelectedEditFeatures = function () {
        return this.selectInteract.getFeatures();
    };
    /**
     * Editor Method
     * getModifyInteract is a getter to access at modify editor interaction
     * @returns {*}
     */
    this.getModifyEditInteract = function () {
        return this.modifyInteract;
    };
    /**
     * Editor Method
     * getDrawInteract is a getter to access at draw editor interaction
     * @returns {*}
     */
    this.getDrawEditInteraction = function () {
        return this.drawEditInteract;
    };
    /**
     * Editor Method
     * getSuggestPoiEdit is a getter to access at suggest poi editor interaction
     * @returns {*}
     */
    this.getSuggestPoiEdit = function(){
        return this.suggestPoiEdit;
    };
    /**
     * Editor Method
     * getDrawInteract is a getter to access at draw editor interaction
     * @returns {*}
     */
    this.getEditLayer = function () {
        return this.editLayer;
    };

    /**
     * Editor Method
     * initEditInteraction initialize the List of interacts to edit data
     */
    this.initEditInteraction = function (mode) {
        if(this.editAvailable !== true) {
            this.editLayer.getSource().addFeature(this.geoJSONFormat.readFeature(this.getTransformStringToGeoJSON(editData), {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: this.editProj
            }));
        }
        if(mode === 'Draw') {
            this.editInteraction.set('Select', this.getSelectEditInteract());
            this.editInteraction.set('Modify', this.getModifyEditInteract());
            this.editInteraction.set('Draw', this.getDrawEditInteraction());
            this.setActiveInteraction(null, false);
        }else if(mode === 'Suggest') {
            this.editInteraction.set('Select', this.getSelectEditInteract());
            this.editInteraction.set('Modify', this.getModifyEditInteract());
            this.setActiveInteraction(null, false);
        }
        return this.editInteraction;
    };

    /**
     * Editor METHOD
     * setActiveInteraction enable or disable editor interaction
     * @param value
     * @param active
     */
    this.setActiveInteraction = function (value, active) {
        if (value === null) {
            this.editInteraction.forEach(function (val, key) {
                val.setActive(active);
            });
        }else if((value === 'Suggest' || value === 'Act') && this.editAvailable === false) {
            this.editInteraction.get('Select').setActive(active);
            this.editInteraction.get('Modify').setActive(active);
        }else if(value === 'Act' && this.editAvailable) {
            this.editInteraction.get('Draw').setActive(active);
        }
    };

    /**
     * Editor METHOD
     * getDrawTools is a getter to access at the draw interaction
     * @param value
     * @returns {Array}
     */
    this.getEditorTools = function () {
        var listEditor = [];
        if(this.editAvailable === false) {
            listEditor.push(this.editInteraction.get('Select'));
            listEditor.push(this.editInteraction.get('Modify'));
        } else if(this.editAvailable) {
            listEditor.push(this.editInteraction.get('Draw'));
        }
        return listEditor;
    };

    /**
     * Editor METHOD
     * writeGeoJSON send all information at Lutece to insert data in the database
     * @returns {*[]}
     */
     this.writeGeoJSON = function(feature) {
         var point = getCentroid(feature.getGeometry());
         this.fieldCentroidX.value = point.getCoordinates()[0];
         this.fieldCentroidY.value = point.getCoordinates()[1];
         this.fieldData.value = this.getTransformGeoJSONToString(this.geoJSONFormat.writeFeature(feature, {
             featureProjection: projection.getProjection().getCode(),
             dataProjection: this.editProj
         }));
         this.fieldEditionStatus.value = false;
         this.editAvailable = false;
         if(this.suggestPoiEdit === false) {
             interact.setEditInteraction();
         }else{
             interact.setSuggestEditInteraction();
         }
     };

    /**
     * Editor METHOD
     * getCentroid calculate the centroid of the current geometry
     * @param geom
     * @returns {*}
     */
    function getCentroid(geom) {
        if(editType === 'Point') {
            return geom;
        }else{
            return new ol.geom.Point(ol.extent.getCenter(geom.getExtent()));
        }
    }

    /**
     * Editor METHOD
     * getTransformGeoJSONToString to formate the geoJson for Lutece
     * @param st
     * @returns {*}
     */
    this.getTransformGeoJSONToString = function(st){
        var l = st.length;
        var i;
        for(i = 0; i<l; i++){
            if(st[i]=== '"' ){
                st = st.substr(0, i) + "'" + st.substr(i+1, l);
            }
        }
        return st;
    };

     /**
     * Editor METHOD
     * getTransformStringToGeoJSON to formate the geoJson for OpenLayers
     * @param st
     * @returns {*}
     */
    this.getTransformStringToGeoJSON = function(st){
        var l = st.length;
        var i;
        for(i = 0; i<l; i++){
            if(st[i]=== "'" ){
                st = st.substr(0, i) + '"' + st.substr(i+1, l);
            }
        }
        return st;
    };

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to affect an ID at the current selection
     */
    this.getSelectedEditFeatures().on('add', function (evt) {
        var feature = evt.element;
        if (editorTools.selectInteract.getLayer(feature).get('name') === editorTools.editLayer.get('name')){
            editorTools.fieldEditionStatus.value = true;
            feature.on('change', function (evt) {
                dirty[evt.target.getId()] = true;
            });
        }else{
            editorTools.selectInteract.getFeatures().clear();
        }
    });

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to send information of the data edit
     */
    this.getSelectedEditFeatures().on('remove', function (evt) {
        var feature = evt.element;
        if (editorTools.selectInteract.getLayer(feature).get('name') === editorTools.editLayer.get('name')){
            editorTools.writeGeoJSON(feature);
        }
    });

     /**
     * Editor METHOD
     * drawEditInteract.on is a Listener to add a feature
     */
    this.drawEditInteract.on('drawend', function (evt) {
        editorTools.writeGeoJSON(evt.feature);
        interact.deleteFeatures("draw");
    });

     /**
     * Editor METHOD
     * validateEdition is the manager to run the method to actualise database
     * @returns {*}
     */
    this.addPoint = function(point) {
        if(editType === 'Point'){
            this.deleteFeature('draw');
            var feature = new ol.Feature(point);
            this.editLayer.getSource().addFeature(feature);
            this.writeGeoJSON(feature);
        }
    };

    /**
     * Editor METHOD
     * cleanEdition clean the data of the current edition
     */
    this.cleanEdition = function() {
        this.fieldData.value = '';
        this.fieldCentroidX.value = '';
        this.fieldCentroidY.value = '';
        this.fieldEditionStatus.value = false;
        this.editAvailable = true;
    };

    /**
     * Editor METHOD
     * deleteFeature delete the data of the current edition
     */
    this.deleteFeature = function (value) {
        this.getEditLayer().getSource().clear();
        this.selectInteract.getFeatures().clear();
        if(value !== "draw") {
            this.cleanEdition();
        }
    };

    /**
     * Editor METHOD
     * forceValidate force to validate current edition
     */
    this.forceValidate = function () {
        var selectFeatures = this.selectInteract.getFeatures().getArray();
        if (selectFeatures.length !== 0) {
            this.writeGeoJSON(selectFeatures[0]);
        }
        this.selectInteract.getFeatures().clear();
    };
}