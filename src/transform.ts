import marked from 'marked';
import messages from './messages';
import Uri from 'jsuri';
import is from 'is';
import escapeHtml from 'escape-html';
import xtend from 'xtend';
import { Colors } from './base';

var DEFAULT_COLORS = {
  primary: '#ff4981',
  foreground: '#333',
  background: '#FDFDFD'
};

function escape(html: string) {
  if (!html) {
    return null;
  }
  return escapeHtml(html);
}

export interface TransformOptions {
  userId: string;
  traits?: any;
  colors?: Colors;
  translation?: any;
  preview?: boolean;
  showPoweredBy?: boolean;
  url?: string;
  token: string;
  serviceName?: string;
  unsubscribeUrl?: string;

  //legacy
  color?: string;
  intro?: string;
  outro?: string;
}

export default function transform(options: TransformOptions) {
  // var user = options.user || {};
  var userId = options.userId;
  var traits = options.traits || {};
  var colors = xtend(
    DEFAULT_COLORS,
    options.color ? { primary: options.color } : null,
    options.colors
  );

  var translation = options.translation || {};
  var preview = is.boolean(options.preview) ? options.preview : false;
  var showPoweredBy = is.boolean(options.showPoweredBy)
    ? options.showPoweredBy
    : true;

  function t(key: keyof typeof messages) {
    if (translation[key]) {
      return translation[key];
    }
    return messages[key];
  }

  var direction = t('DIRECTION') || 'ltr';
  var left = direction === 'rtl' ? 'right' : 'left';
  var right = direction === 'rtl' ? 'left' : 'right';

  var renderer = new marked.Renderer();

  renderer.paragraph = function(text: string) {
    return (
      '<p style="margin: 0px; line-height: 150%; font-family: arial, helvetica, sans-serif; text-align: ' +
      left +
      '; font-size: 15px; color: rgb(69, 69, 69);">' +
      text +
      '<br><br></p>'
    );
  };

  function question(serviceName: string | null | undefined) {
    serviceName = is.string(serviceName) ? serviceName!.trim() : null;
    var howLikelyUs = t('HOW_LIKELY_US');
    if (!serviceName && howLikelyUs) {
      return escape(howLikelyUs);
    }
    var serviceHtml = serviceName
      ? '<b>' + escape(serviceName) + '</b>'
      : t('US');
    var howLikely = t('HOW_LIKELY').replace('%s', '{{service_name}}');
    return escape(howLikely)!.replace('{{service_name}}', serviceHtml);
  }

  function ratingUrl(rating: number) {
    if (!options.url) {
      return null;
    }
    var uri = new Uri(options.url);
    uri.addQueryParam('token', options.token);
    uri.addQueryParam('userId', userId);
    Object.keys(traits).forEach(function(traitName) {
      uri.addQueryParam(traitName, traits[traitName]);
    });
    if (is.number(rating)) {
      uri.addQueryParam('rating', rating.toString());
    }
    return uri.toString();
  }

  return {
    intro: marked(options.intro || t('INTRO'), { renderer: renderer }),
    outro: marked(options.outro || t('OUTRO'), { renderer: renderer }),
    question: question(options.serviceName),
    colors: colors,
    direction: direction,
    left: left,
    right: right,
    unlikely: t('UNLIKELY'),
    likely: t('LIKELY'),
    ratings: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(rating) {
      return {
        rating: rating,
        url: escape(ratingUrl(rating)!)
      };
    }),
    unsubscribeUrl: options.unsubscribeUrl,
    preview: preview,
    showPoweredBy: showPoweredBy
  };
}
