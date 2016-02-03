var Control = function() {
    // Tableau des contrôleurs de la map
    var controls = new Array();

    /**
     * PRIVATE METHODS
     */

     function addControl(control){
        controls.push(control);
    };

    /**
     * PUBLIC METHODS
     */

    initControls = function(activeControls, extentDefine, projectionChanged, specificExtent){
        for(ctrl of activeControls){
            if(ctrl == "Overview" && projectionChanged == false){
                addControl(new ol.control.OverviewMap());
            } if(ctrl == "FullScreen" ){
                addControl(new ol.control.FullScreen());
            }
            if(ctrl == "ZoomExtent" ){
                controls.push(new ol.control.ZoomToExtent());
                if(specificExtent){
                    controls.push(new ol.control.ZoomToExtent({
                        extent: extentDefine
                    }));
                }
            }
            if(ctrl == "ZoomSlider" ){
                addControl(new ol.control.ZoomSlider());
            }
            if(ctrl == "ScaleBar" ){
                addControl(new ol.control.ScaleLine());
            }
            if(ctrl == "MousePosition" ){
                controls.push(new ol.control.MousePosition());
            }
        }
    };

    getControls = function(){
        return controls;
    }
};