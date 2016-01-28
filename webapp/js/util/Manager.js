/**
 * Class Manager to read and manage all parameters of the Gis Component
 */
var Manager = function(){

    /**
     * Function to calculate the initial extent or center
     */
    defineCenterAndExtentByParameter = function (data){
        if (data != ''){
            data = data.split(',');
            if(data.length <= 2 ){
                for(i = 0; i < data.length; i++){
                    data[i] = parseFloat(data[i]);
                }
                setCenter(data);
            }else{
                for(i = 0; i < data.length; i++){
                    data[i] = parseFloat(data[i]);
                }
                setExtent(data);
            }
        }
    };

    /**
     * Function to read the properties map and initiate parameters
     */
    readAndInitParams = function (globalParameters, parameters){
        var projectionChanged = false;
        var specificExtent = false;
        var extentDefine = false;

        if(parameters['TypeCarte'] != ''){
            mapChoose = parameters['TypeCarte'];
        }
        if(parameters['Projection'] != ''){
            setProjection(parameters['Projection']);
            projectionChanged = true;
        }
        if(parameters['Extent'] != ''){
            extentDefine = parameters['Extent'];
            specificExtent = true;
        }
        if(parameters['Controles'] != ''){
            initControls(parameters['Controles'], extentDefine, projectionChanged, specificExtent);
        }
        if(parameters['ZoomStart'] != ''){
            setZoomInit(parameters['ZoomStart']);
        }
        if(parameters['Zoom'] != ''){
            setZoom(parameters['Zoom'][0], parameters['Zoom'][1]);
        }
        if(parameters['WKT'] != ''){
            addFeature(parameters['WKT'], 'WKT');
        }
    };
};