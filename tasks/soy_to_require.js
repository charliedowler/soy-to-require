/*
 * soy-to-require
 * githome
 *
 * Copyright (c) 2014 charliedowler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('soy_to_require', 'desc', function () {
    var Beautifier = require('node-js-beautify');
    var formatter = new Beautifier();
    var path = require('path');
    require('colors');

    var options = this.options();
    var namespace = options.namespace;
    var output = options.output;
    var count = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        return {
          path: filepath,
          contents: grunt.file.read(filepath)
        };
      }).forEach(function(file, index, list) {
        var filename = path.basename(file.path);
        var wrapper = ['define(function(require) {'
          , 'var soy = require("soy");'
          , file.contents
          , 'return ' + namespace + '.' + filename.split('.')[0] + ';'
          , '});'].join('\n');
        wrapper = formatter.beautify_js(wrapper, {
          'indent_size': 2
        });
        grunt.file.write([output + filename].join('.'), wrapper);
        grunt.log.writeln('File "' + [output + filename].join('.') + '" created.');
        count++;
      });
    });
    grunt.log.writeln('Successfully generated ' + count.toString().cyan + ' templates.');
  });

};
