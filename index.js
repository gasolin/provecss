var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var variants = require('rework-font-variant');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();

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
  if(options && options.browsers) {
    browsers = options.browsers;
  }
  //not run autoprefixer by default
  if(browsers) {
    string = prefixes(browsers).process(string).css;
  }
  return rework(string, options)
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .use(variants)
    .toString(options);
}
