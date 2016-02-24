/*global ol*/
/**
 * Popup Class manage all popups included in the map
 */
var Popup = function() {
    'use strict';
    this.ListElements = [];


    this.getElements = function(){
        return this.ListElements;
    };
};