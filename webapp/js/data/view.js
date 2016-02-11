/*globals ol*/
/**
 * View Class manage the view of the map
 */

function View() {
    'use strict';
    /**
     * projectionUser define the specific projection of the view
     * @type {string}
     */
    this.projectionUser = 'EPSG:3857';
    /**
     * centerUser define the center of the view
     * @type {number[]}
     */
    this.centerUser = [0,0];
    /**
     * extentUser define the extent of the view
     * @type {Array}
     */
    this.extentUser = [];
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
        this.centerUser = newCenter;
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
     * setExtent is a setter to define the extent of the view
     * @param newExtent
     */
    this.setExtent = function (newExtent){
        this.extentUser = newExtent;
    };

    /**
     * View Method
     * getExtent is a setter to access at the extent of the view
     * @returns {Array|*}
     */
    this.getExtent = function (){
        return this.extentUser;
    };

    /**
     * View Method
     * setProjection is a setter to define the projection of the view
     * @param newProjection
     */
    this.setProjection = function (newProjection){
        this.projectionUser = newProjection;
    };

    /**
     * View Method
     * getProjection is a getter to access at the projection of the view
     * @returns {string|*}
     */
    this.getProjection = function (){
        return this.projectionUser;
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
            projection: this.projectionUser,
            center: this.centerUser,
            zoom: this.zoomInit,
            minZoom: this.zoomMin,
            maxZoom: this.zoomMax

        });
    };
}
