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
  this.import_filter  = options.import_filter;
  this.vars           = options.vars;
  this.media_match    = options.media_match;
  this.media_extract  = options.media_extract;

  //not run autoprefixer by default
  if (this.browsers) {
    string = prefixes(this.browsers).process(string).css;
  }

  //handle import inlining if any
  if (this.import_path) {
    var opts = {
      path: this.import_path,
      base: this.import_base,
      target: this.import_filter
    };
    string = rework(string).use(imprt(opts)).toString();
  }

  //filter media query if any
  if (this.media_match) {
    if (!this.media_match.width || !this.media_match.height) {
      throw new Error('Must provide device width and device height');
    }
    var extractOptions = {
      deviceOptions: {
        width: this.media_match.width,
        height: this.media_match.height,
        orientation: this.media_match.orientation || 'any'
      },
      extractQuery: this.media_extract
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
