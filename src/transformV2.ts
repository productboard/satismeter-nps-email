import is from 'is';
import Uri from 'jsuri';
import marked from 'marked';

import { BaseTemplateOptions, Colors, Rating, TemplateV2Options } from './base';
import messages from './messages';

export interface BaseQuestion {
  id: string;
  label: string;
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'scale';
  max: number;
  min: number;
  maxLegend: string;
  minLegend: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  choices: string[];
}

export type Question = ScaleQuestion | SingleChoiceQuestion;

export interface TransformV2Options {
  colors?: Colors;
  preview?: boolean;
  question: Question;
  showPoweredBy?: boolean;
  translation?: any;
  unsubscribeUrl?: string;
  url?: string;
  urlParams: { [key: string]: string | number | boolean | undefined };
  legacyRatingParameterMode?: boolean;
}

const DEFAULT_COLORS = {
  primary: '#FF4981',
  foreground: '#333',
  background: '#FDFDFD'
};

const SCALE_WIDTH = 530;

function sign(x: number) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

export function transformV2(
  options: TransformV2Options
): TemplateV2Options | undefined {
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

    if (options.question.id) {
      const legacyRatingParameter =
        options.question.id === 'SM_rating' &&
        options.legacyRatingParameterMode;

      if (legacyRatingParameter) {
        uri.addQueryParam('rating', value);
      } else {
        uri.addQueryParam(`answers[${options.question.id}]`, value);
      }
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
    question: options.question.label,
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
      : true
  };

  if (options.question.type === 'single-choice') {
    const choices = options.question.choices.map(choice => {
      return {
        label: choice,
        url: url(choice)
      };
    });

    return {
      ...templateOptions,
      choices: choices
    };
  } else if (options.question.type === 'scale') {
    const ratings: Rating[] = [];
    const inc = sign(options.question.max - options.question.min);

    for (
      let rating = options.question.min;
      rating !== options.question.max + inc;
      rating += inc
    ) {
      ratings.push({
        rating: rating,
        url: url(rating.toString())
      });
    }

    return {
      ...templateOptions,
      max: options.question.max,
      min: options.question.min,
      maxLegend: options.question.maxLegend,
      minLegend: options.question.minLegend,
      ratings: ratings,
      width: {
        absolute: SCALE_WIDTH / ratings.length,
        relative: 100 / ratings.length
      }
    };
  }
}
