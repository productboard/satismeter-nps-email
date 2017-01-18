var marked = require('marked');
var messages = require('./messages');
var Uri = require('jsuri');
var is = require('is');
var escapeHtml = require('escape-html');
var xtend = require('xtend');

var DEFAULT_COLORS = {
  primary: '#ff4981',
  foreground: '#333',
  background: '#FDFDFD'
};

var renderer = new marked.Renderer();

renderer.paragraph = function (text) {
  return '<p style="margin: 0px; line-height: 150%; font-family: arial, helvetica, sans-serif; text-align: left; font-size: 15px; color: rgb(69, 69, 69);">' + text + '<br><br></p>';
};

function escape(html) {
  if (!html) {
    return null;
  }
  return escapeHtml(html);
}

function transform(options) {
  var outro = options.outro;
  var user = options.user || {};
  var colors = xtend(DEFAULT_COLORS, options.color ? {primary: options.color} : null, options.colors);

  var translation = options.translation || {};
  var preview = is.boolean(options.preview) ? options.preview : false;
  var showPoweredBy = is.boolean(options.showPoweredBy) ? options.showPoweredBy : true;

  function t(key) {
    if (translation[key]) {
      return translation[key];
    }
    return messages[key];
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
    colors: colors,
    direction: direction,
    left: direction === 'rtl' ? 'right' : 'left',
    right: direction === 'rtl' ? 'left' : 'right',
    unlikely: t('UNLIKELY'),
    likely: t('LIKELY'),
    ratings: [0,1,2,3,4,5,6,7,8,9,10].map(function(rating) {
      return {
        rating: rating,
        url: escape(ratingUrl(rating))
      };
    }),
    unsubscribeUrl: options.unsubscribeUrl,
    preview: preview,
    showPoweredBy: showPoweredBy
  };
}

module.exports = transform;
