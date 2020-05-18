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

export interface BaseTemplateOptions {
  intro: string;
  outro: string;
  question: string;
  colors: Colors;
  direction: string;
  left: 'left' | 'right';
  right: 'left' | 'right';
  unsubscribeUrl?: string;
  preview: boolean;
  showPoweredBy: boolean;
}

export interface TemplateOptions extends BaseTemplateOptions {
  unlikely: string;
  likely: string;
  ratings: Rating[];
}

export interface ChoiceOptions {
  choices: Choice[];
}

export interface ScaleOptions {
  max: number;
  min: number;
  maxLegend: string;
  minLegend: string;
  ratings: Rating[];
  width: {
    absolute: number;
    relative: number;
  };
}

export interface LongTextOptions {
  surveyUrl: string | null;
  submit: string | undefined;
}

export type TemplateV2Options =
  | (BaseTemplateOptions & ChoiceOptions)
  | (BaseTemplateOptions & ScaleOptions)
  | (BaseTemplateOptions & LongTextOptions);

export type Template = (options: TemplateOptions) => string;
export type TemplateV2 = (options: TemplateV2Options) => string;
