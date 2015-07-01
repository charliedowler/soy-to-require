'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.soy_to_require = {
  TestTask: function (test) {
    var files = [
      [ 'tmp/abc/MyView.soy.js',   'test/expected/MyView.soy.js' ],
      [ 'tmp/abc/UsesView.soy.js', 'test/expected/UsesView.soy.js' ]
    ];

    files.forEach(function(file) {
      var actual = grunt.file.read(file[0]);
      var expected = grunt.file.read(file[1]);
      test.equal(actual, expected, file[0] + ' differs from ' + file[1]);
    });

    test.done();
  }
};
