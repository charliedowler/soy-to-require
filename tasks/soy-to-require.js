module.exports = function (grunt) {
  grunt.registerTask('soy-to-require', 'Append require wrapper', function () {
    var properties = grunt.config.data["soy-to-require"];
    if (typeof properties == "undefined") throw new Error("grunt task needs soy-to-require properties");

    var namespace = properties.namespace;
    var templates = properties.templates;

    grunt.file.recurse(templates, function (absolute, folder, subdir, filename) {
      var fileContents = grunt.file.read(absolute);
      var requireString = 'define(function(require) {' +
        '\nvar soy = require("soy");\n' + fileContents +
        '\nreturn ' + namespace + '.' + filename.split('.')[0] + ';\n});';
      grunt.file.write(absolute, requireString);
    });
  });
}