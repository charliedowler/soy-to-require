module.exports = function (grunt) {
  grunt.registerTask('soy-to-require', 'Wrap soy template in require', function () {
    var Beautifier = require('node-js-beautify'),
      formatter = new Beautifier();
    require('colors');

    var count = 0;
    var properties = grunt.config.data["soy-to-require"];

    if (typeof properties == "undefined") throw new Error("Can't find soy-to-require config, please check the readme for help.");

    var namespace = properties.namespace;
    var templates = properties.templates;

    grunt.file.recurse(templates, function (absolute, folder, subdir, filename) {
      var fileContents = grunt.file.read(absolute);
      var requireString = 'define(function(require) {' +
        '\nvar soy = require("soy");\n' + fileContents +
        '\nreturn ' + namespace + '.' + filename.split('.')[0] + ';\n});';
      requireString = formatter.beautify_js(requireString, {});
      grunt.file.write(absolute, requireString);
      count++;
    });
    console.log("Successfully generated " + count.toString().cyan + " templates.");
  });
};