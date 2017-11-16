/*globals ol*/
/**
 * View Class manage the view of the map
 */

function View(projection) {
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
    this.zoomSelect = 6;
    /**
     * view is the ol.View used in the map
     * @type {null}
     */
    this.view = null;

	/**
     * limitExtent define the bounding extent of the view
     * @type {number[]}
     */
	var limitExtent ;
	
    /**
     * View Method
     * setCenter is a setter to define the center of the view
     * @param newCenter is the new coordinates of the center of the view
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
     * @returns {number[]} the coordinates of the center of the view
     */
    this.getCenter = function (){
        return this.centerUser;
    };

    /**
     * View Method
     * getZoomSelect is a getter to access at the zoom of the view
     * @returns {number} the level of zoom
     */
    this.getZoomSelect = function (){
        return this.zoomSelect;
    };

    /**
     * View Method
     * setZoomSelect is a setter to define the zoom of the view
     * @param newZoom is the level of zoom
     */
    this.setZoomSelect = function (newZoom){
        this.zoomSelect = parseInt(newZoom);
    };

    /**
     * View Method
     * setZoom is a setter to define the maximal and minimal zoom of the view
     * @param min the minimal zoom level
     * @param max the maximal zoom level
     */
    this.setZoom = function (min, max){
        this.zoomMin = parseInt(min);
        this.zoomMax = parseInt(max);
    };

    /**
     * View Method
     * getView is a getter to access to the view
     * @returns {ol.View} the view of the map
     */
    this.getView = function (){
        return this.view;
    };

	
	 /**
     * View Method
     * getLimitExtent is a getter to access the bounding extent
	 * @returns {number[]} the extent
     */
	this.getLimitExtent = function (){
		if ( this.limitExtent === undefined){
			return projection.getExtent();
		}
		else{
			return this.limitExtent;
		}			
    };

    /**
     * View Method
     * setLimitExtent is a setter to define the bounding extent
     * @param extent is the extent
     */
    this.setLimitExtent = function (extent){
        this.limitExtent = extent;
    };
	
    /**
     * View Method
     * createView initialize the view with all parameters
     */
    this.createView = function(){
         this.view = new ol.View({
             projection: projection.getProjection().getCode(),
             extent: this.getLimitExtent(),
             center: this.centerUser,
             zoom: this.zoomSelect,
             minZoom: this.zoomMin,
             maxZoom: this.zoomMax

        });
    };
}
