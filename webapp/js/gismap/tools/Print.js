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
            var canvas = event.context.canvas;
            printMapPng.href = canvas.toDataURL('image/png');
        });
        GlobalMap.renderSync();
    }, false);
}