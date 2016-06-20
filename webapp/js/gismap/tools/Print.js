/**
 * Print Class manage all print actions enable on the plugin
 */
function Print(GlobalMap){
    'use strict';
    /**
     * printMapPng is a link to catch an event
     * @type {Element}
     */
    var printMapPng = document.getElementById('mapPrint');

    /**
     * Print Listener
     * printMapPng listener launch the download of the map in png format
     */
    printMapPng.addEventListener('click', function() {
        GlobalMap.once('postcompose', function(event) {
            var measure = [];
            var measures  = document.getElementsByClassName('ol-overlay-container');
            var canvas = event.context.canvas;
            var contextMeasure= canvas.getContext('2d');

            for (var i = 0; i < measures.length; i++) {
               if( measures[i].innerText!== "" ){
                    measure[i] = measures[i].innerText;
               }
            }
            
            contextMeasure.font = "15px Arial";
            for (var i =0 ; i < measure.length ; i++) {
                if(measure[i] !== undefined ){
                    contextMeasure.textAlign="center";
                    if(i === 1){
                        var message_measure = document.getElementById('measure');
                        var message = message_measure.innerText;
                        contextMeasure.fillText(message +' : '+ measure[i],70,350);
                    }
                }
            }
            if ('download' in printMapPng) {
                printMapPng.href = canvas.toDataURL('image/png');
            }
            else {
                var win = window.open("", "MsgWindow", "fullscreen=no,toolbar=no,menubar=no,location=no,titlebar=no,status=no,scrollbars=yes,resizable=yes,top=100,left=100,width=400,height=300");
                var img = canvas.toDataURL("image/png");
                win.document.body.innerHTML= "<img src='" + img + "'></img>";
                win.resizeBy(img.width, img.height);
            }
        });
        GlobalMap.renderSync();
    }, false);
}
