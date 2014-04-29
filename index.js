var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var variants = require('rework-font-variant');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();
var imprt  = require('rework-importer');

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
  var path;
  if(options && options.browsers) {
    browsers = options.browsers;
  }
  if(options && options.path) {
    path = options.path;
  }
  //not run autoprefixer by default
  if(browsers) {
    string = prefixes(browsers).process(string).css;
  }
  if(path) {
    string = rework(string)
      .use(imprt({
        path: path,
        base: __dirname + '/test/features'
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
