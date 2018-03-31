/*!
 * readme-generator <https://github.com/jonschlinkert/readme-generator>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Engine = require('engine');
const Remarkable = require('remarkable');
const prettify = require('pretty-remarkable');
const helpers = require('template-helpers');
const parseAuthor = require('parse-author');
const merge = require('mixin-deep');

function render(input, options = {}, locals = {}) {
  let context = merge({ bugs: { url: '' } }, locals);

  helpers.year = require('year');    // Get the current year
  helpers.month = require('month');  // Get the current month
  helpers.day = require('month-day');// Get the current month day
  // Get the current date: e.g. `January 1, 2017`
  helpers.today = function() {
    return helpers.month('MMMM') + ' ' + helpers.day('DD') + ', ' + helpers.year();
  };

  helpers.include = function(filename, options) {
    let cwd = context.cwd;
    if (filename.slice(0, 2) !== './' && !fs.existsSync(path.join(cwd, filename))) {
      cwd = path.join(__dirname, 'templates/includes');
      if (!/\.md$/.test(filename)) {
        filename += '.md';
      }
    }

    let fp = path.resolve(cwd, filename);
    return render(read(fp).contents, options, context);
  };

  function format(str, options) {
    return new Remarkable().use(prettify).render(str, options);
  }

  const str = input.split('<%%').join('__OPEN__');
  const settings = Object.assign({}, options.settings);
  settings.imports = merge({}, settings.imports, options.helpers, helpers);
  const engine = new Engine(settings);
  context = merge({ username: '' }, context, options);

  if (context.author && typeof context.author === 'string') {
    context.author = parseAuthor(context.author);
    const match = /github\.com\/(.*)/.exec(context.author.url);
    if (!context.username && match) {
      context.username = match[1];
    }
  }

  return format(engine.render(str, context))
    .split('__OPEN__')
    .join('<%');
}

function read(fp, locals = {}) {
  locals.cwd = path.dirname(fp);
  return { path: fp, contents: fs.readFileSync(fp, 'utf8'), cwd: locals.cwd };
}

module.exports.render = render;
module.exports.read = read;
