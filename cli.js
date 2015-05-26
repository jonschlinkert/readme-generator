#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var symbol = require('log-symbols');
var argv = require('minimist')(process.argv.slice(2));
var writeFile = require('write');
var pkg = require('load-pkg');

var generator = require('./');

var local = path.join(process.cwd(), '.readme.md');
if (fs.existsSync(local)) {
  local = generator.read(local).contents;
} else {
  local = null;
}

var template = argv.template || argv.t || local || generator.read(__dirname + '/template.md').contents;

writeFile('README.md', generator.render(template, pkg), function(err) {
  if (err) console.log(err);
  console.log(symbol.success + ' successfully generated README.md');
});
