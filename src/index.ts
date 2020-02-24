import surveyTemplate from './templates/survey';
import surveyV2Template from './templates/surveyV2';
import inlineTemplate from './templates/inline';
import zonkyTemplate from './templates/zonky-survey';

import transform, { TransformOptions } from './transform';
import { transformV2, TransformV2Options } from './transformV2';

const templates: { [name: string]: any } = {
  default: surveyTemplate,
  inline: inlineTemplate,
  zonky: zonkyTemplate
};

export interface Options extends TransformOptions {
  template?: string;
}

export default function render(options: Options) {
  const templateName = options.template || 'default';
  const template = templates[templateName] || templates.default;

  return template(transform(options));
}

export interface OptionsV2 extends TransformV2Options {}

export function renderV2(options: OptionsV2) {
  return surveyV2Template(transformV2(options));
}
