/*global ol*/
/**
 * PopupForm Class define the Popup HTML
 */
var PopupForm = function(idMap) {
    'use strict';
    /**
     * PopupForm Method
     * definePopupSimpleForm define a simple popup form
     * @param key the key name to get the data
     * @param feature the layer element
     * @param keyQuery the keys reference
     * @returns {string} a line of the popup
     */
    this.definePopupSimpleForm = function(key, feature, keyQuery){
        var data = '';
        if(keyQuery === 'link'){
            data = '<p>Lien : <a href="'+ feature.get(key) +'">Détails</a></p>';
        }else {
            data = '<p>' + keyQuery + " : " + feature.get(key) + '</p>';
        }
        return data;
    };

    /**
     * PopupForm Method
     * definePopupMultiForm define a Multi Selection popup form
     * @param layer the layer name of the popup
     * @param id the identify to select the good element in the array
     * @param info the data information
     * @returns {string} a line of the popup
     */
    this.definePopupMultiForm = function(layer, id, info, evt){
        var data = '';
        var popupRef = evt.originalEvent.view.Popup;
        data = data + '<p>' + layer + ' : <a type="button" onclick="GisMapDisplay'+idMap+'.getPopup().displaySimplePopup('+id+')">' + info + '</a></p>';
        return data;
    };

    /**
     * PopupForm Method
     * displayPopupForm define the display of the popup form
     * @param overlay the container of the popup
     * @param coordinates the coordinates of the popup pointer
     * @param data the data information of the popup
     */
    this.displayPopupForm = function(overlay, coordinates, data){
        overlay.show(coordinates, '<div><h3>Informations:</h3><p>' + data + '</p></div>');
    };
};