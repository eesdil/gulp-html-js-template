HTML templates to JS
====================

! Important. This is just a quick hack to create js template for .html import for typescript.


This gulp plugin converts a html file with templates into a js file containing an object with all templates as strings.

Writing template inside a structured HTML file is much more practical than in a one line javascript string.
Therefore this plugin turns a HTML file with templates into a js object.
You can use whatever template language you like it simply turns the html nodes into a js string.
It will take the html id attribute as the key and its innerHTML as the value.

Usage
-----
An example usage with gulp:
```javascript
var gulp        = require('gulp');
var html2js = require('gulp-html-js-template');

gulp.task('template', function() {
	return gulp.src( 'my/template.html' )
	.pipe( html2js() )
	.pipe( gulp.dest( 'output' ) );
});
```

Example
-------

This example shows how this plugin turn html into a js object.

*HTML Source* :
```html
<div>
    <p>A {{ handlebar }} example.</p>
</div>
```

*The generated output* :
```javascript
var template = "<p>A {{ handlebar }} example.</p>";
export { template };
```
