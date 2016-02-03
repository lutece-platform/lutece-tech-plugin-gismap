var Interaction = function(){
    var interacts = new Array();
    var specificInteract = new SpecificInteracts();
    var drawTools = new DrawTools();
    var measureTools = new Measure();
    var currentDrawInteraction;
    var currentSpecificInteract;
    var currentMeasureInteraction;

    var toolSelector = document.getElementById('specificToolSelector');


    initInteractions = function(){
        interacts.push(new ol.interaction.DragRotate());
        interacts.push(new ol.interaction.DragZoom());
        currentSpecificInteract = getSelectInteraction();
        interacts.push(currentSpecificInteract);
    }

    function inactiveSelectTool(map){
        if(currentSpecificInteract != 'None'){
            map.removeInteraction(currentSpecificInteract);
            interacts.pop();
            currentSpecificInteract = 'None';
        }
    }

    function inactiveDrawTool(map){
        if(currentDrawInteraction !='None'){
            map.removeInteraction(currentDrawInteraction);
            interacts.pop();
            setDrawSelector(true);
            currentDrawInteraction = getDrawInteraction();
        }
    }

    function inactiveMeasureTool(map){
        if(currentMeasureInteraction !='None'){
            map.removeInteraction(currentMeasureInteraction);
            interacts.pop();
            setMeasureSelector(true);
            currentMeasureInteraction = getMeasureInteracts(map);
        }
    }

    setSelectInteraction = function(map){
        currentSpecificInteract = getSelectInteraction();
        interacts.push(currentSpecificInteract);
        map.addInteraction(currentSpecificInteract);
    }

    setDrawInteraction = function(map){
        if (currentDrawInteraction != 'None'){
            map.removeInteraction(currentDrawInteraction);
            interacts.pop();
        }
        currentDrawInteraction = getDrawInteraction();
        if (currentDrawInteraction != 'None'){
            interacts.push(currentDrawInteraction);
            map.addInteraction(currentDrawInteraction);
        }
    }

    setMeasureInteraction = function(map){
        if (currentMeasureInteraction != 'None'){
            map.removeInteraction(currentMeasureInteraction);
            interacts.pop();
        }
        currentMeasureInteraction = getMeasureInteracts(map);
        if (currentMeasureInteraction != 'None'){
            interacts.push(currentMeasureInteraction);
            map.addInteraction(currentMeasureInteraction);
        }
    }

    setTypeInteraction = function(map){
        toolSelectorValue = toolSelector.value;
        if(toolSelectorValue == "Select"){
            inactiveDrawTool(map);
            inactiveMeasureTool(map);
            setSelectInteraction(map);
        }else if(toolSelectorValue == "Measure"){
            setMeasureSelector(false);
            inactiveDrawTool(map);
            inactiveSelectTool(map);
            setMeasureInteraction(map);
        }else if(toolSelectorValue == "Draw"){
            setDrawSelector(false);
            inactiveMeasureTool(map);
            inactiveSelectTool(map);
            setDrawInteraction(map);
        }
    }


    getInteracts = function(){
        return interacts;
    }
}