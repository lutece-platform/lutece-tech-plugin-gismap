/** 
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/LayerSwitcher.js
 */

/**
 * Class: OpenLayers.Control.LayerSearchPanel
 *
 * Inherits from:
 *  - <OpenLayers.Control.LayerSwitcher>
 */
OpenLayers.Control.LayerSearchPanel =
OpenLayers.Class(OpenLayers.Control.LayerSwitcher,{
	
	messages: null,
	
	titleLabel: null,
	
	deleteImg: null,
	
	searchForm: null,
	
    searchTextField: null,
    
    searchResultSpan: null,
    
    searchButton: null,
    
    searchWFSParameters: null,
    
    featuresNumber: null,
    
    displayedLayer: null,
    
    sdl: null,
    
    mouseOverObserver:null,
    
    allowSelection: true,
    
	/** property: roundedCorner
	 * {Boolean} If true rounded corners will be added dynamically to the 
	 * 		panel div style
	 */  
    roundedCorner: true,
 
    /**
     * Method: setMessages
     *
     * Properties:
     * messages - <Object>
     */ 
    setMessages: function(messages){
    	this.messages = messages;
    },

    /**
     * Method: addSubmitEvent
     *
     * Properties:
     * evt - <Event>
     */     
    addSubmitEvent: function(evt){
    	 OpenLayers.Event.stopObserving(this.div,"mouseover",this.mouseOverObserver);
	 	 $('.olControlLayerSearchPanelForm').submit($.proxy(this.getFeatures,this));
    },
    
    clickDeleteButton: function(evt){
    	if(this.deleteImg.style.visibility == "visible"){
    		this.deleteImg.style.visibility = "hidden";
    	}
    	this.removeFeatures(evt);
    },
    
    /**
     * Method: removeFeatures
     *
     * Properties:
     * evt - <Event>
     */     
    removeFeatures: function(evt){
    	
    	if( this.displayedLayer != null ){ 
    		this.displayedLayer.destroy(); 
    		this.featuresNumber = 0;
    	}	
    	
    	this.searchResultSpan.innerHTML='';
    	jQuery("body").trigger(jQuery.Event("Map.redraw"));
    },

 
    /**
     * Method: addLayerStyles
     *
     * Properties:
     * styleName - <String>
     */    
    getDefaultStyle: function(layerName)
    {
		var styles = this.layerStyles.namedLayers[layerName].userStyles, style;
        for (var i=0,ii=styles.length; i<ii; ++i) {
            if( styles[i].isDefault){
            	style = styles[i];
            	break;
            }
        }  
        return style;    	
    },
    
    /**
     * Method: addLayerStyles
     *
     * Properties:
     * layerName - <String>
     * styleName - <String>
     */
    getStyle: function(layerName, styleName)
    {
		var styles = this.layerStyles.namedLayers[layerName].userStyles, style;
        for (var i=0,ii=styles.length; i<ii; ++i) {
            if( styles[i].name == styleName){
            	style = styles[i];
            	break;
            }
        }
        if( style == undefined) { style = this.getDefaultStyle(layerName); }
        return style;
    },
    
    /**
     * Method: addLayerStyles
     *
     * Properties:
     * req - <XmlHttpRequest>
     */
    addLayerStyles: function(req){
    	
		var format = new OpenLayers.Format.SLD({multipleSymbolizers:false});
		sld = format.read(req.responseXML || req.responseText);
		this.layerStyles = sld;
    },
    
    /**
     * Method: initLayerStyles
     *
     * Properties:
     * url -
     * layer - 
     */
    initLayerStyles: function(url, layer){
		var request = OpenLayers.Request.GET({
		    url: url,
		    params: {service: "WMS",
		    		 version:"1.1.1",
		    		 request:"GetStyles",
		    		 layers:layer},
		    async: false
		});
		this.addLayerStyles(request);
    },
    
    /**
     * Method: getFeature
     *
     */
    getFeatures: function() {
    	if( this.searchWFSParameters != null )
    	{   
    		// 1 - Initialize WFS request parameters.
			var htLayerParameters = {};
			
			// [strategies]
			htLayerParameters['strategies'] = [ new OpenLayers.Strategy.Fixed({bounds:this.map.getMaxExtent()})  ];

			// [protocol]
			htLayerParameters['protocol'] =  new OpenLayers.Protocol.WFS({
				url:this.searchWFSParameters['url'],
				featureType:this.searchWFSParameters['featureType'],
				featureNS:this.searchWFSParameters['featureNS']
			});
    		
			// [renderers]
			var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
				renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;	
			htLayerParameters['renderers'] = renderer;
			
			// [styleMap]
			htLayerParameters['styleMap'] = new OpenLayers.StyleMap( 
					this.getStyle(this.searchWFSParameters['featureType'],this.searchWFSParameters['featuresStyleName'] ) 
			);
			
	         // [OGCFilter]
			var field = $(".olControlLayerSearchPanelField").val().replace(/%/gi,'*');//manage % as wildcard character
			htLayerParameters['filter'] = new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.LIKE,
				property: this.searchWFSParameters['ogcFilterProperty'],
				value: field
	         });
			// [displayInLayerSwitcher]		
			htLayerParameters['displayInLayerSwitcher'] = false;
			
			// 2 - Remove previous displayed features.				
			this.removeFeatures();
			
			// 3 - Create the new technical vector layer.
			this.displayedLayer = new OpenLayers.Layer.Vector("WFS", htLayerParameters);
				
			// 4 - Register events after adding layer features.
			this.displayedLayer.events.register("loadend", this, function(evt) {	
				var p = document.createElement('p');			
				if( this.featuresNumber++ != 0) {
					var bounds = this.displayedLayer.getDataExtent();
					var zoom = this.displayedLayer.getZoomForExtent(bounds,false) * 1.10;
					this.map.setCenter(bounds.getCenterLonLat(),zoom,false);
			    
					this.deleteImg.setAttribute('title',this.messages['gis.map.layerSearchPanel.drop'].replace('{0}',$(".olControlLayerSearchPanelField").val()));
			    	this.deleteImg.style.visibility = 'visible';
					
				}else{
					p.innerHTML = this.messages['gis.map.layerSearchPanel.empty'].replace('{0}',$(".olControlLayerSearchPanelField").val());
					this.searchResultSpan.appendChild(p);
			    	if(this.deleteImg.style.visibility == "visible"){
			    		this.deleteImg.style.visibility = "hidden";
			    	}
				}
			});


			this.displayedLayer.events.register("featureadded", this, function(evt){
				this.featuresNumber++;
			});
			// 5 - Add the layer to the map.
			this.map.addLayer( this.displayedLayer );
			
			// 6 - Send redraw event for the sliders
			jQuery("body").trigger(jQuery.Event("Map.redraw"));
    	}
    	return false;
    },
    
   /**
    * Method: setMap
    *
    * Properties:
    * map - {<OpenLayers.Map>}
    */
    setMap: function(map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.map.events.on({
    	            "addlayer": this.redraw,
    	            "changelayer": this.redraw,
    	            "removelayer": this.redraw,
    	            "changebaselayer": this.redraw,
    	            scope: this
    	        });
        // Look for a searchable layer and its WFS request parameters
	    var layers = this.map.layers.slice();
	    for(var i=0, len=layers.length; i<len && this.searchWFSParameters == null ; i++) 
	    {
	    	
	    	if( !layers[i].isBaseLayer && layers[i].isSearchableLayer)
	    	{
	    		this.searchWFSParameters = layers[i].searchWFSParameters;
	    		this.initLayerStyles(layers[i].url,this.searchWFSParameters['featureType']);
	    	}
	    } 	
    },
    
    redraw: function (){
    	// ignore
        return this.div;
    },
    
   /**
    * Method: draw
    *
    * Returns:
    * {DOMElement} A reference to the DIV DOMElement containing the
    *     switcher tabs.
    */ 
    draw: function() {
      OpenLayers.Control.prototype.draw.apply(this);
    	
      // create layout divs
      this.loadContents();

      // set mode to minimize
      if(!this.outsideViewport) {
    	  this.minimizeControl();
   	  }
   	
      // populate div with current info
      this.redraw();   

      return this.div;
    },   
     
    /** 
     * Method: ignoreEvent
     * 
     * Parameters:
     * evt - {Event} 
     */
    ignoreEvent: function(evt) {
        OpenLayers.Event.stop(evt,true);
    },
    
    /**
     * Method: loadContents
     * Set up the labels and divs for the control
     */
     loadContents: function() {

    	 //configure main div
    	 
    	 OpenLayers.Event.observe(this, "submit", this.listenSubmitEvent);
    	 
    	 OpenLayers.Event.observe(this.div, "mouseup",OpenLayers.Function.bindAsEventListener(this.mouseUp, this));  	  
    	 //OpenLayers.Event.observe(this.div, "mouseup", this.ignoreEvent); 
    	 OpenLayers.Event.observe(this.div, "click",this.ignoreEvent);	        
    	 OpenLayers.Event.observe(this.div, "mousedown", this.ignoreEvent);  	        
    	 OpenLayers.Event.observe(this.div, "dblclick", this.ignoreEvent);
    	 OpenLayers.Event.observe(this.div, "keyup", this.ignoreEvent);
    	 OpenLayers.Event.observe(this.div, "keydown", this.ignoreEvent);
    	
    	 // layers list div       
    	 this.layersDiv = document.createElement("div");
    	 this.layersDiv.id = this.id + "_layersDiv";
    	 OpenLayers.Element.addClass(this.layersDiv, "layersDiv");    	
    	 
    	 this.titleLabel = document.createElement('label');
    	 this.titleLabel.innerHTML = this.messages['gis.map.layerSearchPanel.title'];
    	 this.titleLabel.setAttribute('class',this.displayClass+'Title');  
    	 
    	 this.searchTextField = document.createElement('input');
    	 this.searchTextField.setAttribute('type','text');
    	 this.searchTextField.setAttribute('name','olControlLayerSearchPanelField');
    	 this.searchTextField.setAttribute('class','olControlLayerSearchPanelField');
    	        
    	 //OpenLayers.Event.observe(this.input, "click",this.focusInputField);   	        
    	 this.searchButton = document.createElement('input');
    	 this.searchButton.setAttribute('name','submitButton');
    	 this.searchButton.setAttribute('type','submit');
    	 this.searchButton.setAttribute('value', this.messages['gis.map.layerSearchPanel.button']);
    	 this.searchButton.setAttribute('class','olControlLayerSearchPanelButton');
    	 
    	 this.searchResultSpan = document.createElement('span');
    	 this.searchResultSpan.setAttribute('class','olControlLayerSearchPanelSpanResult');  
    	 
    	 this.deleteImg = document.createElement('img');
    	 // this.deleteImg.setAttribute('name','submitButton');
    	 this.deleteImg.setAttribute('class','olControlLayerSearchPanelDeleteButton');
    	 // this.deleteImg.setAttribute('value','deleteButton');
    	 // this.deleteImg.setAttribute('type', 'image');
		 this.deleteImg.setAttribute('src', './images/admin/skin/plugins/gis/openlayers/delete_on.png');
		 OpenLayers.Event.observe(this.deleteImg, "click",OpenLayers.Function.bindAsEventListener(this.clickDeleteButton,this));
		 
    	 this.searchForm = document.createElement('form');
    	 this.searchForm.setAttribute('name','searchForm');
    	 this.searchForm.setAttribute('class','olControlLayerSearchPanelForm');
    	 this.searchForm.appendChild(this.searchTextField);
    	 this.searchForm.appendChild(this.searchButton);
    	 this.searchForm.appendChild(this.deleteImg);

    	 /*
    	  * TODO Maybe they is an other solution to do that.
    	  * Bind an event handler to the "submit" JavaScript event, after displaying the panel. 
    	  */
    	 this.mouseOverObserver = OpenLayers.Function.bindAsEventListener(this.addSubmitEvent,this);
    	 OpenLayers.Event.observe(this.div,"mouseover",this.mouseOverObserver);
    	        
    	 this.layersDiv.appendChild(this.titleLabel);
    	 this.layersDiv.appendChild(document.createElement('br'));
    	 this.layersDiv.appendChild(this.searchForm);
    	 this.layersDiv.appendChild(this.searchResultSpan);
   	        
    	 this.div.appendChild(this.layersDiv);

    	 if(this.roundedCorner) {
			 this.layersDiv.style.borderRadius = "10px";
			 this.layersDiv.style.opacity = 0.75;
			 this.layersDiv.style.filter = "alpha(opacity=75)";
			//-- DEPRECATED
    	            // OpenLayers.Rico.Corner.round(this.div, {
    	                // corners: "tr br",
    	                // bgColor: "transparent",
    	                // color: this.roundedCornerColor,
    	                // blend: false
    	            // });
                // OpenLayers.Rico.Corner.changeOpacity(this.layersDiv, 0.75);
			//-- DEPRECATED
    	 }
    	
    	 var imgLocation = OpenLayers.Util.getImagesLocation();
    	 var sz = new OpenLayers.Size(18,18);       
    	
    	 // maximize button div
    	 var img = imgLocation + 'layer-search-maximize.png';
    	 this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(
    	                                    "OpenLayers_Control_MaximizeDiv",
    	                                    null,
    	                                    sz,
    	                                    img,
    	                                    "absolute");
    	 OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv");
    	 this.maximizeDiv.style.display = "none";
    	 OpenLayers.Event.observe(this.maximizeDiv, "click",
    	            OpenLayers.Function.bindAsEventListener(this.maximizeControl, this)
    	 );
    	       
    	 this.div.appendChild(this.maximizeDiv);
    	
    	 // minimize button div
    	 var img = imgLocation + 'layer-search-minimize.png';
    	 var sz = new OpenLayers.Size(18,18);       
    	 this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv(
    	                                    "OpenLayers_Control_MinimizeDiv",
    	                                    null,
    	                                    sz,
    	                                    img,
    	                                    "absolute");
    	 OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv");
    	 this.minimizeDiv.style.display = "none";
    	 OpenLayers.Event.observe(this.minimizeDiv, "click",
    	            OpenLayers.Function.bindAsEventListener(this.minimizeControl, this)
    	 );
    	
    	 this.div.appendChild(this.minimizeDiv);
    },
    CLASS_NAME: "OpenLayers.Control.LayerSearchPanel"
});