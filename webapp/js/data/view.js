/*globals ol, projection*/
/**
 * View Class manage the view of the map
 */

function View() {
    'use strict';
    /**
     * centerUser define the center of the view
     * @type {number[]}
     */
    this.centerUser = [0,0];
    /**
     * zoomMin define the minimal zoom possible of the map
     * @type {number}
     */
    this.zoomMin = 0;
    /**
     * zoomMax define the maximal zoom possible of the map
     * @type {number}
     */
    this.zoomMax = 18;
    /**
     * zoomInit define the initial zoom of the view
     * @type {number}
     */
    this.zoomInit = 6;
    /**
     * view is the ol.View used in the map
     * @type {null}
     */
    this.view = null;

    /**
     * View Method
     * setCenter is a setter to define the center of the view
     * @param newCenter
     */
    this.setCenter = function (newCenter){
        if(newCenter === null){
            this.centerUser = ol.proj.fromLonLat(this.centerUser, projection.getProjection());
        }else{
            this.centerUser = newCenter;
        }
    };

    /**
     * View Method
     * getCenter is a getter to access at the center of the view
     * @returns {number[]|*}
     */
    this.getCenter = function (){
        return this.centerUser;
    };

    /**
     * View Method
     * setZoomInit is a setter to define the initial zoom of the view
     * @param newZoomInit
     */
    this.setZoomInit = function (newZoomInit){
        this.zoomInit = parseInt(newZoomInit);
    };

    /**
     * View Method
     * setZoom is a setter to define the maximal and minimal zoom of the view
     * @param min
     * @param max
     */
    this.setZoom = function (min, max){
        this.zoomMin = parseInt(min);
        this.zoomMax = parseInt(max);
    };

    /**
     * View Method
     * getView is a getter to access to the view
     * @returns {map.view|{center, zoom}|*|null|ol.View|WindowProxy}
     */
    this.getView = function (){
        return this.view;
    };

    /**
     * View Method
     * createView initialize the view with all parameters
     */
    this.createView = function(){
         this.view = new ol.View({
             projection: projection.getProjection().getCode(),
             extent: projection.getExtent(),
             center: this.centerUser,
             zoom: this.zoomInit,
             minZoom: this.zoomMin,
             maxZoom: this.zoomMax

        });
    };
}
