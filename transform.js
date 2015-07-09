var marked = require('marked');
var translations = require('nps-translations');
var Uri = require('jsuri');
var is = require('is');
var escape = require('escape-html');

var COLORS = {
  'gray': '#666',
  'pink': '#ff4981',
  'green': '#4CD964',
  'darkGreen': '#2FB12C',
  'blue': '#007AFF',
  'red': '#FF3A2D',
  'yellow': '#FFCC00',
  'orange': '#FF9500',
  'violet': '#C643FC',
  'lightBlue': '#3FA2D9'
};

function question(serviceName, language) {
  var translation = translations[language];

  serviceName = is.string(serviceName) ? serviceName.trim() : null;
  if (!serviceName && translation.HOW_LIKELY_US) {
    return escape(translation.HOW_LIKELY_US);
  }
  var serviceHtml = serviceName ? '<b>' + escape(serviceName) + '</b>' : translation.US;
  return escape(translation.HOW_LIKELY).replace('%s', serviceHtml);
}

function transform(options) {
  var outro = options.outro;
  var user = options.user || {};
  var language = options.language || 'en';
  var color = COLORS[options.color] || options.color || '#ff4981';

  return {
    intro: marked(options.intro),
    outro: marked(options.outro),
    question: question(options.serviceName, language),
    color: color,
    unlikely: translations[language].UNLIKELY,
    likely: translations[language].LIKELY,
    unsubscribe: options.unsubscribe,
    ratingUrl: function(rating) {
      if (!options.url) {
        return null;
      }
      var uri = new Uri(options.url);
      uri.addQueryParam('token', options.token);
      uri.addQueryParam('userId', user.userId);
      if (user.email) {
        uri.addQueryParam('email', user.email);
      }
      if (user.name) {
        uri.addQueryParam('name', user.name);
      }
      if (is.number(rating)) {
        uri.addQueryParam('rating', rating.toString());
      }
      return uri.toString();
    }
  };
}

module.exports = transform;
