var handlebars = require('handlebars');
var fs = require('fs');

var transform = require('./transform');

var template = handlebars.compile(fs.readFileSync(__dirname + '/survey.hbs', 'utf8'));

function render(options) {
  return template(transform(options))
}

module.exports = render;
