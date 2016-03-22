/*global zoom*/
/**
 * SuggestPoiLocator Class provide the SuggestPoi Service in the Gis Component
 */
var SuggestPoiLocator = function(suggestPoiParams) {
    'use strict';

	var url = suggestPoiParams[0];
	var idClient = suggestPoiParams[1];
	var nbResults = suggestPoiParams[2];

    /**
     * SuggestPoiLocator Method
     * locateBySuggestPoi ask the suggest poi web service and diffuse their results
     */
    var locateBySuggestPoi = function() {
        $('#addressSuggestPoi').autocomplete({
            source: function (request, reponse) {
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    data: {
                        clientId: idClient,
                        nbResults: nbResults,
                        query: request.term
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
            object.value = result[index].libelleTypo;
            object.label = result[index].libelleTypo;
            object.id = result[index].id;
            object.x = result[index].x;
            object.y = result[index].y;
            object.type = result[index].type;
            resultArray.push(object);
        }
        return resultArray;
    }

    return {
        locateBySuggestPoi: locateBySuggestPoi
    };
};