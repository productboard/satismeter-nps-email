import { SafeString } from 'handlebars';

export interface Colors {
  primary: string;
  foreground: string;
  background: string;
}

export interface Choice {
  label: string;
  url: string | null;
}

export interface Rating {
  rating: number;
  url: string | null;
}

export enum Emoji {
  tired = '😫',
  frowning = '🙁',
  neutral = '😐',
  grinning = '😀',
  starEyes = '🤩'
}

export interface EmojiRating {
  value: number;
  emoji: Emoji;
  imageUrl: string;
  url: string | null;
}

export interface BaseTemplateOptions {
  intro: string | SafeString;
  outro: string | SafeString;
  question: string;
  colors: Colors;
  direction: string;
  left: 'left' | 'right';
  right: 'left' | 'right';
  unsubscribeUrl?: string;
  preview: boolean;
  previewDevice: {
    desktop: boolean;
    mobile: boolean;
  };
  showPoweredBy: boolean;
  botHoneypotUrl?: string;
}

export interface TemplateOptions extends BaseTemplateOptions {
  unlikely: string;
  likely: string;
  ratings: Rating[];
}

export interface ChoiceOptions {
  multiple: boolean;
  choices: Choice[];
}

export interface ScaleOptions {
  max: number;
  min: number;
  maxLegend: string;
  minLegend: string;
  ratings: Rating[];
  width: number;
}

export interface SmileyOptions {
  emojis: EmojiRating[];
  maxLegend: string;
  minLegend: string;
  width: number;
}

export interface LongTextOptions {
  surveyUrl: string | null;
  submit: string | undefined;
}

export type TemplateV2Options =
  | (BaseTemplateOptions & ChoiceOptions)
  | (BaseTemplateOptions & ScaleOptions)
  | (BaseTemplateOptions & LongTextOptions)
  | (BaseTemplateOptions & SmileyOptions);

export type Template = (options: TemplateOptions) => string;
export type TemplateV2 = (options: TemplateV2Options) => string;
