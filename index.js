var marked = require('marked');
var h = require('virtual-dom/h');
var stringify = require('virtual-dom-stringify');
var range = require('range');
var translations = require('nps-translations');
var Uri = require('jsuri');
var is = require('is');

var colors = {
  'gray': '#666',
  'pink': '#ff4981',
  'green': '#4CD964',
  'blue': '#007AFF',
  'red': '#FF3A2D',
  'yellow': '#FFCC00',
  'orange': '#FF9500',
  'violet': '#C643FC'
};

function ratingUrl(url, token, visitor, rating) {
  if (!url) {
    return null;
  }
  var uri = new Uri(url);
  uri.addQueryParam('token', token);
  uri.addQueryParam('id', visitor.source_id);
  if (visitor.email) {
    uri.addQueryParam('email', visitor.email);
  }
  if (visitor.name) {
    uri.addQueryParam('name', visitor.name);
  }
  if (is.number(rating)) {
    uri.addQueryParam('rating', rating.toString());
  }
  return uri.toString();
}

function scaleItem(url, token, visitor, rating, color) {
  var attrs = {style: {
      'background-color': colors[color],
      'border-radius': '50%',
      color: 'white',
      display: 'inline-block',
      height: '40px',
      'line-height': '40px',
      margin: '2px',
      'margin-left': rating === 0 ? 0 : undefined,
      'margin-right': rating === 10 ? 0 : undefined,
      'text-align': 'center',
      'text-decoration': 'none',
      width: '40px'
  }};
  var href = ratingUrl(url, token, visitor, rating);
  if (href) {
    attrs.href = href;
  }
  return h('a', attrs, [String(rating)]);
}

function scale(url, token, visitor, color) {
  return h('div', {
      style: {
        width: (11 * 40 + 10 * 4) + 'px'
      }
    },
    range(0, 11).map(function(rating) {
      return scaleItem(url, token, visitor, rating, color);
    })
  );
}

function legend(language) {
  return h('div', {
      style: {
        color: '#999',
        'font-size': '12px',
        'font-style': 'italic',
        'margin-bottom': '30px',
        width: (11 * 40 + 10 * 4) + 'px'
      }
    }, [
      h('div', {style: {
        float: 'left'
      }}, translations[language].NOT_AT_ALL),
      h('div', {style: {
        float: 'right'
      }}, translations[language].EXTREMLY),
      h('div', {style: {
        clear: 'both'
      }})
    ]
  );
}

function rating(url, token, visitor, language, color) {
  return [scale(url, token, visitor, color), legend(language)];
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
    h('span', 'Powered by ',
      h('a', {
        href: 'https://satismeter.com',
        style: {
          color: '#ff4981',
          'text-decoration': 'none'
        }
      }, 'SatisMeter')
    )
  ];
}

function render(options) {
  var intro = options.intro;
  var outro = options.outro;
  var token = options.token;
  var url = options.url;
  var visitor = options.visitor || {};
  var language = options.language || 'en';
  var color = options.color || 'pink';

  return stringify(h('div', {
    style: {
      'font-family': 'sans-serif',
      'line-height': 1.6,
      'font-size': '16px',
      margin: 0,
      padding: 0
    }
  }, [
    n(marked(options.intro)),
    rating(url, token, visitor, language, color),
    n(marked(options.outro)),
    poweredBy()
  ]));
}

module.exports = render;
