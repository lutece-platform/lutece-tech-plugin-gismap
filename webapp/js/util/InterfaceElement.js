/*global geoPoint, interact, ol, app*/
/**
 * InterfaceElements Class manage all elements included in the map
 */
var InterfaceElements = function(parameters) {
    'use strict';
    this.ListElements = [];
    app.CmdControl = function(parameters, opt_options) {
        var options = opt_options || {};
        var element = document.createElement('div');
        var rulerActive = false;
        element.className = 'ol-unselectable ol-mycontrol';
        for (var i = 0; i < parameters['Interacts'].length; i++) {
            /*if (parameters['Interacts'][i] === "SuggestPOISearch") {
                var suggestPoiText = document.createElement('text');
                suggestPoiText.innerHTML = 'Pt';
                var handleSuggestPoiText = function (e) {
                    interact.setDrawInteraction('Point');
                };
                suggestPoiText.addEventListener('touchstart', handleSuggestPoiText, false);
                element.appendChild(suggestPoiText);
            }*/
            if (parameters['Interacts'][i] === "Draw") {
                var buttonDrawPoint = document.createElement('button');
                buttonDrawPoint.innerHTML = 'Pt';
                var buttonDrawLine = document.createElement('button');
                buttonDrawLine.innerHTML = 'L';
                var buttonDrawPolygon = document.createElement('button');
                buttonDrawPolygon.innerHTML = 'Pn';
                var handleDrawPoint = function (e) {
                    interact.setDrawInteraction('Point');
                };
                var handleDrawLine = function (e) {
                    interact.setDrawInteraction('LineString');
                };
                var handleDrawPolygon = function (e) {
                    interact.setDrawInteraction('Polygon');
                };
                buttonDrawPoint.addEventListener('click', handleDrawPoint, false);
                buttonDrawPoint.addEventListener('touchstart', handleDrawPoint, false);
                buttonDrawLine.addEventListener('click', handleDrawLine, false);
                buttonDrawLine.addEventListener('touchstart', handleDrawLine, false);
                buttonDrawPolygon.addEventListener('click', handleDrawPolygon, false);
                buttonDrawPolygon.addEventListener('touchstart', handleDrawPolygon, false);
                element.appendChild(buttonDrawPoint);
                element.appendChild(buttonDrawLine);
                element.appendChild(buttonDrawPolygon);
            }
            if (parameters['Interacts'][i] === 'Measure') {
                var buttonMeasureLen = document.createElement('button');
                buttonMeasureLen.innerHTML = 'Len';
                var buttonMeasureArea = document.createElement('button');
                buttonMeasureArea.innerHTML = 'Area';
                var handleMeasureLen = function (e) {
                    interact.setMeasureInteraction('Length');
                };
                var handleMeasureArea = function (e) {
                    interact.setMeasureInteraction('Area');
                };
                buttonMeasureLen.addEventListener('click', handleMeasureLen, false);
                buttonMeasureLen.addEventListener('touchstart', handleMeasureLen, false);
                buttonMeasureArea.addEventListener('click', handleMeasureArea, false);
                buttonMeasureArea.addEventListener('touchstart', handleMeasureArea, false);
                element.appendChild(buttonMeasureLen);
                element.appendChild(buttonMeasureArea);
            }
            if (parameters['Interacts'][i] === 'Edit') {
                var buttonEdit = document.createElement('button');
                buttonEdit.innerHTML = 'Edit';
                var handleEdit = function (e) {
                    interact.setEditInteraction('Edit');
                };
                buttonEdit.addEventListener('click', handleEdit, false);
                buttonEdit.addEventListener('touchstart', handleEdit, false);
                element.appendChild(buttonEdit);
            }
            if (parameters['Interacts'][i] === 'Select') {
                var buttonSelect = document.createElement('button');
                buttonSelect.innerHTML = 'Select';
                var handleSelect = function (e) {
                    interact.setSelectInteraction();
                };
                buttonSelect.addEventListener('click', handleSelect, false);
                buttonSelect.addEventListener('touchstart', handleSelect, false);
                element.appendChild(buttonSelect);
            }
            if (parameters['Interacts'][i] === 'GPS') {
                var buttonGPS = document.createElement('button');
                buttonGPS.innerHTML = 'GPS';
                var handleGPS = function (e) {
                    geoPoint.manageGPS();
                };
                buttonGPS.addEventListener('click', handleGPS, false);
                buttonGPS.addEventListener('touchstart', handleGPS, false);
                element.appendChild(buttonGPS);
            }
            if (parameters['Interacts'][i] === 'Draw' || parameters['Interacts'][i] === 'Measure'|| parameters['Interacts'][i] === 'Edit'|| parameters['Interacts'][i] === 'AutoEdit'){
                if(rulerActive === false) {
                    var buttonRuler = document.createElement('button');
                    buttonRuler.innerHTML = 'Ruler';
                    var handleClean = function (e) {
                        interact.deleteFeatures();
                    };
                    buttonRuler.addEventListener('click', handleClean, false);
                    buttonRuler.addEventListener('touchstart', handleClean, false);
                    element.appendChild(buttonRuler);
                    rulerActive = true;
                }
            }
        }
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });

    };
    ol.inherits(app.CmdControl, ol.control.Control);

    this.getElements = function(){
        this.ListElements.push(new app.CmdControl(parameters));
        return this.ListElements;
    };
};