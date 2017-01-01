'use strict';

require('mocha');
var assert = require('assert');
var readme = require('..');

describe('readme-generator', function() {
  it('should export an object', function() {
    assert(readme);
    assert.equal(typeof readme, 'object');
  });

  it('should render templates with the given context', function() {
    assert.equal(readme.render('<%= name %>', {name: 'Foo'}), 'Foo\n');
  });
});
