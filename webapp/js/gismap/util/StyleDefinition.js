/*global ol */
/**
 * StyleDefinition Class define all styles of the layers in the map
 */
function StyleDefinition() {
    'use strict';
    /**
     * listStyles contains all styles definition of the map
     * @type {Array}
     */
    this.listStyles = [];
    /**
     * listMaps contains the correspondence table between the data and the style
     * @type {Array}
     */
    this.listMaps = [];

    /**
     * StyleDefinition Method
     * getMapCorrespondence is a getter to access at the right correspondence table
     * @param mapThematic is the name of the correspondence table
     * @returns {*} the correspondence table
     */
    this.getMapCorrespondence = function (mapThematic){
        return this.listMaps[mapThematic];
    };

    /**
     * StyleDefinition Method
     * getStyleThematic is a getter to access at the right style definition
     * @param styleThematic is the name of the style definition
     * @returns {*} the style definition
     */
    this.getStyleThematic = function(styleThematic){
        return this.listStyles[styleThematic];
    };

    /**
     * defaultFill define the default fill style of geometry
     * @type {ol.style.Fill}
     */
    var defaultFill = new ol.style.Fill({
        color: 'rgba(141, 205, 227, 0.3)'
    });

    /**
     * defaultStroke define the default stroke style of geometry
     * @type {ol.style.Stroke}
     */
    var defaultStroke = new ol.style.Stroke({
        color: 'rgba(175, 205, 245, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * defaultFill define the default fill style of text
     * @type {ol.style.Fill}
     */
    var defaultTextFill = new ol.style.Fill({
        color: '#fff'
    });

    /**
     * defaultStroke define the default stroke style of text
     * @type {ol.style.Stroke}
     */
    var defaultTextStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 3
    });

    /**
     * text define the text style for label
     * @type {ol.style.Text}
     */
    var textStyle = new ol.style.Text({
        scale: 1.4,
        fill: defaultTextFill,
        stroke: defaultTextStroke,
        text: ''
    });

    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var thematicFill = new ol.style.Fill({
        color: 'rgba(153, 255, 204, 0.75)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var thematicStroke = new ol.style.Stroke({
        color: 'rgba(153, 255, 255, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fille = new ol.style.Fill({
        color: 'rgba(153, 35, 204, 0.75)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke = new ol.style.Stroke({
        color: 'rgba(153, 35, 255, 1)',
        lineDash: [0,0],
        width: 3
    });

    /********** STYLE LIBRAIRY ************************/
	 /**
     * defaultFill define the default fill style of geometry
     * @type {ol.style.Fill}
     */
    var fill_BlueSky = new ol.style.Fill({
        color: 'rgba(141, 205, 227, 0.3)'
    });

    /**
     * defaultStroke define the default stroke style of geometry
     * @type {ol.style.Stroke}
     */
    var stroke_BlueSky = new ol.style.Stroke({
        color: 'rgba(175, 205, 245, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * defaultFill define the default fill style of text
     * @type {ol.style.Fill}
     */
    var fill_White = new ol.style.Fill({
        color: '#fff'
    });

    /**
     * defaultStroke define the default stroke style of text
     * @type {ol.style.Stroke}
     */
    var stroke_Black = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 1)',
        width: 3
    });


    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fill_GreenWater = new ol.style.Fill({
        color: 'rgba(153, 255, 204, 0.75)'
    });
	
	/**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fill_Green = new ol.style.Fill({
        color: 'rgba(56, 240, 20, 1)'
    });
	
	/**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke_Green = new ol.style.Stroke({
        color: 'rgba(56, 240, 20, 1)',
        lineDash: [0,0],
        width: 3
    });
    
    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fill_Gray = new ol.style.Fill({
        color: 'rgba(154, 146, 146, 1)'
    });
	
	/**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke_Gray = new ol.style.Stroke({
        color: 'rgba(154, 146, 146, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke_Cyan = new ol.style.Stroke({
        color: 'rgba(153, 255, 255, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fill_Violet = new ol.style.Fill({
        color: 'rgba(153, 35, 204, 0.75)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke_Violet = new ol.style.Stroke({
        color: 'rgba(153, 35, 255, 1)',
        lineDash: [0,0],
        width: 3
    });
	
	/**
     * Sample of style definition
     * @type {ol.style.Fill}
     */
    var fill_Blue = new ol.style.Fill({
        color: 'rgba(20, 97, 240, 1)'
    });

    /**
     * Sample of style definition
     * @type {ol.style.Stroke}
     */
    var stroke_Blue = new ol.style.Stroke({
        color: 'rgba(20, 97, 240, 1)',
        lineDash: [0,0],
        width: 3
    });

    /**
     * text define the text style for label
     * @type {ol.style.Text}
     */
    var text_WhiteAndBlack = new ol.style.Text({
        scale: 1.4,
        fill: fill_White,
        stroke: stroke_Black,
        text: ''
    });

    /**
     * text define the text style for label
     * @type {ol.style.Text}
     */
    var text_VioletAndBlueSky = new ol.style.Text({
        scale: 1.4,
        fill: fill_Violet,
        stroke: stroke_BlueSky,
        text: ''
    });

    /**
     * Sample of style definition
     * @type {ol.style.Style}
     */
    var iconStyle = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			src: 'css/img/lutece-logo.png'
		})
    });
    
    
    /**
     * !!! Do not delete !!!
     * Default style definition suitable for either Point, Lines or Polygons geometries
     *  - used for default feature styling
     * @type {ol.style.Style}
     */
    this.defaultStyle =  new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: 'rgba(150, 220, 255, 0.75)'
          }),
        });

 /**
 * !!! Do not delete !!!
 * Default style definition for immersive view marker
 * @type {ol.style.Style}
 */
