/*global geoPoint*/
/**
 * InterfaceElements Class manage all elements included in the map
 */
var InterfaceElements = function() {
    'use strict';
    this.buttonGPS = document.createElement('button');
    this.buttonGPS.innerHTML = 'GPS';
    this.buttonGPS.addEventListener('click', geoPoint.manageGPS());
};