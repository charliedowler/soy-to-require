module.exports = function (grunt) {
  grunt.registerTask('soy-to-require', 'Append require wrapper', function () {
    var fs = require('fs');
    var namespace = 'NAMESPACE';
    var templatesDir = 'TEMPLATES'

    fs.readdir('templates', function (err, list) {
      list.forEach(function (filename, list) {
        var fileContents;
        fs.readFile(__dirname + '\\' + templatesDir + '\\' + filename, function (err, data) {
          if (err) throw err;
          fileContents = data;
          var requireString = 'define(function(require) {' +
            '\nvar soy = require("soy");\n' + fileContents;
          fs.writeFile(__dirname + '\\' + templatesDir + '\\' + filename, requireString, function (err) {
            if (err) throw err;
            fs.appendFile(__dirname + '\\' + templatesDir + '\\' + filename, '\nreturn ' + namespace + '.' + filename.split('.')[0] + '\n});', function (err) {
              if (err) throw err;
            });
          });
        });
      });
    });
  })
}