this.defaultImmersiveViewMarkerStyle = new ol.style.Style({
    image: new ol.style.Icon (/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsdJREFUeNpi+P//PwNDSsN/MA1l/GdYef0/I4hmXHXjP8PulQwAAcQM4jQ+ZbzAxHiK4b+/gbo+MwMDY8NNPhkGgABigJnAcPI/BAPZzCC1DKn1Ev6nVzDc3LaWgUFNnwEggCAmpjZOAFqUD8SK/2fXP2AEaw1KZ2AQlmBgWDeDgeHty4lMQFkGnr0rGP6bARlBGSBuPljwi5kHw4GbDxhgACR4EeRCx3scDAyzGxmAZjICBBDMIgGg5HsG7OAiUKEByHKIa6AO4Fk1geHLx48MDK7hDAwKGmATYdbkg1kgVwIFP/cUgKxi2K/PATHPJx5MgUxUANL3GYTFYS5HgF8/GBgWdkIUQgKcATlAUADIIyAaIICQFYJM3gDE+lA1E4GKCmAaYL6+gKQAHQgCNXxggVqpj+HGty+AUTCTARpsjJC4AYHUegaGBzcYQAHNw8/P8CWsAFkxJL7AYQYE/q8vgIMGFESg8AQHGQRA4pCBVwAcFA1+DnCbwYGOBCAKr5xgYGDjYDBsmgmO9ICpK+C2wKIR4cb4crBiFABJTyCWIgvI+2CfgWIAmBwZ1AwYGH7+AHsKKVE8QA7w/1jCEB7oAAEGVwiPARxRiQOgxB5yDILS7QGMWAQ5WR6YJNmhfgQ5/SEwTm5dxEjbQOwAimlEaoQBUIz7JGAGFDoApdQtC2CBBwOKzAxGDiCXScBd5BnDwMDMAkkdq6cy+P97wTBDi4chgeMDw4cjOyB5H5QAQFjTBBjRH5ANdWRB8SYoRmC2A2Nlf0k8g4O6AlwaxAalA8eehZAkCdODCAJ9JhRvgMIIBIDeBaXbCXtOYPgUJAaSw9ADixR4GQEDsMIKBIDe5jm1A558wZkDWESByw7UHAWPdfRiEBEx9gHImQUVgAw6uAE9QsBJCDnBYk86hAE8yWBN2EjFDyjBOmCx4CLU4gmgLISuFwDimD6XRPI8JAAAAABJRU5ErkJggg=='
    }))
});    

	/**
	 * Sample of correspondence table
	 * @type {Map}
	 */
	this.listMaps['map_Unique'] = {

	};

    /**
     * Sample of correspondence table
     * @type {Map}
     */
    this.listMaps['mapStyle1'] = {
        '75116':"5",
        '75115':"4",
        '75114':"3",
        '75113':"2",
        '75112':"1",
        'seck':'souche',
        'ADRNIVX_0000000268193673':'souche'
    };
    
    /**
     * Sample of style definition
     * @type {}
     */
    this.listStyles['defaultStyle1'] = {
        '1': new ol.style.Style({
            fill: fille,
            stroke: stroke
        }),
        '2': new ol.style.Style({
            fill: thematicFill,
            stroke: stroke
        }),
        '3': new ol.style.Style({
            fill: fille,
            stroke: stroke
        }),
        '4': new ol.style.Style({
            fill: thematicFill,
            stroke: thematicStroke
        }),
        '5': new ol.style.Style({
            fill: fille,
            stroke: thematicStroke
        }),
        'default': new ol.style.Style({
            fill: defaultFill,
            stroke: defaultStroke
        })
    };

    this.listMaps['map_StyleSouillureComplex'] = {
        '1':"1",
        '2':"2",
        '3':"3",
		'4':"4",
        '5':"5",
        '6':"6"
    };

 
    
    /**
     * Type d'encombrant
     */
    this.listMaps['map_TypeEncombrant'] = {
        'nonaffecte':"pointNonAffecte",
        'affecte':"pointAffecte"
    };



    /**
     * Sample of style definition
     * @type {}
     */
    this.listStyles['IdeationStyle'] = {
        '1': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: stroke
        }),
        '2': new ol.style.Style({
            text: textStyle,
            fill: thematicFill,
            stroke: stroke
        }),
        '3': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: stroke
        }),
        '4': new ol.style.Style({
            text: textStyle,
            fill: thematicFill,
            stroke: thematicStroke
        }),
        '5': new ol.style.Style({
            text: textStyle,
            fill: fille,
            stroke: thematicStroke
        }),
        'default': new ol.style.Style({
            text: textStyle,
            fill: defaultFill,
            stroke: defaultStroke
        })
    };
    
 
    var iconSquareBlue = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/square_blue_.png'
		})
    });
    var iconSquareGray = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/square_gray_.png'
		})
    });
    var iconSquareGreen = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/square_green_.png'
		})
    }); 
    var iconCircleBlue = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/circle_blue_.png'
		})
    });
    var iconCircleGray = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/circle_gray_.png'
		})
    });
    var iconCircleGreen = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/circle_green_.png'
		})
    }); 
	var iconCircleYellow = new ol.style.Style({
        image : new ol.style.Icon({
			anchor : [0.5,0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			scale: 0.2,
			src: 'css/img/circle_yellow_.png'
		})
    });
	
	/**
     * Encombrant style 
     * @type {}
     */
    this.listStyles['StyleUnique'] = {
        'default': iconCircleBlue
    };
}