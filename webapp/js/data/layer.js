var Layer = function(){
    var currentRaster;
    new LayerRaster();
    var rasterLayers = new Array();
    var layerVector = new Array();
    var layers = new Array();


    addLayerVector = function(){
        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: getFeatures()
            })
        })
        layerVector.push(layer);
    }

    addLayerRaster = function(backGround){
        name = createRasterLayer(backGround);
        rasterLayers.push(name);
    }

    getCurrentRaster = function(){
        return currentRaster;
    }

    setCurrentRaster = function(newCurrentRaster){
        currentRaster = newCurrentRaster;
    }

    getRasterLayers = function(){
        return rasterLayers;
    }

    getLayers = function(){
        for(layer of rasterLayers){
            layers.push(getRasterByName(layer));
        }
        for(layer of layerVector){
            layers.push(layer);
        }
        layers.push(getDrawLayer());
        layers.push(getMeasureLayer());
        return layers;
    }

}