#! /usr/bin/env node

var program = require('commander');
var processor = require('./index');
var fs = require('fs');

program
  .version('0.4.0')
  .option('-v, --vars', 'enable CSS variable replacing')
  .parse(process.argv);

if (process.argv.length < 4) {
  console.log('the syntax should be `provecss source target [options]`');
} else {
  var option = {};
  var src = process.argv[2];
  var dest = process.argv[3];

  if (program.vars) {
    option.vars = program.vars
  }
  // read file
  var input = fs.readFileSync(src, 'utf8');
  var output = processor(input, option);

  // write file
  fs.writeFileSync(dest, output);
}
