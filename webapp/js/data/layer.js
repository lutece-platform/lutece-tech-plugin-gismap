var Layer = function(){

    var layerRaster = new Array();
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


    addLayerRaster = function(){
        layerRaster.push(new ol.layer.Tile({
            source: new ol.source.OSM()
        }));
    }


    getLayers = function(){
        for(layer of layerRaster){
            layers.push(layer);
        }
        for(layer of layerVector){
            layers.push(layer);
        }
        return layers;
    }




}