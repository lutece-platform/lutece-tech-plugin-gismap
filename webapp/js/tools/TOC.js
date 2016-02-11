/*globals layer, rasterLayer, featureLayer */
/**
 * TOC class manage actions to switch layer on the map
 */
function TOC (){
    'use strict';

    //var mapSelector = document.getElementById('mapSelector');

    /**
     * TOC Method
     * onChangeData switch the visibility of the layer to display it on the map
     * @param select
     * @param dataName
     */
    this.onChangeData = function(select, dataName) {
        if(select === 'Raster'){
            var rasterLayersMap = rasterLayer.getRasterLayers();
            if(rasterLayersMap[dataName] !== null) {
                if (rasterLayer.getCurrentRaster() !== null) {
                    rasterLayer.setRasterVisibility(rasterLayer.getCurrentRaster(), false);
                }
                rasterLayer.setRasterVisibility(dataName, true);
                rasterLayer.setCurrentRaster(dataName);
            }
        } else if(select === 'Vector'){
            var featureLayers = layer.getRasterLayers();
            for (var j = 0; j < featureLayers.length; j++) {
                if(featureLayers[j] === dataName){
                    if(layer.getCurrentRaster() !== null){
                        rasterLayer.setRasterVisibility(layer.getCurrentRaster(), false);
                    }
                    rasterLayer.setRasterVisibility(dataName, true);
                    layer.setCurrentRaster(dataName);
                }
            }
        }
    };
}