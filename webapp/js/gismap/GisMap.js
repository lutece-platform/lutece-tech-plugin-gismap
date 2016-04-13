/*global ol, Manager, Control, Projection, Interaction, Layer, SuggestPoiLocator,
View, Zoom, InterfaceElements, GeoPoint, Print, Popup, Filter*/

/**
 * File to manage the Gis Component with all parameters
 */
var GisMap = function (idMapInit, idInit) {
    'use strict';
    /**
     *  Global Object instantiation
     */
    this.idMap = idMapInit;
    var id = idInit;
    window.app = {};
    var app = window.app;
    var control;
    var filter;
    var geoPoint;
    var interact;
    var interfaceElements;
    var interfaceValues = [];
    var layer;
    var manager = new Manager();
    var popup;
    var printer;
    var projectionGis;
    var suggestPoiLocator;
    var viewGisMap;
    var zoom;

    var GlobalMap = new ol.Map({
        target: this.idMap,
        interactions: ol.interaction.defaults({doubleClickZoom :false})
    });

    var fieldExtent;
    var fieldLayerVisible;


    /**
     * GisMap Private Method
     * initGis initialize all components of the map
     * @param startParameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     */
    function initGis(startParameters, fieldParameters) {
        fieldExtent = document.getElementById(fieldParameters['ExtentCurrent']);
        fieldLayerVisible = document.getElementById(fieldParameters['VisibleLayer']);
        var parameters = manager.readAndManageParameters(startParameters, fieldParameters);
        globalInitialize(parameters);
        dataInitialize(parameters, fieldParameters);
        controlInitialize(parameters, fieldParameters);
        mapInitialize(parameters);
        if (parameters['ListLayersVisible'] !== '' && parameters['ListLayersVisible'] !== undefined){
            setContext(parameters['ListLayersVisible']);
        }
        if(parameters['ExtentContext'] !== '' && parameters['ExtentContext'] !== undefined) {
            viewGisMap.getView().fit(parameters['ExtentContext'], GlobalMap.getSize());
        }else if(manager.getSpecificExtent().length > 1 ){
            viewGisMap.getView().fit(manager.extentDefine, GlobalMap.getSize());
        }else {
            viewGisMap.getView().fit(projectionGis.getExtent(), GlobalMap.getSize());
        }
        initInterfaces(parameters);
        var geomElement = document.getElementById(fieldParameters['GeomGeoJson']).value;
        if(geomElement !== null && geomElement !== '' && geomElement !== undefined) {
            zoom.initialZoom(fieldParameters['GeomGeoJson']);
        }
    }

    /**
     * GisMap Private Method
     * initInterfaces initiate the interfaces elements of the map
     * @param parameters is the array of parameters of properties file
     */
    function initInterfaces(parameters) {
        interfaceElements = new InterfaceElements(app, interfaceValues, parameters);
        var Elements = interfaceElements.getElements();
        for (var i = 0; i < Elements.length; i++) {
            GlobalMap.addControl(Elements[i]);
        }
    }

    /**
     * GisMap Private Method
     * globalInitialize initiate the general parameters of the map
     * @param parameters is the array of parameters of properties file
     */
    function globalInitialize(parameters){
        projectionGis = new Projection();
        viewGisMap = new View(projectionGis);
        zoom = new Zoom(GlobalMap, projectionGis, viewGisMap);
        manager.readAndInitGeneralParams(projectionGis, viewGisMap, parameters);
    }

    /**
     * GisMap Private Method
     * dataInitialize initiate the layers of the map
     * @param parameters is the array of parameters of properties file
     */
    function dataInitialize(parameters, fieldParameters){
        layer = new Layer(projectionGis, fieldParameters['Proxy']);
        manager.readAndInitDataParams(layer, parameters);
    }

    /**
     * GisMap Private Method
     * controlInitialize initiate the controls and interactions components of the map
     * @param parameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     */
    function controlInitialize(parameters, fieldParameters) {
        if(parameters['Popup'] !== '' && parameters['Popup'] !== undefined){
            popup = new Popup(GlobalMap, id, parameters['Popup']);
            interfaceValues["popup"] = popup;
        }
        interact = new Interaction(GlobalMap, layer, popup, projectionGis, parameters['LayerEdit'], fieldParameters);
        control = new Control();
        manager.readAndInitActionParams(control, interact, layer, projectionGis, parameters);
        interfaceValues["interact"] = interact;
        layer.setInteract(interact);
        popup.setInteract(interact);
        zoom.setInteract(interact);
    }

    /**
     * GisMap Private Method
     * addAnnexeComponent initiate the others components of the map
     * @param parameters is the array of parameters of properties file
     */
    function addAnnexeComponent(parameters){
        for (var i = 0; i < parameters['Interacts'].length; i++) {
            if (parameters['Interacts'][i] === 'SuggestPOISearch') {
                suggestPoiLocator = new SuggestPoiLocator(zoom, parameters['SuggestPOIParams']);
                interfaceValues["suggestPoiLocator"] = suggestPoiLocator;
            }
            if (parameters['Interacts'][i] === 'GPS') {
                geoPoint = new GeoPoint(GlobalMap, viewGisMap);
                interfaceValues["geoPoint"] = geoPoint;
            }
            if (parameters['Interacts'][i] === 'Print') {
                printer = new Print(GlobalMap);
            }
        }
        filter = new Filter(layer, projectionGis);
    }

    /**
     * GisMap Private Method
     * mapInitialize initiate the map and integrate all components
     * @param parameters is the array of parameters of properties file
     */
    function mapInitialize(parameters){
        viewGisMap.createView();
        GlobalMap.setView(viewGisMap.getView());
        var ListControl = control.getControls();
        for (var i = 0; i < ListControl.length; i++){
            GlobalMap.addControl(ListControl[i]);
        }
        var ListInteract = interact.getInteracts();
        for (var j = 0; j < ListInteract.length; j++){
            GlobalMap.addInteraction(ListInteract[j]);
        }
        var ListLayer = layer.getLayersMap();
        for (var k = 0; k < ListLayer.length; k++){
            GlobalMap.addLayer(ListLayer[k]);
        }
        addAnnexeComponent(parameters);
        if(parameters['LayerControl'] !== false) {
            GlobalMap.addControl(control.getLayerSwitcher());
        }
    }

    /**
     * GisMap Private Method
     * getContext is a method to stock in hidden field the current context of the map
     */
    function getContext(){
        fieldExtent.value = '['+GlobalMap.getView().calculateExtent(GlobalMap.getSize())+']';
        fieldLayerVisible.value = '['+layer.getVisibleLayers()+']';
    }

    /**
     * GisMap Private Method
     * setContextValue is an accessor for the filter object
     * @param listLayerVisible is an array with name and marker of visibility for each layers
     */
    function setContext(listLayerVisible){
       for(var i = 0; i < listLayerVisible.length-1; i=i+2){
           layer.showLayer(listLayerVisible[i], listLayerVisible[i+1]);
       }
    }

    /**
     * GisMap Handler Method
     */
    GlobalMap.on('postrender', function(e){
        getContext();
    });

    /**
     * GisMap Public Method
     * getFilter is an accessor for the filter object
     * @returns {*} the filter object
     */
    var getFilter = function(){
        return filter;
    };

    /**
     * GisMap Public Method
     * getInteract is an accessor for the interact object
     * @returns {*} the interact object
     */
    var getInteract = function(){
        return interact;
    };

    /**
     * GisMap Public Method
     * getLayer is an accessor for the layer object
     * @returns {*} the layer object
     */
    var getLayer = function(){
        return layer;
    };

    /**
     * GisMap Public Method
     * getPopup is an accessor for the popup object
     * @returns {*} the popup object
     */
    var getPopup = function(){
        return popup;
    };

    /**
     * GisMap Public Method
     * getZoom is an accessor for the filter object
     * @returns {*} the filter object
     */
    var getZoom = function(){
        return zoom;
    };

    /**
     * GisMap Method
     * initGisMap is the enter point of the GisMap plugin
     * @param parameters is the array of parameters of properties file
     * @param fieldParameters is the array of parameters
     * @returns {*} the map with all elements
     */
    var initGisMap = function(parameters, fieldParameters) {
        initGis(parameters, fieldParameters);
        return GlobalMap;
    };

    return {
        getFilter: getFilter,
        getInteract: getInteract,
        getLayer: getLayer,
        getPopup: getPopup,
        getZoom: getZoom,
        initGisMap: initGisMap
    };
};
