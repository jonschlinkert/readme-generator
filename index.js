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

// data cache
var data = {bugs: {url: ''}};

// Get the current year
helpers.year = require('year');
// Get the current month
helpers.month = require('month');
// Get the current month day
helpers.day = require('month-day');
// Get the current date: e.g. `January 1, 2017`
helpers.today = function() {
  return helpers.month('MMMM')
    + ' ' + helpers.day('DD')
    + ', ' + helpers.year();
};
helpers.include = function(filename, options) {
  var fp = path.resolve(data.cwd, filename);
  return render(read(fp).contents, options);
};

function render(str, options) {
  str = str.split('<%%').join('__OPEN__');
  options = options || {};
  var settings = merge({}, options.settings);
  settings.imports = merge({}, settings.imports, options.helpers, helpers);
  var engine = new Engine(settings);
  data = merge({username: ''}, data, options);

  if (data.author && typeof data.author === 'string') {
    data.author = parseAuthor(data.author);
    var m = /github\.com\/(.*)/.exec(data.author.url);
    if (!data.username && m) {
      data.username = m[1];
    }
  }
  var res = engine.render(str, data);
  return format(res).split('__OPEN__').join('<%');
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

module.exports.render = render;
module.exports.read = read;
