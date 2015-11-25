var template = require('./survey.hbs');
var transform = require('./transform');

function render(options) {
  return template(transform(options))
}

module.exports = render;
