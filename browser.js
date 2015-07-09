var template = require('./survey.jade');
var transform = require('./transform');

function render(options) {
  return template(transform(options))
}

module.exports = render;
