import is from 'is';
import Uri from 'jsuri';
import marked from 'marked';

import { BaseTemplateOptions, Colors, Rating, TemplateV2Options } from './base';
import messages from './messages';

export type TransformV2Options = {
  choices?: string[];
  colors?: Colors;
  max?: number;
  maxLegend?: string;
  min?: number;
  minLegend?: string;
  preview?: boolean;
  question?: string;
  questionId?: string;
  showPoweredBy?: boolean;
  translation?: any;
  unsubscribeUrl?: string;
  url?: string;
  urlParams: { [key: string]: string | number | boolean | undefined };
};

const DEFAULT_COLORS = {
  primary: '#FF4981',
  foreground: '#333',
  background: '#FDFDFD'
};

const SCALE_WIDTH = 530;
const NPS_WIDTH = { absolute: 48, relative: 9 };

function sign(x: number) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

export function transformV2(options: TransformV2Options): TemplateV2Options {
  function t(key: keyof typeof messages) {
    if (options.translation && options.translation[key]) {
      return options.translation[key];
    }
    return messages[key];
  }

  function url(value: string) {
    if (!options.url) {
      return null;
    }

    const uri = new Uri(options.url);

    for (const param of Object.keys(options.urlParams)) {
      if (options.urlParams[param] !== undefined) {
        uri.addQueryParam(param, options.urlParams[param]!);
      }
    }

    if (options.questionId) {
      uri.addQueryParam(`answers[${options.questionId}]`, value);
    }

    return uri.toString();
  }

  const renderer = new marked.Renderer();

  renderer.paragraph = (text: string) => {
    return `${text}<br><br>`;
  };

  const direction = t('DIRECTION') || 'ltr';
  const templateOptions: BaseTemplateOptions = {
    intro: marked(t('INTRO'), { renderer }),
    outro: marked(t('OUTRO'), { renderer }),
    question: options.question || '',
    colors: {
      ...DEFAULT_COLORS,
      ...options.colors
    },
    direction: direction,
    left: direction === 'ltr' ? 'left' : 'right',
    right: direction === 'ltr' ? 'right' : 'left',
    unsubscribeUrl: options.unsubscribeUrl,
    preview: is.boolean(options.preview) ? options.preview! : false,
    showPoweredBy: is.boolean(options.showPoweredBy)
      ? options.showPoweredBy!
      : true,
    width: NPS_WIDTH
  } as any;

  if (options.choices) {
    const choices = options.choices.map(choice => {
      return {
        label: choice,
        url: url(choice)
      };
    });

    return {
      ...templateOptions,
      choices: choices
    };
  } else if (options.max !== undefined && options.min !== undefined) {
    const ratings: Rating[] = [];
    const inc = sign(options.max - options.min);

    for (
      let rating = options.min;
      rating !== options.max + inc;
      rating += inc
    ) {
      ratings.push({
        rating: rating,
        url: url(rating.toString())
      });
    }

    return {
      ...templateOptions,
      max: options.max,
      min: options.min,
      maxLegend: options.maxLegend || t('AGREE'),
      minLegend: options.minLegend || t('DISAGREE'),
      ratings: ratings,
      width: {
        absolute: Math.floor(SCALE_WIDTH / ratings.length),
        relative: Math.floor(100 / ratings.length)
      }
    };
  } else {
    const ratings: Rating[] = [];

    for (let rating = 0; rating <= 10; rating++) {
      ratings.push({
        rating: rating,
        url: url(rating.toString())
      });
    }

    return {
      ...templateOptions,
      question: templateOptions.question || t('HOW_LIKELY'),
      max: 10,
      min: 0,
      maxLegend: options.maxLegend || t('LIKELY'),
      minLegend: options.minLegend || t('UNLIKELY'),
      ratings: ratings,
      width: NPS_WIDTH
    };
  }
}
