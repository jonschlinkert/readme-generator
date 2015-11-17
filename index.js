/*!
 * readme-generator <https://github.com/jonschlinkert/readme-generator>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Engine = require('engine');
var Remarkable = require('remarkable');
var prettify = require('pretty-remarkable');
var helpers = require('template-helpers');
var parseAuthor = require('parse-author');
var merge = require('mixin-deep');
var lib = require('./lib');

// data cache
var data = {};

function render(str, options) {
  options = options || {};
  var settings = merge({}, options.settings);
  settings.imports = merge({include: include}, helpers, lib.helpers);
  var engine = new Engine(settings);
  data = merge(data, options);
  data.username = 'unknown';

  if (data.author && typeof data.author === 'string') {
    data.author = parseAuthor(data.author);
    if (/github\.com/.test(data.author.url)) {
      data.username = data.author.url.split('github.com/').pop();
    }
  }
  var res = engine.render(str, data);
  return format(res);
}

function include(fp, options) {
  fp = path.resolve(data.cwd, fp);
  var file = read(fp);
  return render(file.contents, options);
}

function read(fp) {
  var str = fs.readFileSync(fp, 'utf8');
  data.cwd = path.dirname(fp);
  return {
    path: fp,
    contents: str
  };
}

function format(str, options) {
  return new Remarkable()
    .use(prettify)
    .render(str);
}

module.exports = {
  render: render,
  read: read
};
