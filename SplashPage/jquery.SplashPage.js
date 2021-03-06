// JavaScript Document
(function($){
"use strict";
	$.fn.splashScreen = function(settings){

		// Providing default options:

		settings = $.extend({
			textLayers		: [],
			textShowTime	: 1500,
			textTopOffset	: 80
		},settings);

		var splashImage = this;

		// Creating the splashScreen div.
		// The rest of the styling is in splashscreen.css

		var splashScreen = $('<div>',{
			id	: 'splashScreen',
			css:{
				backgroundImage		: splashImage.css('backgroundImage'),
				backgroundPosition	: 'center '+splashImage.offset().top+'px',
				height				: $(document).height()
			}
		});

		$('body').append(splashScreen);

		splashScreen.click(function(){
			splashScreen.fadeOut('slow');
		});

		// Binding a custom event for changing the current visible text according
		// to the contents of the textLayers array (passed as a parameter)

		splashScreen.bind('changeText',function(e,newID){

			// If the image that we want to show is
			// within the boundaries of the array:

			if(settings.textLayers[newID]){
				showText(newID);
			}
			else {
				splashScreen.click();
			}
		});	

		splashScreen.trigger('changeText',0);

		// Extracting the functionality into a
		// separate function for convenience.

		function showText(id){
			var text = $('<img>',{
				src:settings.textLayers[id],
				css: {
					marginTop : splashImage.offset().top+settings.textTopOffset
				}
			}).hide();

			text.load(function(){
				text.fadeIn('slow').delay(settings.textShowTime).fadeOut('slow',function(){
					text.remove();
					splashScreen.trigger('changeText',[id+1]);
				});
			});

			splashScreen.append(text);
		}

		return this;
	};

})(jQuery);