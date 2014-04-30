var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();
var imprt  = require('./import.js');
var path = require('path');

/**
* Expose `provecss`.
*/

module.exports = provecss;

/**
* Rework a CSS `string`
*
* @param {String} string (optional)
* @param {Object} options (optional)
* @return {String}
*/

function provecss (string, options) {
  options             = options || {};
  this.browsers       = options.browsers;
  if(options.path) {
    this.import_path  = path.basename(options.path);
    this.import_base  = options.base || path.dirname(options.path);
  }
  this.layout_target  = options.target;

  //not run autoprefixer by default
  if(this.browsers) {
    string = prefixes(this.browsers).process(string).css;
  }

  //handle import inlining if any
  if(this.import_path) {
    var opts = {
      path: this.import_path,
      base: this.import_base,
      target: this.layout_target
    };
    string = rework(string).use(imprt(opts)).toString();
  }

  return rework(string, options)
    .use(vars)
    .use(hex)
    .use(color)
    .use(calc)
    .toString(options);
}
