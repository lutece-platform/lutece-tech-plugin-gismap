var View = function (){
    var projectionUser = 'EPSG:3857';
    var centerUser = [0,0];
    var extentUser = [];
    var zoomMin = 0;
    var zoomMax = 18;
    var zoomInit = 6;


    /**
     * PRIVATE METHODS
     */



    /**
     * PUBLIC METHODS
     */

    setCenter = function (newCenter){
        centerUser = newCenter;
    }

    getCenter = function (){
        return centerUser;
    }

    setExtent = function (newExtent){
        extentUser = newExtent;
    }

    getExtent = function (){
        return extentUser;
    }

    setProjection = function (newProjection){
        projectionUser = newProjection;
    }

    getProjection = function (){
        return projectionUser;
    }

    setZoomInit = function (newZoomInit){
        zoomInit = parseInt(newZoomInit);
    }

    setZoom = function (min, max){
        zoomMin = parseInt(min);
        zoomMax = parseInt(max);
    }

    createView = function(){
        view = new ol.View({
            projection: projectionUser,
            center: centerUser,
            zoom: zoomInit,
            minZoom: zoomMin,
            maxZoom: zoomMax

        });
        return view;
    };
};
