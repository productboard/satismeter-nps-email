import surveyTemplate from './templates/survey';
import surveyV2Template from './templates/surveyV2';
import inlineTemplate from './templates/inline';
import zonkyTemplate from './templates/zonky-survey';

import transform, { TransformOptions } from './transform';
import { transformV2, TransformV2Options } from './transformV2';

const templates: { [name: string]: any } = {
  default: surveyTemplate,
  inline: inlineTemplate,
  surveyV2: surveyV2Template,
  zonky: zonkyTemplate
};

export interface OptionsV1 extends TransformOptions {
  template?: 'default' | 'inline' | 'zonky';
}

export interface OptionsV2 extends TransformV2Options {
  template: 'surveyV2';
  legacyRatingParameterMode?: boolean;
}

export type Options = OptionsV1 | OptionsV2;

export default function render(options: Options) {
  const templateName = options.template || 'default';
  const template = templates[templateName] || templates.default;

  return options.template === 'surveyV2'
    ? template(transformV2(options as OptionsV2))
    : template(transform(options));
}
