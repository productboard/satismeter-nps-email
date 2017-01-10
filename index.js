var handlebars = require('handlebars');
var fs = require('fs');

var transform = require('./transform');

var TEMPLATES = {
  default: handlebars.compile(fs.readFileSync(__dirname + '/survey.hbs', 'utf8')),
  inline: handlebars.compile(fs.readFileSync(__dirname + '/inline.hbs', 'utf8')),
  zonky: handlebars.compile(fs.readFileSync(__dirname + '/zonky-survey.hbs', 'utf8')),
  ilos: handlebars.compile(fs.readFileSync(__dirname + '/ilos-survey.hbs', 'utf8'))
};

function render(options) {
  var template = TEMPLATES[options.template] || TEMPLATES.default;
  return template(transform(options))
}

module.exports = render;
