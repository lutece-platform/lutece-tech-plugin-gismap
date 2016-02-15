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
    var interacts = new Interaction();
    var feature = new Feature();
    var layers = new Layer();
    var toc = new TOC();
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
	    initInteractions();
	    defineCenterAndExtentByParameter(document.getElementById('id_Select').value);
        addLayerVector();
		view = createView();
		map = createMap();
		onChangeData('Raster');
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
            interactions: ol.interaction.defaults().extend(getInteracts()),
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
	 * Listeners
	 */

	mapSelector.onchange = function() {
        onChangeData('Raster');
    };

    drawToolSelector.onchange = function() {
        setDrawInteraction(map);
    };

    measureType.onchange = function() {
        setMeasureInteraction(map);
    };

    specificToolSelector.onchange = function() {
        setTypeInteraction(map);
    };

    /**
     * PUBLIC METHODS
     */

    zoomTo = function(){
        selectFeatures = getSelectedFeatures().getArray();
        if (selectFeatures.length == 1){
            view.fit(selectFeatures[0].getGeometry(), map.getSize());
        }else if (selectFeatures.length > 1){
            arrayGeom = new Array();
            for(selectFeature of selectFeatures){
                arrayGeom.push(selectFeature.getGeometry());
            }
            geomColl = new ol.geom.GeometryCollection(arrayGeom);
            view.fit(geomColl.getExtent(), map.getSize());
        }
    }
    
    zoomToPoint = function(x,y){
    	view.fit(new ol.geom.Point([x,y]), map.getSize());
    }

    deleteFeatures = function(){
        selectFeatures = getSelectedFeatures().getArray();
        if (selectFeatures.length == 1){
            getDrawLayer().getSource().removeFeature(selectFeatures[0]);
        }else if (selectFeatures.length > 1){
            for(selectFeature of selectFeatures){
                getDrawLayer().getSource().removeFeature(selectFeature);
            }
        }
        getSelectedFeatures().clear();
    }

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