#!/usr/bin/env node

var fs = require('fs');
var ok = require('log-ok');
var path = require('path');
var writeFile = require('write');
var pkg = require('load-pkg').sync(process.cwd());
var Config = require('expand-pkg');
var config = new Config();
var generator = require('./');
var merge = require('mixin-deep');
var argv = require('yargs-parser')(process.argv.slice(2), {
  alias: {template: 't'}
});

var local = path.join(process.cwd(), '.readme.md');
if (fs.existsSync(local)) {
  local = generator.read(local).contents;
} else {
  local = null;
}

var template = argv.t || local || generator.read(__dirname + '/template.md').contents;
var data = merge({}, config.expand(pkg), argv);

writeFile('README.md', generator.render(template, data), function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  ok('generated README.md');
  process.exit();
});
