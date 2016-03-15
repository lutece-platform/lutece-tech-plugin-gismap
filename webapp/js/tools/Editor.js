/*global ol, alert, Map, projection, GlobalMap, interact*/

/**
 * Editor Class manage all Edition of data on the map
 */
function Editor(layerEdit, fieldName) {
    'use strict';
    var thisEditor = this;
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
    var editSource = this.fieldData.value;
    /**
     * editAvailable is the marker to expose the editable data of the map
     * @type {boolean}
     */
    this.editAvailable = editSource === '' ? true : false;
    /**
     * editLayer is the layer can be edit on the map
     * @type {ol.layer.Layer}
     */
    var editLayer = new ol.layer.Vector({
        name:"EditLayer",
        source: new ol.source.Vector()
    });
    /**
     * editProj is the projection of the data can be edit
     * @type {String}
     */
    var editProj = layerEdit[0];
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
        source: editLayer.getSource(),
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
        return editLayer;
    };

    /**
     * Editor Method
     * initEditInteraction initialize the List of interacts to edit data
     */
    this.initEditInteraction = function (mode) {
        if(this.editAvailable !== true) {
            editLayer.getSource().addFeatures(this.geoJSONFormat.readFeatures(editSource));
        }
        if(mode === 'Draw') {
            this.editInteraction.set('Select', this.getSelectEditInteract());
            this.editInteraction.set('Modify', this.getModifyEditInteract());
            this.editInteraction.set('Draw', this.getDrawEditInteraction());
            this.setActiveInteraction(null, false);
        }else if(mode === 'Suggest') {
            /* Lignes à décommenter pour le géocodage inverse
            this.editInteraction.set('Select', this.getSelectEditInteract());
            this.editInteraction.set('Modify', this.getModifyEditInteract());*/
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
        }else if(value === 'Act' && this.editAvailable === false) {
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
        console.log(this.editAvailable)
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
     this.writeGeoJSON = function(feature){
        var point = getCentroid(feature.getGeometry());
        this.fieldCentroidX.value = point.getCoordinates()[0];
        this.fieldCentroidY.value = point.getCoordinates()[1];
        this.fieldData.value = this.geoJSONFormat.writeFeature(feature, {
            featureProjection: projection.getProjection().getCode(),
            dataProjection: editProj
        });
        this.fieldEditionStatus.value = false;
        this.editAvailable = false;
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
     * getSelectedEditFeatures().on is a Listener to affect an ID at the current selection
     */
    this.getSelectedEditFeatures().on('add', function (evt) {
        thisEditor.fieldEditionStatus.value = true;
        var feature = evt.element;
        feature.on('change', function (evt) {
            dirty[evt.target.getId()] = true;
        });
    });

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to send information of the data edit
     */
    this.getSelectedEditFeatures().on('remove', function (evt) {
        thisEditor.writeGeoJSON(evt.element);
        thisEditor.getEditorTools();
        thisEditor.setActiveInteraction('Act', true);
    });

    /**
     * Editor METHOD
     * drawEditInteract.on is a Listener to add a feature
     */
    this.drawEditInteract.on('drawend', function (evt) {
        thisEditor.writeGeoJSON(evt.feature);
        thisEditor.getEditorTools();
        thisEditor.setActiveInteraction('Act', true);
    });

     /**
     * Editor METHOD
     * validateEdition is the manager to run the method to actualise database
     * @returns {*}
     */
    this.addPoint = function(point) {
        if(editType === 'Point'){
            var feature = new ol.Feature(point);
            editLayer.getSource().addFeature(feature);
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

    this.deleteFeature = function () {
        var selectFeatures = this.selectInteract.getFeatures();
        if (selectFeatures.length !== 0) {
            this.selectInteract.getFeatures().clear();
            this.getEditLayer().getSource().clear();
            this.cleanEdition();
        }
    };
}