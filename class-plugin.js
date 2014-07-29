;(function ( $, window, document, undefined ) {
	var pluginName = "programs",
		defaults = {
			script: "http://maps.raleighnc.gov/arcgis/rest/services/Parks/ParkLocator/MapServer/exts/ParkLocatorSOE/ProgramSearch"
	
		};
	function Plugin( element, options ) {
		var plugin = this;
		this.options = $.extend( {}, defaults, options );
		$.ajax({url: defaults.script, data: {name: options.name, f: 'json'}, dataType: 'json'}).done(function (data) {
			if (data.Programs) {
				if (data.Programs.Sections.length > 0) {
					var sectionSelect = $('<select><option>Select a section...</option></select>').appendTo(element);
					$.each(data.Programs.Sections, function (i, section) {
						sectionSelect.append('<option>'+section.Name+'</option>');
					});	
				}
			}
		});
	}

	$.fn[pluginName] = function (options) {
        	return this.each(function() {

            	if (!$.data(this, 'plugin_' + pluginName)) {

                	$.data(this, 'plugin_' + pluginName, new Plugin(this, options));

            	}

            	else if ($.isFunction(Plugin.prototype[options])) {

                	$.data(this, 'plugin_' + pluginName)[options]();

            	}

        	});

	};
})(jQuery, window, document);

