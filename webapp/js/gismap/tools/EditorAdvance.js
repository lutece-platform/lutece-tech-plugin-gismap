/*global ol, Map, featureLayer, projection, GlobalMap*/

/**
 * EditorAdvance Class manage all advance Edition of data on the map
 */
function EditorAdvance(layerEdit) {
    'use strict';
    /**
     * editInteraction is the map to stock all edit interaction
     * @type {Map}
     */
    this.editInteraction = new Map();
    /**
     * dirty is an array to stock the information of the edit feature
     * @type {{}}
     */
    var dirty = {};
    /**
     * editServer is an id to know the server provide the data to be edit
     * @type {String}
     */
    var editServer = layerEdit[0];
    /**
     * editLayer is the layer can be edit on the map
     * @type {ol.layer.Layer}
     */
    var editLayer = featureLayer.getFeatureByName(layerEdit[1]);
    /**
     * editUrl is an url to access at the data to be edit
     * @type {String}
     */
    var editUrl = layerEdit[2];
    /**
     * editProj is the projection of the data can be edit
     * @type {String}
     */
    var editProj = layerEdit[3];
    /**
     * editType is the type of the data can be edit
     * @type {String}
     */
    var editType = layerEdit[4];
    /**
     * esriJSONFormat is the format to write on the esri data
     * @type {ol.format.EsriJSON}
     */
    var esriJSONFormat = new ol.format.EsriJSON();
    /**
     * geoJSONFormat is the format to write on the GeoJSON data
     * @type {ol.format.GeoJSON}
     */
    var geoJSONFormat = new ol.format.GeoJSON();
    /**
     * formatWFS is the format to write on the geoserver
     * @type {ol.format.WFS}
     */
    var formatWFS = new ol.format.WFS({featureNS:"Mairie",
            featureType:'arrondissements',
            schemaLocation:"http://www.opengis.net/wfs \ http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd \ http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=Mairie:arrondissements"});
    /**
     * formatGML is the format to write on the geoserver
     * @type {ol.format.GML}
     */
    var formatGML = new ol.format.GML({
        featureNS: layerEdit[1].split(':')[0],
        featureType: layerEdit[1],//.split(':')[1],
        srsName: editProj
    });
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
     * editAction contains the current edition
     * @type {Array}
     */
    var editAction = [];


    /**
     * Editor Method
     * getLevel is a getter to know the editor interaction use
     * @returns {boolean}
     */
    this.getLevel = function(){
        return false;
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
    this.initEditInteraction = function () {
        this.editInteraction.set('Select', this.getSelectEditInteract());
        this.editInteraction.set('Modify', this.getModifyEditInteract());
        this.editInteraction.set('Draw', this.getDrawEditInteraction());
        this.setActiveInteraction(null, false);
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
                val.setActive(false);
            });
        } else if (value === 'Edit') {
            this.editInteraction.get('Select').setActive(active);
            this.editInteraction.get('Modify').setActive(active);
        } else if (value === 'Add') {
            this.editInteraction.get('Draw').setActive(active);
        }
    };

    /**
     * Editor METHOD
     * getDrawTools is a getter to access at the draw interaction
     * @param value
     * @returns {Array}
     */
    this.getEditorTools = function (value) {
        var listEditor = [];
        if (value === 'Edit') {
            listEditor.push(this.editInteraction.get('Select'));
            listEditor.push(this.editInteraction.get('Modify'));
        } else if (value === 'Add') {
            listEditor.push(this.editInteraction.get('Draw'));
        }
        return listEditor;
    };

    /**
     * Editor METHOD
     * getSelectedEditFeatures().on is a Listener to affect an ID at the current selection
     */
    this.getSelectedEditFeatures().on('add', function (evt) {
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
        editAction.push('Modify');
        editAction.push(evt.element);
    });

    /**
     * Editor METHOD
     * drawEditInteract.on is a Listener to add a feature
     */
    this.drawEditInteract.on('drawend', function (evt) {
        editAction.push('Add');
        editAction.push(evt.feature);
    });

    /**
     * Editor METHOD
     * getCentroid calculate the centroid of the current geometry
     * @param geom
     * @returns {*}
     */
    this.getCentroid = function(geom) {
        if(editType === 'Point') {
            return geom;
        }else{
            return new ol.geom.Point(ol.extent.getCenter(geom.getExtent()));
        }
    };

    /**
     * Editor METHOD
     * restartEdition clean the table of the current edition
     */
    this.restartEdition = function() {
        editAction = [];
    };

    /**
     * Editor METHOD
     * writeGeoJSON send all information at Lutece to insert data in the database
     * @returns {*[]}
     */
    this.writeGeoJSON = function(){
        var centroidFeature = this.getCentroid(editAction[1].getGeometry());
        var centroidFeatureGeoJSON = geoJSONFormat.writeGeometry(centroidFeature, {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: editProj
        });
        var geojsonDataEdit = geoJSONFormat.writeFeature(editAction[1], {
                featureProjection: projection.getProjection().getCode(),
                dataProjection: editProj
        });
        this.restartEdition();
        return [null, geojsonDataEdit, centroidFeatureGeoJSON];
    };

    /**
     * Editor METHOD
     * writeGeoServer send all information at lutece and insert the geometry in the database by GeoServer
     * @returns {null[]}
     */
    this.writeGeoServer = function(){
        /* This method isn't finalize
        var feature = editAction[1];
        var geom;
        if(editAction[0] === 'Add') {
            geom = formatWFS.writeTransaction([feature], null, null, formatGML);
        }else{
            geom = formatWFS.writeTransaction(null,[feature],null, formatGML);
        }
        var s = new XMLSerializer();
        var str = s.serializeToString(geom);
        $.ajax({
            url: editUrl,
            origin: 'http://localhost:63342',
            type: 'POST',
            contentType: 'text/xml',
            data: str
        }).done();
        this.restartEdition();
        return [feature.getId(), null, null];*/
    };

    /**
     * Editor METHOD
     * writeArcGISServer send all information at lutece and insert the geometry in the database by ArcGIS Server
     * @returns {null[]}
     */
    this.writeArcGISServer = function(){
        if(editAction[0] === 'Add') {
            var feature = editAction[1];
            var payload = '[' + esriJSONFormat.writeFeature(feature, {
                    featureProjection: projection.getProjection().getCode(),
                    dataProjection: editProj
                }) + ']';
            var url = editUrl + '/addFeatures';
            $.post(url, {f: 'json', features: payload}).done(function (data) {
                var result = JSON.parse(data);
                if (result.addResults && result.addResults.length > 0) {
                    if (result.addResults[0].success === true) {
                        var fid = result.addResults[0]['objectId'];
                        feature.setId(fid);
                        editLayer.getSource().clear();
                        this.restartEdition();
                        return [fid, null, null];
                    }
                }
            });
        }else if(editAction[0] === 'Modify'){
            var featureEdit = editAction[1];
            var fid = featureEdit.getId();
            if (editServer === 'AGS') {
                if (dirty[fid] === true) {
                    var payloadEdit = '[' + esriJSONFormat.writeFeature(featureEdit, {
                            featureProjection: projection.getProjection().getCode(),
                            dataProjection: editProj
                        }) + ']';
                    var urlEdit = editUrl + '/updateFeatures';
                    $.post(urlEdit, {f: 'json', features: payloadEdit}).done(function (data) {
                        var result = JSON.parse(data);
                        if (result.updateResults && result.updateResults.length > 0) {
                            if (result.updateResults[0].success === true) {
                                delete dirty[fid];
                                this.restartEdition();
                                return [fid, null, null];
                            }
                        }
                    });
                }
            }
        }
    };

     /**
     * Editor METHOD
     * validateEdition is the manager to run the method to actualise database
     * @returns {*}
     */
    this.validateEdition = function() {
        if(editServer === 'GeoJSON'){
            return this.writeGeoJSON();
        }else if(editServer === 'GeoServer'){
            return this.writeGeoServer();
        }else if (editServer === 'AGS') {
            return this.writeArcGISServer();
        }
    };

    /**
     * Editor METHOD
     * validateEdition is the manager to run the method to actualise database
     * @returns {*}
     */
    this.addPoint = function(point) {
        if(editType === 'Point'){
            var feature = new ol.Feature(point);
            editLayer.getSource().addFeature(feature);
        }
    };
}