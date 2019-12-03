import Handlebars from 'handlebars/dist/handlebars.runtime';

import './templates/survey';
import './templates/surveyV2';
import './templates/inline';
import './templates/zonky-survey';
import './templates/choice-list';
import './templates/number-scale';
import './templates/paragraph';
import './templates/survey-layout';
import './templates/survey-style';
import transform, { TransformOptions } from './transform';
import { transformV2, TransformV2Options } from './transformV2';

const templates: { [name: string]: any } = {
  default: Handlebars.templates['survey.hbs'],
  inline: Handlebars.templates['inline.hbs'],
  surveyV2: Handlebars.templates['surveyV2.hbs'],
  zonky: Handlebars.templates['zonky-survey.hbs']
};

const partials = [
  'choice-list',
  'number-scale',
  'paragraph',
  'survey-layout',
  'survey-style'
];

for (const partial of partials) {
  Handlebars.registerPartial(partial, Handlebars.templates[`${partial}.hbs`]);
}

export interface OptionsV1 extends TransformOptions {
  template?: string;
}

export interface OptionsV2 extends TransformV2Options {
  template: 'surveyV2';
}

export type Options = OptionsV1 | OptionsV2;

export default function render(options: Options) {
  const templateName = options.template || 'default';
  const template = templates[templateName] || templates.default;

  return options.template === 'surveyV2'
    ? template(transformV2(options as OptionsV2))
    : template(transform(options));
}
