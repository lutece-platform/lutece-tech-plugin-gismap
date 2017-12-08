/*global ol, alert, Map, */

/**
 * Editor Class manage all Edition of data on the map
 */
function Editor(interact, layerEdit, fieldName, projection) {
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
	
	this.getFieldData = function() {
		return this.fieldData;
	}
    /**
     * fieldCentroidXStockage is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidXStockage = document.getElementById(fieldName['GeomCentroidXStockage']);
    /**
     * fieldCentroidYStockage is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidYStockage = document.getElementById(fieldName['GeomCentroidYStockage']);
    /**
     * fieldCentroidXGeocodage is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidXGeocodage = document.getElementById(fieldName['GeomCentroidXGeocodage']);
    /**
     * fieldCentroidYGeocodage is the field where we stock centroid value
     * @type {Element}
     */
    this.fieldCentroidYGeocodage = document.getElementById(fieldName['GeomCentroidYGeocodage']);
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
     * @type {ol.layer.Vector}
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
    this.editProj = layerEdit;
    /**
     * editType is the type of the data can be edit
     * @type {String}
     */
    var editType = fieldName['TypeEdit'] === 'SuggestPOI'  ? 'Point' : fieldName['TypeEdit'] === 'ReadOnly' ?
        JSON.parse(getTransformStringToGeoJSON(editData))['geometry']['type'] : fieldName['TypeEdit'];
    /**
     * suggestPoiEdit is the marker to know the mode of edition on the map
     * @type {Boolean}
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
     * suggestSelect is a marker to set the selection after SuggestPOI creation
     * @type {boolean}
     */
    this.suggestSelect = false;
    /**
     * Editor Method
     * getSuggestSelect is a getter to access at the value of the marker
     * @returns {boolean} the value of the marker
     */
	this.getSuggestSelect = function(){
		return this.suggestSelect;
	};
    /**
     * Editor Method
     * setSuggestSelect is a setter to change the value of the marker
     * @param value the new value of the marker
     */
	this.setSuggestSelect = function(value){
		this.suggestSelect = value;
	};
    /**
     * Editor Method
     * getEditProj is a getter to know the projection of editor data
     * @returns {String} the edit projection code
     */
    this.getEditProj = function(){
        return this.editProj;
    };
    /**
     * Editor Method
     * getSelectInteract is a getter to access at select editor interaction
     * @returns {ol.interaction.Select} the select interaction
     */
    this.getSelectEditInteract = function () {
        return this.selectInteract;
    };
    /**
     * Editor Method
     * getSelectedEditFeatures is a getter to access at all features selected
     * @returns {*} all selected features of edit layer
     */
    this.getSelectedEditFeatures = function () {
        return this.selectInteract.getFeatures();
    };
    /**
     * Editor Method
     * getModifyInteract is a getter to access at modify editor interaction
     * @returns {ol.interaction.Modify} the modify interaction
     */
    this.getModifyEditInteract = function () {
        return this.modifyInteract;
    };
    /**
     * Editor Method
     * getDrawEditInteraction is a getter to access at draw editor interaction
     * @returns {ol.interaction.Draw} the draw interaction
     */
    this.getDrawEditInteraction = function () {
        return this.drawEditInteract;
    };
    /**
     * Editor Method
     * getSuggestPoiEdit is a getter to access at suggest poi editor interaction
     * @returns {*} the marker to indicate the suggestPoiEdit activation
     */
    this.getSuggestPoiEdit = function(){
        return this.suggestPoiEdit;
    };
    /**
     * Editor Method
     * getEditLayer is a getter to access at draw editor interaction
     * @returns {ol.layer.Layer} the edit layer
     */
    this.getEditLayer = function () {
        return this.editLayer;
    };


    /**
     * Editor Method
     * initEditInteraction initialize the List of interacts to edit data
     * @param mode is the marker to indicate the edit mode
     * @returns {Map}a map with all editor interaction
     */
    this.initEditInteraction = function (mode) {
        if(this.editAvailable !== true) {
			var editFeature = this.geoJSONFormat.readFeature(getTransformStringToGeoJSON(editData), {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: this.editProj
            });
			//assign an Id to the edit feature
			editFeature.setId(Date.now());
            this.editLayer.getSource().addFeature(editFeature);
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
     * @param value is the type of editor mode
     * @param active is the marker to indicate activation
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
     * getEditorTools is a getter to access at the draw interaction
     * @returns {Array} a map with all editor interaction
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
     * @param feature is the new feature
     */
     this.writeGeoJSON = function(feature) {
         this.fieldData.value = getTransformGeoJSONToString(this.geoJSONFormat.writeFeature(feature, {
             featureProjection: projection.getProjection().getCode(),
             dataProjection: this.editProj
         }));

         this.managePoint(feature);
		 
		//Trigger a Change event on the geometry field
		 var geometryFieldName = fieldName['GeomGeoJson'];
		 $("#"+geometryFieldName).change();

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
     * managePoint manage all information about the centroid of the current geometry
     * @param feature is the new feature
     */
    this.managePoint = function(feature){
        /*Lambert 93*/
        var pointL93 = getCentroid(feature.getGeometry());
        pointL93.transform(projection.getProjection().getCode(), projection.getEpsgData('EPSG:2154', false)[0].getCode());
        this.fieldCentroidXGeocodage.value = pointL93.getCoordinates()[0];
        this.fieldCentroidYGeocodage.value = pointL93.getCoordinates()[1];
        /*WGS 84*/
        var pointWGS84 = getCentroid(feature.getGeometry());
        pointWGS84.transform(projection.getProjection().getCode(), this.editProj);
        this.fieldCentroidXStockage.value = pointWGS84.getCoordinates()[0];
        this.fieldCentroidYStockage.value = pointWGS84.getCoordinates()[1];
    };

    /**
     * Editor METHOD
     * getCentroid calculate the centroid of the current geometry
     * @param geom is the origin geometry
     * @returns {ol.geom.Point}
     */
    function getCentroid(geom) {
        return new ol.geom.Point(ol.extent.getCenter(geom.getExtent()));
    }

    /**
     * Editor METHOD
     * getTransformGeoJSONToString to formate the geoJson for Lutece
     * @param st is the initial string to formate
     * @returns {string} is the formated string
     */
    function getTransformGeoJSONToString(st){
        var l = st.length;
        var i;
        for(i = 0; i<l; i++){
            if(st[i]=== '"' ){
                st = st.substr(0, i) + "'" + st.substr(i+1, l);
            }
        }
        return st;
    }

     /**
     * Editor METHOD
     * getTransformStringToGeoJSON to formate the geoJson for OpenLayers
     * @param st is the initial string to formate
     * @returns {string} is the formated string
     */
    function getTransformStringToGeoJSON(st){
        var l = st.length;
        var i;
        for(i = 0; i<l; i++){
            if(st[i]=== "'" ){
                st = st.substr(0, i) + '"' + st.substr(i+1, l);
            }
        }
        return st;
    }

    /**
     * Editor METHOD
     * getTransformData accessor to formate the geoJson for OpenLayers
     * @param st is the initial string to formate
     * @returns {string} is the formated string
     */
    this.getTransformData = function(st){
        return getTransformStringToGeoJSON(st);
    };

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to affect an ID at the current selection
     */
    this.getSelectedEditFeatures().on('add', function (evt) {
        var feature = evt.element;
		var isEdit;
		if (feature.getId() !== undefined){
			isEdit= interact.getEditor().editLayer.getSource().getFeatureById(feature.getId());
		}		
        if (interact.getEditor().getSuggestSelect() || isEdit!== undefined ){
            interact.getEditor().fieldEditionStatus.value = true;
            feature.on('change', function (evt) {
                dirty[evt.target.getId()] = true;
            });
        }else{
            interact.getEditor().selectInteract.getFeatures().clear();
        }
    });

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to send information of the data edit
     */
    this.getSelectedEditFeatures().on('remove', function (evt) {
        var feature = evt.element;	
		var isEdit;
		if (feature.getId() !== undefined){
			isEdit= interact.getEditor().editLayer.getSource().getFeatureById(feature.getId());
		}	
        if (interact.getEditor().getSuggestSelect() || isEdit !== undefined){
			interact.getEditor().setSuggestSelect(false);
            interact.getEditor().writeGeoJSON(feature);
        }
    });


     /**
     * Editor METHOD
     * drawEditInteract.on is a Listener to add a feature
     */
    this.drawEditInteract.on('drawend', function (evt) {
		evt.feature.setId(Date.now());
        interact.getEditor().writeGeoJSON(evt.feature);
        interact.deleteFeatures("draw");
    });

     /**
     * Editor METHOD
     * validateEdition is the manager to run the method to actualise database
     * @param point is the geometry of the new feature
     */
    this.addPoint = function(point) {
        if(editType === 'Point'){
            this.deleteFeature('draw');
            var feature = new ol.Feature(point);
			feature.setId(Date.now());
            this.editLayer.getSource().addFeature(feature);
            this.writeGeoJSON(feature);
            this.suggestSelect = true;
            this.selectInteract.getFeatures().push(this.editLayer.getSource().getFeatures()[0]);
        }
    };

    /**
     * Editor METHOD
     * cleanEdition clean the data of the current edition
     */
    this.cleanEdition = function() {
        this.fieldData.value = '';
        this.fieldCentroidXStockage.value = '';
        this.fieldCentroidYStockage.value = '';
        this.fieldCentroidXGeocodage.value = '';
        this.fieldCentroidYGeocodage.value = '';
        this.fieldEditionStatus.value = false;
        this.editAvailable = true;
    };

    /**
     * Editor METHOD
     * deleteFeature delete the data of the current edition
     * @param value is a marker to indicate the process
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
            var selectFeaturesAuth = selectFeatures[0];
            this.writeGeoJSON(selectFeatures[0]);
            //this.selectInteract.getFeatures().push(selectFeaturesAuth);
			this.selectInteract.getFeatures().clear();
        }
        //this.selectInteract.getFeatures().clear();
    };
}
