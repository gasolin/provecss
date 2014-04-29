var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var variants = require('rework-font-variant');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();
var imprt  = require('rework-importer');
var path = require('path');

/**
* Expose `purecss`.
*/

module.exports = purecss;

/**
* Rework a CSS `string`
*
* @param {String} string (optional)
* @param {Object} options (optional)
* @return {String}
*/

function purecss (string, options) {
  var browsers;
  var import_path, import_base;
  if(options && options.browsers) {
    browsers = options.browsers;
  }
  if(options && options.path) {
    import_path = path.basename(options.path);
    if(!options.base) {
      import_base = path.dirname(options.path);
    } else {
      import_base = options.base;
    }
  }
  //not run autoprefixer by default
  if(browsers) {
    string = prefixes(browsers).process(string).css;
  }
  if(import_path) {
    string = rework(string)
      .use(imprt({
        path: import_path,
        base: import_base
      })).toString();
  }
  return rework(string, options)
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .use(variants)
    .toString(options);
}
