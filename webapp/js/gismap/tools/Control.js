/*global ol, layerswitcher*/
/**
 * Control Class manage the control of the map
 */
function Control() {
    'use strict';

    /**
     * ListControl is a table of controls enable on the map
     * @type {Array}
     */
    this.ListControl = [];

    /**
     * Control METHOD
     * initControls initialize all control of the map and add it in ListControl
     * @param activeControls is an array of parameters to defin controls
     * @param projectionChanged is a marker to indicate if the projection change
     * @param specificExtent is a marker to indicate if the extent change
     * @param extentDefine is the new array of specific extent
     */
    this.initControls = function(activeControls, projectionChanged, specificExtent, extentDefine){
        for(var ctrl = 0; ctrl < activeControls.length; ctrl++){
            if(activeControls[ctrl] === "Overview" && projectionChanged === true) {
                this.ListControl.push(new ol.control.OverviewMap());
            }
            if(activeControls[ctrl] === "FullScreen" ){
                this.ListControl.push(new ol.control.FullScreen());
            }
            if(activeControls[ctrl] === "ZoomExtent" ){
                this.ListControl.push(new ol.control.ZoomToExtent());
                if(specificExtent) {
                    this.ListControl.push(new ol.control.ZoomToExtent({
                        extent: extentDefine
                    }));
                }
            }
            if(activeControls[ctrl] === "ZoomSlider" ){
                this.ListControl.push(new ol.control.ZoomSlider());
            }
            if(activeControls[ctrl] === "ScaleBar" ){
                this.ListControl.push(new ol.control.ScaleLine());
            }
            if(activeControls[ctrl] === "MousePosition" ){
                this.ListControl.push(new ol.control.MousePosition({
                    undefinedHTML: 'Outside',
                    coordinateFormat: function (coordinate) {
                        return ol.coordinate.format(coordinate, '{x}, {y}', 4);
                    }
                }));
            }
        }
    };

    /**
     * Control METHOD
     * getLayerSwitcher is a getter to access at LayerSwitcher
     * @returns {ol.control.LayerSwitcher} the LayerSwitcher control
     */
    this.getLayerSwitcher = function(){
        return new ol.control.LayerSwitcher();
    };

    /**
     * Control METHOD
     * getControls is a getter to access at ListControl
     * @returns {Array} is an array of all controls
     */
    this.getControls = function(){
        return this.ListControl;
    };
}
