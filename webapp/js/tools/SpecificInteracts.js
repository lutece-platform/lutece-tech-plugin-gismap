var SpecificInteracts = function(){
    var selectInteract = new ol.interaction.Select();

    getSelectInteraction = function(){
        return selectInteract;
    }

    /*getMoveInteraction = function(){
        return new ol.interaction.Translate({
            features:
        });
    }*/

    getSelectedFeatures = function(){
        return selectInteract.getFeatures();
    }
}