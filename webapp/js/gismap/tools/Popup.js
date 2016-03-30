/*global ol, GlobalMap, popup, interact*/
/**
 * Popup Class manage all popups included in the map
 */
var Popup = function(parameters) {
    'use strict';
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
     * queryLayers contains the reference of the data can be integrate in the popup
     * @type {Array}
     */
    var queryLayers = initOverlayPopupLayers(parameters);

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
     * initOverlayPopupElements initialise the reference of the data popup
     * @param parameters is the array of parameters to define popups informations
     * @returns {Array} is the array with key value of all popups
     */
    function initOverlayPopupLayers(parameters){
        var queryDataInit = [];
        for(var i = 0; i < parameters.length; i++){
            queryDataInit.push(parameters[i][0]);
        }
        return queryDataInit;
    }

    /**
     * Popup Method
     * displaySimplePopup display the simple popup with all this data
     * @param id is the identifiant of the selected elements
     */
    this.displaySimplePopup = function(id){
        overlay.hide();
        var coordinates = queries[id][0];
        var layerInfo = queries[id][1];
        var feature = queries[id][2];
        var data = '';
        var keys = feature.getKeys();
        var keysQuery = queryData[layerInfo];
        for (var j = 0; j < keys.length; j++) {
            for (var k = 0; k < keysQuery.length; k++) {
                if (keysQuery[k] === keys[j]) {
                    if(keysQuery[k] === 'link'){
                        data = data + '<p>Lien : <a href="'+ feature.get(keys[j]) +'">Détails</a></p>';
                    }else {
                        data = data + '<p>' + keysQuery[k] + " : " + feature.get(keys[j]) + '</p>';
                    }
                }
            }
        }
        overlay.show(coordinates, '<div><h3>Informations:</h3><p>' + data + '</p></div>');
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
    this.definePopup = function(evt, layerInfo, features, wmsLayers, count, id){
        var data = '';
        if(layerInfo.length === 1){
            if(count < 2) {
                queries[id] = [evt.coordinate, layerInfo, features[layerInfo+'0']];
                popup.displaySimplePopup(id);
            }else{
                for(var i = 0; i < count; i++){
                    queries[id] = [evt.coordinate, layerInfo, features[layerInfo+i]];
                    data = data + '<p>' + layerInfo + ' : <a type="button" href="#" onclick="popup.displaySimplePopup('+id+')">' +
                        features[layerInfo+i].get(queryData[layerInfo][1]) + '</a></p>';
                    id++;
                }
                overlay.show(evt.coordinate, '<div><h3>Informations:</h3><p>' + data + '</p></div>');
            }
        }else if(layerInfo.length > 1){
            for (var l = 0; l < layerInfo.length; l++) {
                if(wmsLayers[layerInfo[l]] !== null && wmsLayers[layerInfo[l]] !== undefined){
                    queries[id] = [evt.coordinate, layerInfo[l], wmsLayers[layerInfo[l]]];
                    data = data + '<p>' + layerInfo[l] + ' : <a type="button" href="#" onclick="popup.displaySimplePopup('+id+')">' +
                        wmsLayers[layerInfo[l]].get(queryData[layerInfo[l]][1]) + '</a></p>';
                    id++;
                }else{
                    for(var m = 0; m < count; m++){
                        if(features[layerInfo[l]+m] !== null && features[layerInfo[l]+m] !== undefined){
                            var queryFeature = features[layerInfo[l]+m];
                            queries[id] = [evt.coordinate, layerInfo[l], queryFeature];
                            data = data + '<p>' + layerInfo[l] + ' : <a type="button" href="#" onclick="popup.displaySimplePopup('+id+')">' +
                                queryFeature.get(queryData[layerInfo[l]][1]) + '</a></p>';
                            id++;
                        }
                    }
                }
            }
            overlay.show(evt.coordinate, '<div><h3>Informations:</h3><p>' + data + '</p></div>');
        }
    };

    /**
     * Popup Method$
     * initiatePopup catch the data and analyze it to create the popup
     * @param evt is the event catch by the listener
     */
    this.initiatePopup = function(evt){
        overlay.hide();
        queries = [];
        var layerInfo = [];
        var features = [];
        var wmsLayers = [];
        var count = 0;
        var id = 0;
        GlobalMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            if(queryData[layer.get('title')] !== null && queryData[layer.get('title')] !== undefined) {
                var unknown = true;
                for (var i = 0; i < layerInfo.length; i++) {
                    if (layerInfo[i] === layer.get('title')) {
                        unknown = false;
                    }
                }
                if (unknown === true) {
                    layerInfo.push(layer.get('title'));
                }
                features[layer.get('title')+count] = feature;
                count++;
            }
        });
        /*GlobalMap.forEachLayerAtPixel(evt.pixel, function (layer) {
            console.log(layer.getSource().getGetFeatureInfo())
            if(queryData[layer.get('title')] !== null && queryData[layer.get('title')] !== undefined) {
                var unknown = true;
                for (var i = 0; i < layerInfo.length; i++) {
                    if (layerInfo[i] === layer.get('title')) {
                        unknown = false;
                    }
                }
                if (unknown === true) {
                    layerInfo.push(layer.get('title'));
                    wmsLayers[layer.get('title')] = layer;
                }
            }
        });*/
        popup.definePopup(evt, layerInfo, features, wmsLayers, count, id);
    };

    /**
     * Popup Method
     * managePopup add or remove the overlay of the map and the listener
     * @param value is a marker to enable or disable the popup overlay and his listener
     */
    this.managePopup = function(value){
        if(value === 'off'){
            overlay.hide();
            GlobalMap.removeOverlay(overlay);
            GlobalMap.unByKey(popupKey);
        }else if(value === 'on'){
            interact.manageActiveInteraction();
            GlobalMap.addOverlay(overlay);
            popupKey = GlobalMap.on('singleclick', function(evt){popup.initiatePopup(evt);});
        }
    };
};