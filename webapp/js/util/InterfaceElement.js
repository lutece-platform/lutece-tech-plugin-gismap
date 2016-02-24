/*global geoPoint, interact, editorTools, ol, app*/
/**
 * InterfaceElements Class manage all elements included in the map
 */
var InterfaceElements = function() {
    'use strict';
    this.ListElements = [];

    app.CmdControl = function(opt_options) {
        var options = opt_options || {};

        var buttonSelect = document.createElement('button');
        buttonSelect.innerHTML = 'Select';

        var buttonDrawPoint = document.createElement('button');
        buttonDrawPoint.innerHTML = 'Pt';

        var buttonDrawLine = document.createElement('button');
        buttonDrawLine.innerHTML = 'L';

        var buttonDrawPolygon = document.createElement('button');
        buttonDrawPolygon.innerHTML = 'Pn';

        var buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = 'Edit';

        var buttonRuler = document.createElement('button');
        buttonRuler.innerHTML = 'Ruler';

        var buttonMeasureLen = document.createElement('button');
        buttonMeasureLen.innerHTML = 'Len';

        var buttonMeasureArea = document.createElement('button');
        buttonMeasureArea.innerHTML = 'Area';

        var buttonGPS = document.createElement('button');
        buttonGPS.innerHTML = 'GPS';

        var handleSelect = function(e) {
            interact.setSelectInteraction();
        };

        var handleDrawPoint = function(e) {
            interact.setDrawInteraction('Point');
        };

        var handleDrawLine = function(e) {
            interact.setDrawInteraction('LineString');
        };

        var handleDrawPolygon = function(e) {
            interact.setDrawInteraction('Polygon');
        };

        var handleEdit = function(e) {
            geoPoint.manageGPS();
        };

        var handleClean = function(e) {
            interact.deleteFeatures();
        };

        var handleMeasureLen = function(e) {
            interact.setMeasureInteraction('Length');
        };

        var handleMeasureArea = function(e) {
            interact.setMeasureInteraction('Area');
        };

        var handleGPS = function(e) {
            geoPoint.manageGPS();
        };

        buttonSelect.addEventListener('click', handleSelect, false);
        buttonSelect.addEventListener('touchstart', handleSelect, false);

        buttonDrawPoint.addEventListener('click', handleDrawPoint, false);
        buttonDrawPoint.addEventListener('touchstart', handleDrawPoint, false);

        buttonDrawLine.addEventListener('click', handleDrawLine, false);
        buttonDrawLine.addEventListener('touchstart', handleDrawLine, false);

        buttonDrawPolygon.addEventListener('click', handleDrawPolygon, false);
        buttonDrawPolygon.addEventListener('touchstart', handleDrawPolygon, false);

        buttonEdit.addEventListener('click', handleEdit, false);
        buttonEdit.addEventListener('touchstart', handleEdit, false);

        buttonRuler.addEventListener('click', handleClean, false);
        buttonRuler.addEventListener('touchstart', handleClean, false);

        buttonMeasureLen.addEventListener('click', handleMeasureLen, false);
        buttonMeasureLen.addEventListener('touchstart', handleMeasureLen, false);

        buttonMeasureArea.addEventListener('click', handleMeasureArea, false);
        buttonMeasureArea.addEventListener('touchstart', handleMeasureArea, false);

        buttonGPS.addEventListener('click', handleGPS, false);
        buttonGPS.addEventListener('touchstart', handleGPS, false);

        var element = document.createElement('div');
        element.className = 'ol-unselectable ol-mycontrol';
        element.appendChild(buttonSelect);
        element.appendChild(buttonDrawPoint);
        element.appendChild(buttonDrawLine);
        element.appendChild(buttonDrawPolygon);
        element.appendChild(buttonEdit);
        element.appendChild(buttonRuler);
        element.appendChild(buttonMeasureLen);
        element.appendChild(buttonMeasureArea);
        element.appendChild(buttonGPS);

        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });

    };
    ol.inherits(app.CmdControl, ol.control.Control);

    this.getElements = function(){
        this.ListElements.push(new app.CmdControl());
        return this.ListElements;
    };
};