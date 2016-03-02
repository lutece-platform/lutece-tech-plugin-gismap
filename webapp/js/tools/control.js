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
     *
     * @param activeControls
     * @param extentDefine
     * @param projectionChanged
     * @param specificExtent
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
                this.ListControl.push(new ol.control.MousePosition());
            }
        }
    };

    this.getLayerSwitcher = function(){
        return new ol.control.LayerSwitcher();
    };

    /**
     * Control METHOD
     * getControls is a getter to access at ListControl
     * @returns {Array}
     */
    this.getControls = function(){
        return this.ListControl;
    };
}