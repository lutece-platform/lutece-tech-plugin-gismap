/*global ol, PopupForm*/
/**
 * Popup Class manage all popups included in the map
 * isEditLayerPopupOnInfo : should the features of the editLayer trigger a popup in info mode
 */
var Popup = function(GlobalMap, idMap, parameters, isEditLayerPopupOnInfo) {
    'use strict';
    /**
     * popupForm is the reference of the form of the Popup
     * @type {PopupForm}
     */
    var popupForm = new PopupForm(idMap);

    /**
     * interact stock a reference of the current interact of the map
     * @type {Interaction}
     */
    var interact = null;

    /**
     * queries stock the value to display data in the popup
     * @type {Array}
     */
    var queries = [];
    /**
     * popupKey is the key of the listener to add and remove it of the map
     * @type {string}
     */
    var popupKey = '';
	
	/**
     * cursorChangeKey is the key of the listener to change the cursor when hovering features
     * @type {string}
     */
	var cursorChangeKey = '';
    /**
     * overlay is the overlay of the popup
     * @type {ol.Overlay.Popup}
     */
    var overlay = new ol.Overlay.Popup();
    /**
     * queryData contains the reference of the data can be integrate in the popup
     * @type {Array}
     */
    var queryData = initOverlayPopupElements(parameters);
    /**
     * dataJson is the value get on the wms request
     * @type {null}
     */
    var dataJson = null;
    /**
     * geoJSONFormat define the format GeoJSON
     * @type {ol.format.GeoJSON}
     */
    var geoJsonFormat = new ol.format.GeoJSON();
    /**
     * esrijsonFormat define the format EsriJSON
     * @type {ol.format.EsriJSON}
     */
    var esriJsonFormat = new ol.format.EsriJSON();

    /**
     * Popup Method
     * setInteract is a setter to define the interact reference
     * @param newInteract
     */
    var setInteract = function(newInteract){
        interact = newInteract;
    };

    /**
     * Popup Method
     * initOverlayPopupElements initialise the reference of the data popup
     * @param parameters is the array of parameters to define popups informations
     * @returns {Array} is the array with key value of all popups
     */
    function initOverlayPopupElements(parameters){
        var queryDataInit = [];
        for(var i = 0; i < parameters.length; i++){
            queryDataInit[parameters[i][0]] = parameters[i][1];
        }
        return queryDataInit;
    }

    /**
     * Popup Method
     * displaySimplePopup display the simple popup with all this data
     * @param id is the identifiant of the selected elements
     */
    var displaySimplePopup = function(id){
        overlay.hide();
        var coordinates = queries[id][0];
        var layerInfo = queries[id][1];
        var feature = queries[id][2];
        var data = '';
        var keys = feature.getKeys();
        var keysQuery = queryData[layerInfo];
        for (var k = 0; k < keysQuery.length; k++) {
        	for (var j = 0; j < keys.length; j++) {
                if (keysQuery[k] === keys[j]) {
                    data = data + popupForm.definePopupSimpleForm(keys[j], feature, keysQuery[k]);
                }
            }
        }
        popupForm.displayPopupForm(overlay, coordinates, data);
    };

    /**
     * Popup Method
     * definePopup create the popup in function of the data select
     * @param evt is the event catch by the listener
     * @param layerInfo is an array to contains all names of layers catch
     * @param features is an array to contains all features catch
     * @param wmsLayers is an array to contains all wms layers catch
     * @param count is the count of the features
     * @param id is the max of element into the queries array
     */
    function definePopup(evt, layerInfo, features, wmsLayers, count, id){
        var data = '';
        if(layerInfo.length === 1){
            if(count < 2) {
                if(features[layerInfo+'0'] !== undefined) {
                    queries[id] = [evt.coordinate, layerInfo, features[layerInfo + '0']];
                    displaySimplePopup(id);
                }else{
                    var url = wmsLayers[layerInfo].getSource().getGetFeatureInfoUrl(evt.coordinate,
                        GlobalMap.getView().getResolution(),
                        GlobalMap.getView().getProjection(),
                        {'INFO_FORMAT': 'text/javascript'});
                    $.ajax({
                        url: url,
                        dataType: 'jsonp',
                        jsonpCallback: 'parseResponse',
                        success: function (data) {
                            if(dataJson === null) {
                                dataJson = data;
                                setTimeout(definePopup(evt, layerInfo, features, wmsLayers, count, id), 1000);
                            }
                        }
                    });
                    if(dataJson !== null) {
                        var feature;
                        if (wmsLayers[layerInfo].getSource().coordKeyPrefix_.indexOf('geoserver') > -1) {
                            feature = geoJsonFormat.readFeatures(dataJson)[0];
                        }else{
                            feature = esriJsonFormat.readFeatures(dataJson)[0];
                        }
                        queries[id] = [evt.coordinate, layerInfo, feature];
                        displaySimplePopup(id);
                    }
                }
            }else{
                for(var i = 0; i < count; i++){
                    queries[id] = [evt.coordinate, layerInfo, features[layerInfo+i]];
                    data = data + popupForm.definePopupMultiForm(layerInfo, id, features[layerInfo+i].get(queryData[layerInfo][1]), evt);
                    id++;
                }
                popupForm.displayPopupForm(overlay, evt.coordinate, data);
            }
        }else if(layerInfo.length > 1){
            for (var l = 0; l < layerInfo.length; l++) {
                if(wmsLayers[layerInfo[l]] !== null && wmsLayers[layerInfo[l]] !== undefined){
                    var urlWms = wmsLayers[layerInfo[l]].getSource().getGetFeatureInfoUrl(evt.coordinate,
                        GlobalMap.getView().getResolution(),
                        GlobalMap.getView().getProjection(),
                        {'INFO_FORMAT': 'text/javascript'});
                    $.ajax({
                        url: urlWms,
                        dataType: 'jsonp',
                        jsonpCallback: 'parseResponse',
                        success: function (data) {
                            if(dataJson === null) {
                                dataJson = data;
                                setTimeout(definePopup(evt, layerInfo, features, wmsLayers, count, id), 1000);
                            }
                        }
                    });
                    if(dataJson !== null) {
                        var featureWms;
                        if (wmsLayers[layerInfo[l]].getSource().coordKeyPrefix_.indexOf('geoserver') > -1) {
                            featureWms = geoJsonFormat.readFeatures(dataJson)[0];
                        }else{
                            featureWms = esriJsonFormat.readFeatures(dataJson)[0];
                        }
                        queries[id] = [evt.coordinate, layerInfo, featureWms];
                        queries[id] = [evt.coordinate, layerInfo[l], featureWms];
                        data = data + popupForm.definePopupMultiForm(layerInfo[l], id, featureWms.get(queryData[layerInfo[l]][1]), evt);
                        id++;
                    }
                }else{
                    for(var m = 0; m < count; m++){
                        if(features[layerInfo[l]+m] !== null && features[layerInfo[l]+m] !== undefined){
                            var queryFeature = features[layerInfo[l]+m];
                            queries[id] = [evt.coordinate, layerInfo[l], queryFeature];
                            data = data + popupForm.definePopupMultiForm(layerInfo[l], id, queryFeature.get(queryData[layerInfo[l]][1]), evt);
                            id++;
                        }
                    }
                }
            }
            popupForm.displayPopupForm(overlay, evt.coordinate, data);
        }
    }

    /**
     * Popup Method$
     * initiatePopup catch the data and analyze it to create the popup
     * @param evt is the event catch by the listener
     */
    function initiatePopup(evt){
        overlay.hide();
        queries = [];
        var layerInfo = [];
        var features = [];
        var wmsLayers = [];
        var count = 0;
        var id = 0;
        dataJson = null;
        GlobalMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            if(layer !== null) {
                var layer_title = layer.get('title');
                if (layer_title == "EditLayer" && !isEditLayerPopupOnInfo) {
                    layer_title = undefined;
                }
                if (queryData[layer_title] !== null && queryData[layer_title] !== undefined) {
                    var unknown = true;
                    for (var i = 0; i < layerInfo.length; i++) {
                        if (layerInfo[i] === layer_title) {
                            unknown = false;
                        }
                    }
                    if (unknown === true) {
                        layerInfo.push(layer_title);
                    }
                    features[layer_title + count] = feature;
                    count++;
                }
            }
        });
        GlobalMap.forEachLayerAtPixel(evt.pixel, function (layer) {
            var layer_title = layer.get('title');
            if (layer_title == "EditLayer" && !isEditLayerPopupOnInfo) {
                layer_title = undefined;
            }
            if(queryData[layer_title] !== null && queryData[layer_title] !== undefined) {
                var unknown = true;
                for (var i = 0; i < layerInfo.length; i++) {
                    if (layerInfo[i] === layer_title) {
                        unknown = false;
                    }
                }
                if (unknown === true) {
                    layerInfo.push(layer_title);
                    wmsLayers[layer_title] = layer;
                }
            }
        });
        definePopup(evt, layerInfo, features, wmsLayers, count, id);
    }

	/**
     * Popup Method
     * changeCursor modify the cursor when hovering a feature that is not part of the Edit layer
     * @param evt the event triggered by the caller
     */
	function changeCursor (evt) {
				if (evt.dragging) { return;}
				var pixel = GlobalMap.getEventPixel(evt.originalEvent);
				var hit = GlobalMap.hasFeatureAtPixel(pixel, {layerFilter: function(layer){
					return isEditLayerPopupOnInfo || layer.get('name') !== 'EditLayer';
				}});
				GlobalMap.getTargetElement().style.cursor = hit ? 'pointer' : '';

	}
    /**
     * Popup Method
     * managePopup add or remove the overlay of the map and the listener
     * @param value is a marker to enable or disable the popup overlay and his listener
     */
    var managePopup = function(value){
        if(value === 'off'){
            overlay.hide();
            GlobalMap.removeOverlay(overlay);
            ol.Observable.unByKey(popupKey);
			ol.Observable.unByKey(cursorChangeKey);
        }else if(value === 'on'){
            interact.manageActiveInteraction();
            GlobalMap.addOverlay(overlay);			
			// change mouse cursor when over marker
			cursorChangeKey = GlobalMap.on('pointermove', function(evt) {changeCursor(evt)});			
            popupKey = GlobalMap.on('singleclick', function(evt){initiatePopup(evt);});
        }
    };

    return{
        displaySimplePopup: displaySimplePopup,
        managePopup: managePopup,
        setInteract: setInteract
    };
};