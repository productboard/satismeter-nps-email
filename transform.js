var marked = require('marked');
var translations = require('nps-translations');
var Uri = require('jsuri');
var is = require('is');
var escape = require('escape-html');

var renderer = new marked.Renderer();

renderer.paragraph = function (text) {
  return '<p style="margin: 0px; line-height: 150%; font-family: arial, helvetica, sans-serif; text-align: left; font-size: 15px; color: rgb(69, 69, 69);">' + text + '<br><br></p>';
};

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

function transform(options) {
  var outro = options.outro;
  var user = options.user || {};
  var language = options.language || 'en';
  var color = COLORS[options.color] || options.color || '#ff4981';
  var translation = options.translation || {};
  var preview = is.boolean(options.preview) ? options.preview : false;

  function t(key) {
    if (translation[key]) {
      return translation[key];
    }
    return translations[language][key];
  }

  function question(serviceName) {
    serviceName = is.string(serviceName) ? serviceName.trim() : null;
    var howLikelyUs = t('HOW_LIKELY_US');
    if (!serviceName && howLikelyUs) {
      return escape(howLikelyUs);
    }
    var serviceHtml = serviceName ? '<b>' + escape(serviceName) + '</b>' : t('US');
    return escape(t('HOW_LIKELY')).replace('%s', serviceHtml);
  }

  function ratingUrl(rating) {
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
  
  var direction = t('DIRECTION') || 'ltr';

  return {
    intro: marked(options.intro, {renderer: renderer}),
    outro: marked(options.outro, {renderer: renderer}),
    question: question(options.serviceName),
    color: color,
    direction: direction,
    left: direction === 'rtl' ? 'right' : 'left',
    right: direction === 'rtl' ? 'left' : 'right',
    unlikely: t('UNLIKELY'),
    likely: t('LIKELY'),
    ratings: [0,1,2,3,4,5,6,7,8,9,10].map(function(rating) {
      return {
        rating: rating,
        url: ratingUrl(rating)
      };
    }),
    unsubscribeUrl: options.unsubscribeUrl,
    preview: preview
  };
}

module.exports = transform;
