#! /usr/bin/env node

var program = require('commander');
var processor = require('./index');
var fs = require('fs');

function filter(val) {
  return val.split(',');
}

program
  .version('0.4.2')
  .usage('source target [options]')
  .option('-v, --vars', 'enable CSS variable replacing')
  .option('-i, --import', 'enable import inlining')
  .option('-f, --filter <items>', 'enable import filtering', filter)
  .parse(process.argv);

if (process.argv.length < 4) {
  console.log(program.help());
} else {
  var option = {};
  var src = process.argv[2];
  var dest = process.argv[3];

  if (program.vars) {
    option.vars = program.vars;
  }
  if (program.import) {
    option.path = src;
  }
  if (program.filter) {
    option.path = src; //carry on import inlining
    option.import_filter = program.filter;
  }
  // read file
  var input = fs.readFileSync(src, 'utf8');
  var output = processor(input, option);

  // write file
  fs.writeFileSync(dest, output);
}
