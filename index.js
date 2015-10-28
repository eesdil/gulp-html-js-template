var gutil = require('gulp-util');
var through = require('through2');
var _ = require('lodash');
var template = _.template;

//consts
const PLUGIN_NAME = 'gulp-html-js-template';


module.exports = function( options ) {
	
	if( options == undefined ) {
		options = {};
	}
	
	if( options.ext == undefined ) {
		options.ext = 'js';
	}
	
	return through.obj( function( file, enc, cb ) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if( file.isStream() ) {
			cb(new gutil.PluginError( PLUGIN_NAME, 'Streaming not supported'));
			return;
		}
		
		if( file.isBuffer() ) {
			
			var html = file.contents.toString();
			var templates = getEscapedTemplateContent(html);
            var fileContent = templateString();
			var compiled = template( fileContent );
			var content = compiled( { templates:JSON.stringify( templates ) } );
			file.contents = new Buffer( content );
		}

		// adjust file extension
		file.path = file.path.replace(/\.\w+$/gi, '.' + options.ext );
		this.push( file );
		
		return cb();
	});
};

function getEscapedTemplateContent(templateContent) {
    return templateContent
        .replace(/\\/g, "\\\\");
};

function templateString() {
    return 'var template = <%= templates %> \n' +
        'export default template; \n' +
        'export { template };';
};
