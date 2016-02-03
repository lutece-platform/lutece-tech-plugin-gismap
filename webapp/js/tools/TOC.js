var TOC = function(){

    var mapSelector = document.getElementById('mapSelector');


    onChangeData = function(select) {
        var dataName = mapSelector.value;
        if(select == 'Raster'){
            rasterLayers = getRasterLayers();
            for (i = 0; i < rasterLayers.length; i++) {
                if(rasterLayers[i] == dataName){
                    if(getCurrentRaster() != null){
                        setRasterVisibility(getCurrentRaster(), false);
                    }
                    setRasterVisibility(dataName, true);
                    setCurrentRaster(dataName);
                }
            }
        } else if(select == 'Vector'){
            rasterLayers = getRasterLayers();
            for (i = 0; i < rasterLayers.length; i++) {
                if(rasterLayers[i] == dataName){
                    if(getCurrentRaster() != null){
                        setRasterVisibility(getCurrentRaster(), false);
                    }
                    setRasterVisibility(dataName, true);
                    setCurrentRaster(dataName);
                }
            }
        }
    }
}