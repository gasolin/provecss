#! /usr/bin/env node

var program = require('commander');
var processor = require('./index');
var fs = require('fs');

function filter(val) {
  return val.split(',');
}

function match(val) {
  var deviceinfo = val.split('x');
  if (deviceinfo.length === 2) {
    return {
      width: parseInt(deviceinfo[0]) + 'px',
      height: parseInt(deviceinfo[1]) + 'px'
    };
  } else {
    console.log('the match option should fit [width]x[height] format');
    return {};
  }
}

function browsers(val) {
  if (val === 'all') {
     val = '> 1%,last 2 versions,Firefox ESR,Opera 12.1,BlackBerry 10,Android 4'; 
  }
  return val.split(',');
}

program
  .version('0.5.0')
  .usage('source target [options]')
  .option('-v, --vars', 'enable CSS variable replacing')
  .option('-i, --import', 'enable import inlining')
  .option('-f, --filter <targets>', 'enable import filtering', filter)
  .option('-m, --match <WidthxHeight>', 'enable media matching', match)
  .option('-e, --extract', 'enable media extracting')
  .option('-b, --browsers <browsers>', 'enable auto-prefixing', browsers)
  .parse(process.argv);

if ((process.argv.length < 4) ||
   (process.argv[2].indexOf('--') !== -1 || process.argv[3].indexOf('--') !== -1)) {
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
  if (program.match) {
    option.media_match = program.match;
  }
  if (program.extract) {
    option.media_extract = program.extract;       
  }
  if (program.browsers) {
    console.log('applying rule: ' + program.browsers);
    option.browsers = program.browsers;       
  }

  // read file
  var input = fs.readFileSync(src, 'utf8');
  var output = processor(input, option);

  // write file
  fs.writeFileSync(dest, output);
}
