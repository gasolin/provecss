var assert = require('assert');
var child = require('child_process');
var fs = require('fs');
var provecss = require('../index.js');
var path = require('path');
var Stream = require('stream').Readable;

var features = [
  'calc',
  'color',
  'hex',
  'vars'
];

/**
 * provecss node API tests.
 */
describe('provecss', function () {
  it('should return a css string', function () {
    assert('string' === typeof provecss('body {}'));
  });
});

/**
* Rework feature tests.
*/
describe('features', function () {
  features.forEach(function (name) {
    it('should add ' + name + ' support', function () {
      var input = read('features/' + name);
      var output = read('features/' + name + '.out');
      var option = {};
      option[name] = true;
      assert.equal(provecss(input, option).trim(), output.trim());
    });
  });
});

/**
 * @import feature
 */
describe('@import inlining feature', function () {
  it('should add path option support', function () {
      var input = read('features/imprt');
      var output = read('features/imprt.out');
      assert.equal(provecss(input,
                           {path:"test/features/imprt.css"}).trim(),
                   output.trim());
  });

  it('should add base option support', function () {
      var input = read('features/imprt');
      var output = read('features/imprt.out');
      assert.equal(provecss(input,
                           {
                            path:"imprt.css",
                            base: "test/features/"
                           }).trim(),
                   output.trim());
  });

  it('should generate css based on target option (core)', function () {
      var input = read('features/imprt');
      var output = read('features/imprt_core.out');
      var option = {
        path: 'test/features/imprt.css',
        target: ['core']
      };
      assert.equal(provecss(input, option).trim(), output.trim());
  });

  it('should generate css based on target option (core+large)', function () {
      var input = read('features/imprt');
      var output = read('features/imprt_large.out');
      var option = {
        path: 'test/features/imprt.css',
        target: ['core', 'large']
      };
      assert.equal(provecss(input, option).trim(), output.trim());
  });

  it('should generate css based on target option (core+xlarge)', function () {
      var input = read('features/imprt');
      var output = read('features/imprt_xlarge.out');
      var option = {
        path: 'test/features/imprt.css',
        target: ['core', 'xlarge']
      };
      assert.equal(provecss(input, option).trim(), output.trim());
  });

  it('should generate css based on target option (core+large+xlarge)', function () {
      var input = read('features/imprt');
      var output = read('features/imprt.out');
      var option = {
        path: 'test/features/imprt.css',
        target: ['core', 'large' , 'xlarge']
      };
      assert.equal(provecss(input, option).trim(), output.trim());
  });

});

/**
 * auto prefix feature
 */
describe('auto prefix feature', function () {
  it('should add browser option support', function () {
      var input = read('features/prefixes');
      var output = read('features/prefixes.out');
      assert.equal(provecss(input,
                   {browsers: ['> 1%', 'last 2 versions',
                               'ff 24', 'opera 12.1']}).trim(),
                   output.trim());
  });

  it('should add chrome specific support', function () {
      var input = read('features/prefixes');
      var output = read('features/prefixes_cr9.out');
      assert.equal(provecss(input,
                   {browsers: ['chrome 9']}).trim(),
                   output.trim());
  });

  it('should add firefox specific support', function () {
      var input = read('features/prefixes');
      var output = read('features/prefixes_ff24.out');
      assert.equal(provecss(input,
                   {browsers: ['firefox 24']}).trim(),
                   output.trim());
  });
});

/**
* Read a fixture by `filename`.
*
* @param {String} filename
* @return {String}
*/

function read (filename) {
  var file = resolve(filename);
  return fs.readFileSync(file, 'utf8');
}

/**
* Resolve a fixture by `filename`.
*
* @param {String} filename
* @return {String}
*/

function resolve (filename) {
  return path.resolve(__dirname, filename + '.css');
}