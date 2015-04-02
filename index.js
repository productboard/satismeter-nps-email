var marked = require('marked');
var h = require('virtual-dom/h');
var stringify = require('virtual-dom-stringify');
var range = require('range');
var translations = require('nps-translations');
var Uri = require('jsuri');
var is = require('is');
var escape = require('escape-html');

var colors = {
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

  var serviceName = is.string(serviceName) ? serviceName.trim() : null;
  var us = translation.US;
  var serviceHtml = serviceName ? '<b>' + escape(serviceName) + '</b>' : us;
  return h('p', {innerHTML: escape(translation.HOW_LIKELY).replace('%s', serviceHtml)});
}

function ratingUrl(url, token, user, rating) {
  if (!url) {
    return null;
  }
  var uri = new Uri(url);
  uri.addQueryParam('token', token);
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

function scaleItem(url, token, user, rating, color) {
  var attrs = {style: {
      'background-color': colors[color],
      'border-radius': '50%',
      color: 'white',
      display: 'inline-block',
      height: '2.5em',
      'line-height': '2.5em',
      'margin-left': rating === 0 ? 0 : '.125em',
      'margin-right': rating === 10 ? 0 : '.125em',
      'text-align': 'center',
      'text-decoration': 'none',
      width: '2.5em'
  }};
  var href = ratingUrl(url, token, user, rating);
  if (href) {
    attrs.href = href;
  }
  return h('a.Rating', attrs, [String(rating)]);
}

function scale(url, token, user, color) {
  return h('div', {
      style: {
        width: (11 * 2.5 + 20 * .125) + 'em',
        'margin-top': '1.8em'
      }
    },
    range(0, 11).map(function(rating) {
      return scaleItem(url, token, user, rating, color);
    })
  );
}

function legend(language) {
  return h('div', {
      style: {
        color: '#999',
        'font-style': 'italic',
        'margin-bottom': '1.8em',
        width: (11 * 2.5 + 20 * .125) + 'em'
      }
    }, [
      h('div', {style: {
        float: 'left',
        'font-size': '.75em'
      }}, translations[language].UNLIKELY),
      h('div', {style: {
        float: 'right',
        'font-size': '.75em'
      }}, translations[language].LIKELY),
      h('div', {style: {
        clear: 'both'
      }})
    ]
  );
}

function rating(url, token, user, language, color) {
  return [scale(url, token, user, color), legend(language)];
}

function n(html) {
  return h('div', {innerHTML: html});
}

function poweredBy() {
  return [
    h('hr', {style: {
      border: 'none',
      'border-top': '1px solid #eee'
    }}),
    h('span', {
        style: {
          'font-size': '.75em'
        }
      }, [
      'Powered by ',
      h('a', {
        href: 'https://satismeter.com',
        style: {
          color: '#ff4981',
          'text-decoration': 'none'
        }
      }, 'SatisMeter')
    ])
  ];
}

function render(options) {
  var intro = options.intro;
  var outro = options.outro;
  var token = options.token;
  var url = options.url;
  var user = options.user || {};
  var language = options.language || 'en';
  var color = options.color || 'pink';
  var serviceName = options.serviceName || null;

  return stringify(h('div', {
    style: {
      'font-family': 'sans-serif',
      'line-height': '1.6em',
      'font-size': '1em',
      margin: 0,
      padding: 0
    }
  }, [
    n(marked(options.intro)),
    question(serviceName, language),
    rating(url, token, user, language, color),
    n(marked(options.outro)),
    poweredBy()
  ]));
}

module.exports = render;
