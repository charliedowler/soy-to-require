if (typeof Testing == 'undefined') {
  var Testing = {};
}

Testing.UsesView.hello = function (opt_data, opt_ignored) {
  var output = new soy.StringBuilder();
  Testing.MyView(opt_data, output);
  output.append('<div>Hello World</div>');
  return output;
};
