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

  grunt.registerMultiTask('soy-to-require', 'desc', function () {
    var Beautifier = require('node-js-beautify');
    var falafel = require('falafel');
    var formatter = new Beautifier();
    var path = require('path');
    var _ = require('underscore');
    require('colors');

    var options = this.options();
    var namespace = options.namespace;
    var prefix = options.prefix || '';
    var output = path.join(options.output, prefix);

    // Iterate over all specified file groups.
    var src = _(this.files.map(function(file) {
      return file.src.filter(function (filepath) {
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
      });
    })).flatten();

    // Concat specified files.
    src.forEach(function(file) {
      var filename = path.basename(file.path);
      var module = filename.split('.')[0];
      var dependencies = {
        soy: 'soy'
      };

      var code = falafel(file.contents, function(node) {
        var dependency = isSoyMemberExpression(node);
        if (dependency) {
          node.update(varName(dependency));
        }
      });

      var prologue = 'define(function(require) {';
      var epilogue = 'return ' + namespace + '.' + module + '; });';
      var requires = _.map(dependencies, function(v,k) {
        return 'var ' + v + ' = require("' + k + '");';
      });

      var wrapper = formatter.beautify_js([].concat(prologue, requires, code, epilogue).join('\n'), { 'indent_size': 2 });

      var destFile = path.join(output, filename);
      grunt.file.write(destFile, wrapper);
      grunt.log.writeln('File "' + destFile + '" created.');

      /**
       * @return [String] the module to require if the node is a call to another Soy module within our namespace, undefined otherwise
       */
      function isSoyMemberExpression(node) {
        if (node.type === 'MemberExpression' && node.object.name === namespace && node.property.name !== module && node.computed === false) {
          return node.property.name + '.soy';
        }
      }

      /**
       * @return String a unique variable name used for the given module name
       */
      function varName(module) {
        var name = module.split('.')[0];
        var path = prefix + '/' + module;

        if (!dependencies[path]) {
          dependencies[path] = name;
        }

        return dependencies[path];
      }
    });

    grunt.log.writeln('Successfully generated ' + src.length.toString().cyan + ' templates.');
  });
};


