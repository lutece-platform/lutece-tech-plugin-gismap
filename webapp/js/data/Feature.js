var Feature = function(){

    var wktFormat = new ol.format.WKT();
    var geoJSONFormat = new ol.format.GeoJSON();
    var features = new Array();

    addFeature = function(data, dataFormat){
        var feature;
        if(dataFormat == 'WKT'){
            dataProj = data[0];
            console.log(getProjection());
            for(i = 1; i < data.length; i++){
                features.push(wktFormat.readFeature(data[i], {
                    dataProjection: dataProj,
                    featureProjection: getProjection()
                }));
            }
        }else{
            feature = geoJSONFormat.readFeature(data, {
                dataProjection: dataProj,
                featureProjection: getProjection()
            });
        }
        console.log(features);
    };

    getFeatures = function(){
        return features;
    }
}