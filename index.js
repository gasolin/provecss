var color = require('rework-color-function');
var prefixes = require('autoprefixer');
var rework = require('rework');
var calc = require('rework-calc');
var hex = require('rework-hex-alpha');
var vars = require('rework-vars')();
var imprt = require('./import.js');
var path = require('path');
var move = require('rework-move-media')();
var extract = require('./css-mediaquery-extract.js');

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

function provecss(string, options) {
  options             = options || {};
  this.browsers       = options.browsers;
  if (options.path) {
    this.import_path  = path.basename(options.path);
    this.import_base  = options.base || path.dirname(options.path);
  }
  this.layout_target  = options.target;
  this.vars           = options.vars;
  this.device_info    = options.deviceInfo;
  this.extract_query  = options.extractQuery;

  //not run autoprefixer by default
  if (this.browsers) {
    string = prefixes(this.browsers).process(string).css;
  }

  //handle import inlining if any
  if (this.import_path) {
    var opts = {
      path: this.import_path,
      base: this.import_base,
      target: this.layout_target
    };
    string = rework(string).use(imprt(opts)).toString();
  }

  //filter media query if any
  if (this.device_info) {
    if (!this.device_info.width || !this.device_info.height) {
      throw new Error('Must provide device width and device height');
    }
    var extractOptions = {
      deviceOptions: {
        width: this.device_info.width,
        height: this.device_info.height,
        orientation: this.device_info.orientation || 'any'
      },
      extractQuery: extract_query
    };
    string = rework(string).use(move).use(extract(extractOptions)).toString();
  }

  if (this.vars) {
    string = rework(string).use(vars).toString();
  }

  return rework(string, options)
    .use(hex)
    .use(color)
    .use(calc)
    .toString(options);
}
