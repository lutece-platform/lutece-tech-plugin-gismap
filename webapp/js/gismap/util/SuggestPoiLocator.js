/**
 * SuggestPoiLocator Class provide the SuggestPoi Service in the Gis Component
 */
var SuggestPoiLocator = function(zoom, suggestPoiParams) {
    'use strict';

	var url = suggestPoiParams[0];
	var valEntites = suggestPoiParams[1];
	var valToSRID = suggestPoiParams[2];

    /**
     * SuggestPoiLocator Method
     * locateBySuggestPoi ask the suggest poi web service and diffuse their results
     */
    var locateBySuggestPoi = function() {
        $('#addressSuggestPoi').autocomplete({
            source: function (request, reponse) {
                $.ajax({
                    url: url + request.term,
                    dataType: "jsonp",
                    data: {
                        Parms: "{\"Entites\":\"" + valEntites+ "\",\"toSrid\":\"" + valToSRID + "\"}"
                    },
                    success: function (data) {
                        reponse($.map(getResult(data.result), function (objet) {
                            return objet;
                        }));
                    }
                });
            },
            select: function (event, ui) {
                zoom.zoomSuggestPoi(ui.item.x, ui.item.y);
            }
        }).focus();
    };

    /**
     * SuggestPoiLocator Method
     * getResult construct the result array of the suggest poi query
     * @param result is an array contains all results of the request
     * @returns {Array} a formated array of the results
     */
    function getResult(result) {
        var resultArray = [];
        var index;
        for (index = 0; index < result.length; index++){
            var object = new Object();
            object.value = result[index].Libelletypo;
            object.label = result[index].Libelletypo;
            object.id = result[index].Id;
            object.x =  parseFloat(result[index].X);
            object.y =  parseFloat(result[index].Y);
            object.type = result[index].Objectid;
            resultArray.push(object);
        }
        return resultArray;
    }

    return {
        locateBySuggestPoi: locateBySuggestPoi
    };
};