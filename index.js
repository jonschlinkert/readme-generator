/*!
 * readme-generator <https://github.com/jonschlinkert/readme-generator>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Remarkable = require('remarkable');
var prettify = require('pretty-remarkable');
var helpers = require('template-helpers');
var lib = require('./lib');
var _ = require('lodash');

// data cache
var data = {};

function render(str, options) {
  options = options || {};
  var settings = _.extend({}, options.settings);
  settings.imports = _.merge({include: include}, helpers, lib.helpers);
  data = _.merge(data, options);
  var fn = _.template(str, settings);
  return format(fn(data));
}

function include(fp, options) {
  var str = read(fp);
  return render(str, options);
}

function read(fp) {
  return fs.readFileSync(fp, 'utf8');
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
