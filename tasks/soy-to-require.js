module.exports = function (grunt) {
  grunt.registerTask('soy-to-require', 'Append require wrapper', function () {
    var fs = require('fs');
    var namespace = this.data.namespace
    var templates = this.data.templates;

    fs.readdir(templates, function (err, list) {
      list.forEach(function (filename, list) {
        var fileContents;
        fs.readFile(__dirname + '\\' + templates + '\\' + filename, function (err, data) {
          if (err) throw err;
          fileContents = data;
          var requireString = 'define(function(require) {' +
            '\nvar soy = require("soy");\n' + fileContents;
          fs.writeFile(__dirname + '\\' + templates + '\\' + filename, requireString, function (err) {
            if (err) throw err;
            fs.appendFile(__dirname + '\\' + templates + '\\' + filename, '\nreturn ' + namespace + '.' + filename.split('.')[0] + '\n});', function (err) {
              if (err) throw err;
            });
          });
        });
      });
    });
  })
}