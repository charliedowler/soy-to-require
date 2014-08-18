define(function(require) {
  var soy = require("soy");
  if (typeof Testing == 'undefined') {
    var Testing = {};
  }


  Testing.MyView = function(opt_data, opt_ignored) {
    return '<div>Hello World</div>';
  };
  return Testing.MyView;
});