import { SafeString } from "handlebars/runtime";
import is from "is";
import Uri from "jsuri";
import { marked } from "marked";
import twemoji from "twemoji";

import {
  BaseTemplateOptions,
  Colors,
  Emoji,
  EmojiRating,
  Rating,
  TemplateV2Options,
} from "./base";

export interface BaseQuestion {
  id: string;
  label: string;
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  max: number;
  min: number;
  maxLegend: string;
  minLegend: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  choices: string[];
}

export interface LongTextQuestion extends BaseQuestion {
  type: "long-text";
}

export interface SmileyQuestion extends BaseQuestion {
  type: "smiley";
  maxLegend: string;
  minLegend: string;
}

export type Question =
  | ScaleQuestion
  | SingleChoiceQuestion
  | LongTextQuestion
  | SmileyQuestion;

export interface TransformV2Options {
  colors?: Colors;
  preview?: boolean;
  previewDevice?: "desktop" | "mobile";
  question: Question;
  showPoweredBy?: boolean;
  unsubscribeUrl?: string;
  url?: string;
  urlParams: { [key: string]: string | number | boolean | undefined };
  legacyRatingParameterMode?: boolean;
  direction?: "ltr" | "rtl";
  intro: string;
  outro: string;
  submit?: string;
  botHoneypotUrl?: string;
}

const DEFAULT_COLORS = {
  primary: "#FF4981",
  foreground: "#333",
  background: "#FDFDFD",
};

const SCALE_WIDTH = 530;

const EMOJI_SCALE = [
  Emoji.tired,
  Emoji.frowning,
  Emoji.neutral,
  Emoji.grinning,
  Emoji.starEyes,
];

function sign(x: number) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function getEmojiImageUrl(emoji: Emoji) {
  const imageEl = twemoji.parse(emoji);
  const match = imageEl.match(/src="([^"]*)"/);

  if (match && match.length >= 2) {
    return match[1];
  } else {
    return "";
  }
}

export function transformV2(options: TransformV2Options): TemplateV2Options {
  function url(value?: string) {
    if (!options.url) {
      return null;
    }

    const uri = new Uri(options.url);

    for (const param of Object.keys(options.urlParams)) {
      if (options.urlParams[param] !== undefined) {
        uri.addQueryParam(param, options.urlParams[param]!);
      }
    }

    if (options.question.id && value) {
      const legacyRatingParameter =
        options.question.id === "SM_rating" &&
        options.legacyRatingParameterMode;

      if (legacyRatingParameter) {
        uri.addQueryParam("rating", value);
      } else {
        uri.addQueryParam(
          encodeURIComponent(`answers[${options.question.id}]`),
          value
        );
      }
    }

    return uri.toString();
  }

  const renderer = new marked.Renderer();

  renderer.paragraph = (text: string) => {
    return `${text}<br><br>`;
  };

  const direction = options.direction || "ltr";
  const templateOptions: BaseTemplateOptions = {
    intro: new SafeString(marked(options.intro, { renderer })),
    outro: new SafeString(marked(options.outro, { renderer })),
    question: options.question.label,
    colors: {
      ...DEFAULT_COLORS,
      ...options.colors,
    },
    direction: direction,
    left: direction === "ltr" ? "left" : "right",
    right: direction === "ltr" ? "right" : "left",
    unsubscribeUrl: options.unsubscribeUrl,
    preview: is.boolean(options.preview) ? options.preview! : false,
    previewDevice: {
      desktop: options.previewDevice === "desktop",
      mobile: options.previewDevice === "mobile",
    },
    showPoweredBy: is.boolean(options.showPoweredBy)
      ? options.showPoweredBy!
      : true,
    botHoneypotUrl: options.botHoneypotUrl,
  };

  if (options.question.type === "single-choice") {
    const choices = options.question.choices.map((choice) => {
      return {
        label: choice,
        url: url(choice),
      };
    });

    return {
      ...templateOptions,
      choices: choices,
    };
  } else if (options.question.type === "scale") {
    const ratings: Rating[] = [];
    const inc = sign(options.question.max - options.question.min);

    for (
      let rating = options.question.min;
      rating !== options.question.max + inc;
      rating += inc
    ) {
      ratings.push({
        rating: rating,
        url: url(rating.toString()),
      });
    }

    return {
      ...templateOptions,
      max: options.question.max,
      min: options.question.min,
      maxLegend: options.question.maxLegend,
      minLegend: options.question.minLegend,
      ratings: ratings,
      width: Math.floor(SCALE_WIDTH / ratings.length),
    };
  } else if (options.question.type === "smiley") {
    const emojis: EmojiRating[] = EMOJI_SCALE.map((emoji, index) => ({
      emoji: emoji,
      value: index + 1,
      imageUrl: getEmojiImageUrl(emoji),
      url: url((index + 1).toString()),
    }));

    return {
      ...templateOptions,
      emojis,
      maxLegend: options.question.maxLegend,
      minLegend: options.question.minLegend,
      width: Math.floor(SCALE_WIDTH / emojis.length),
    };
  } else {
    return {
      ...templateOptions,
      surveyUrl: url(),
      submit: options.submit || "Submit Feedback",
    };
  }
}
