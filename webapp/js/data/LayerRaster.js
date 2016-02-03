var LayerRaster = function(){
    var layers = new Array();

    createRasterLayer = function(backGround){
        var name = backGround[0];
        var data = backGround[1];

        if (name === 'OSM'){
            layers.push(layers[name] = new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible:false
            }));
        }else if (name === 'MapQuest'){
            layers.push(layers[name] = new ol.layer.Tile({
                source: new ol.source.MapQuest({layer: data}),
                visible:false
            }));
        }else{
            layers.push(layers[name] = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://demo.boundlessgeo.com/geoserver/wms',
                    params: {'LAYERS': 'topp:states', 'TILED': true},
                    serverType: 'geoserver'
                }),
                visible:false
            }));
        }
        return name;
    }

    getRasterByName = function(name){
        return layers[name];
    }

    setRasterVisibility = function(raster, act){
        getRasterByName(raster).setVisible(act);
    }

}