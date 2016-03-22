/*global ol, proj4 */
/**
 * Projection Class manage the projection and the extent of the Gis View
 */
var Projection = function() {
    'use strict';
    /**
     * projection define the specific projection of the view
     * @type {string}
     */
    this.projEspg = null;

    /**
     * extentUser define the extent of the view
     * @type {Array}
     */
    this.extentUser = null;

    /**
     * Projection Method
     * getProjection is a getter to access at the projection of the view
     * @returns {string|*}
     */
    this.getProjection = function (){
        return this.projEspg;
    };

    /**
     * Projection Method
     * getExtent is a setter to access at the extent of the view
     * @returns {Array|*}
     */
    this.getExtent = function (){
        return this.extentUser;
    };

    /**
     * Projection Method
     * defineProjection set all value and define projection and extent of the map
     * @param code
     * @param proj4def
     * @param bbox
     */
    this.defineProjection = function(code, proj4def, bbox) {
        var newProjCode = 'EPSG:' + code;
        proj4.defs(newProjCode, proj4def);
        this.projEspg= ol.proj.get(newProjCode);
        this.extentUser = ol.extent.applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], ol.proj.getTransform('EPSG:4326', this.projEspg));
        this.projEspg.setExtent(this.extentUser);
        ol.proj.addProjection(this.getProjection());
    };

    /**
     * Projection Method
     * getProjectionInformation return all value of projection
     * @param code
     * @param proj4def
     * @param bbox
     */
    this.getProjectionInformation = function(code, proj4def, bbox) {
        var newProjCode = 'EPSG:' + code;
        proj4.defs(newProjCode, proj4def);
        var projEspgInfo = ol.proj.get(newProjCode);
        var extentInfo = ol.extent.applyTransform([bbox[1], bbox[2], bbox[3], bbox[0]], ol.proj.getTransform('EPSG:4326', projEspgInfo));
        return [projEspgInfo, extentInfo];
    };

    /**
     * Projection Method
     * getEpsgData load the EPSG.json and search the active projection to define the projection
     * @param projValue
     * @param view
     */
    this.getEpsgData = function(projValue, view) {
        projValue = projValue.split(':')[1];
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'js/lib/EPSG.json', false);
        xmlHttp.send(null);
        var json = JSON.parse(xmlHttp.responseText);
        var results = json[projValue]['results'];
        if (results && results.length > 0) {
            for (var i = 0, ii = results.length; i < ii; i++) {
                var result = results[i];
                if (result) {
                    var code = result['code'], proj4def = result['proj4'], bbox = result['bbox'];
                    if (code && code.length > 0 && proj4def && proj4def.length > 0 && bbox && bbox.length === 4) {
                        if(view === true) {
                            this.defineProjection(code, proj4def, bbox);
                            return;
                        }else{
                            return this.getProjectionInformation(code, proj4def, bbox);
                        }
                    }
                }
            }
        }
    };
};