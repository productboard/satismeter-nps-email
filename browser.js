var transform = require('./transform');

var TEMPLATES = {
  default: require('./survey.hbs'),
  zonky: require('./zonky-survey.hbs')
};

function render(options) {
  var template = TEMPLATES[options.template] || TEMPLATES.default;
  return template(transform(options))
}

module.exports = render;
