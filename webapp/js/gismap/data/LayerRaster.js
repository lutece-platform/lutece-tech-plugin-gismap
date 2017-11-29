/*global ol*/
/**
 * LayerRaster Class manage all rasters layers in the map
 */
function LayerRaster(projection, proxy) {
    'use strict';
    /**
     * ListRasters contains all Rasters of the map
     * @type {Array}
     */
    this.ListRasters = [];

    /**
     * LayerRaster Method
     * createRasterLayer initialize the background of the map
     * @param data contains the name of the layer and the specific layer
     * @returns {String} is the name of the layer
     */
    this.createRasterLayer = function(data){
        var name = data[0];
        var layer = data[1];
        if (name === 'OSM'){
            this.ListRasters[name] = new ol.layer.Tile({
                title: name,
                type: 'base',
                source: new ol.source.OSM(),
                visible:false
            });
        }else if (name === 'MapQuest'){
            this.ListRasters[name] = new ol.layer.Tile({
                title: name,
                type: 'base',
                source: new ol.source.MapQuest({layer: layer}),
                visible:false
            });
        }
        return name;
    };

    /**
     * LayerRaster Method
     * createWMSLayer initialize the background of the map to specific WMS data
     * @param layerName is the name of the layer in the application
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param dataName is the name of the data on the server
     * @param dataAttribution is the information about the data
     */
    this.createWMSLayer = function(layerName, server, url, dataName, dataAttribution){
        if(server === 'AGS-IMS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url + dataName + '/ImageServer'),
                    crossOrigin:'anonymous'
                }),
                visible:false
            });
        }else if(server === 'AGS-MPS'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileArcGISRest({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url + dataName + '/MapServer'),
                    crossOrigin:'anonymous'
                }),
                visible:false
            });
        }else if (server === 'GeoServer'){
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.TileWMS({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: proxy + encodeURI(url),
                    params: {'LAYERS': dataName},
                    serverType:'geoserver',
                    crossOrigin:'anonymous'
                }),
                visible:false
            });
        }
    };

    /**
     * LayerRaster Method
     * createWMTSLayer initialize the background of the map to specific WMTS data
     * @param layerName is the name of the layer in the application
     * @param server is the type of the server
     * @param url is the url to access at the service
     * @param proj is the projection of the data
     * @param resolutions is the table of the
     * @param origin is the coordinate of the left upper point of the data
     * @param dataAttribution is the information about the data
     */

    this.createWMTSLayer = function(layerName, server, url, proj, resolutions, origin, dataAttribution, isDefault){
        if(server === 'AGS') {		
            var infoProjData = projection.getEpsgData(proj, false);
            var projData = infoProjData[0];
            this.ListRasters[layerName] = new ol.layer.Tile({
                title: layerName,
                type: 'base',
                source: new ol.source.XYZ({
                    attributions: [
                        new ol.Attribution({
                            html: dataAttribution
                        })
                    ],
                    url: url+'/tile/{z}/{y}/{x}',
                    crossOrigin:'anonymous',
                    projection: projData,
                    tileGrid: new ol.tilegrid.TileGrid({
                        origin: origin,
                        resolutions: resolutions
                    })
                }),
                visible: false
            });
        }
		else if (server === 'AGS-XML'){
			//Retrieve layer definition from remote XML file
			var options = this.defineSourceFromCapabilitiesFile(url);
			resolutions = options.tileGrid.getResolutions();
			var WMTSSource = new ol.source.WMTS(options);
			WMTSSource.setAttributions(dataAttribution);
			this.ListRasters[layerName] = new ol.layer.Tile({
				title: layerName,
				type: 'base',
				opacity: 1,
				source: WMTSSource,
				visible: false
			});
		}
	return resolutions;		
    };
	
	this.defineSourceFromCapabilitiesFile = function(url){
		var options;
		$.ajax({
		url: url,
		success: function(response) {
		  	var parser = new ol.format.WMTSCapabilities();
			var result = parser.read(response);
			//var wmtsLayerName = result.Contents.Layer[0].Identifier;
			var wmtsLayerName = result.ServiceIdentification.Title;
			options = ol.source.WMTS.optionsFromCapabilities(result,{layer: wmtsLayerName, crossOrigin:'anonymous'});
		},
		async:false
		});
		return options;
	};	

    /**
     * LayerRaster Method
     * setRasterVisibility enable or disable the visibility of the layer
     * @param raster the name of the layer
     * @param act the marker to active or not the layer
     */
    this.setRasterVisibility = function(raster, act){
        this.getRasterByName(raster).setVisible(act);
    };

    /**
     * LayerRaster Method
     * getRasterByName is the getter to access at specific raster with this name
     * @param name is the name of the layer to search
     * @returns {ol.layer.Layer} is the layer of the name
     */
    this.getRasterByName = function(name){
        return this.ListRasters[name];
    };
}
