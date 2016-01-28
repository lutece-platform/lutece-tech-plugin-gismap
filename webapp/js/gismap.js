/**
 * File to manage the Gis Component with all parameters
 */
var GisMap = function() {

    /**
     * Attributs to initialize and configure Gis Plugin
     * with parameters file.
     */
    var mapChoose;
     /**
     *  Object declaration
     */
    var manager = new Manager();
    var control = new Control();
    var feature = new Feature();
    var layers = new Layer();
    var view = new View();
    var map;

    /**
     * PRIVATE METHODS
     */

	function initGis (idMap, globalParameters, parameters){
	    /*if ($("#"+idMap).attr('class').indexOf("olMap")>=0){
			return false;
	    }*/
	    readAndInitParams(globalParameters, parameters);
        defineCenterAndExtentByParameter(document.getElementById('id_Select').value);
        addLayerVector();
        addLayerRaster();
		view = createView();
		map = createMap();
		var geoPoint = new GeoPoint(map);
		/*if(mapChoose == "Attributaire"){
		    createMapAttribut();
		}else{
		    createMapGeneral();
		}*/
	};

	function createMap(){
        map = new ol.Map({
            controls: ol.control.defaults().extend(getControls()),
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotate(),
                new ol.interaction.DragZoom()
            ]),
            layers: getLayers(),
            target: 'map',
            view: view
        });
        if(getExtent().length != 0){
            view.fit(getExtent(), map.getSize());
        }
        return map;
	};

    /**
     * PUBLIC METHODS
     */

    /**
    * InitGis est le point d'entrée dans le code JavaScript pour
    * instancier le composant Gis.
    *
    $.fn.initGisMap = function(globalParameters, parameters) {
		return this.each(function() {
			initGis(this.id, globalParameters, parameters);
		});
	};*/
    initGisMap = function(globalParameters, parameters) {
        return initGis('Carte', globalParameters, parameters);

	};

    return initGisMap;

};