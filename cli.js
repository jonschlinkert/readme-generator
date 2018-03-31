#!/usr/bin/env node

const fs = require('fs');
const ok = require('log-ok');
const path = require('path');
const write = require('write');
const pkg = require('load-pkg').sync(process.cwd());
const Config = require('expand-pkg');
const config = new Config();
const generator = require('./');
const merge = require('mixin-deep');
const argv = require('minimist')(process.argv.slice(2), {
  alias: { template: 't' }
});

const scoped = /^@[^/]+\/(.*)/.exec(pkg.name);
if (scoped) {
  pkg.name = scoped[1];
}

let context = merge({}, config.expand(pkg), argv);
let template = argv.t || path.join(process.cwd(), '.readme.md');
if (fs.existsSync(template)) {
  template = generator.read(template, context).contents;
} else {
  template = generator.read(path.join(__dirname, 'templates/template.md'), context).contents;
}

write('README.md', generator.render(template, context))
  .then(() => {
    ok('generated README.md');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
