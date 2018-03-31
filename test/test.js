'use strict';

require('mocha');
const assert = require('assert');
const readme = require('..');

describe('readme-generator', function() {
  it('should render templates with the given context', function() {
    assert.equal(readme.render('<%= name %>', {name: 'Foo'}), 'Foo\n');
  });
});
