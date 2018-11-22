import Handlebars from 'handlebars/dist/handlebars.runtime';
import './templates/survey';
import './templates/inline';
import './templates/zonky-survey';
import transform from './transform';
import { TransformOptions } from './transform';

const templates: { [name: string]: any } = {
  default: Handlebars.templates['survey.hbs'],
  inline: Handlebars.templates['inline.hbs'],
  zonky: Handlebars.templates['zonky-survey.hbs']
};

export interface Options extends TransformOptions {
  template?: string;
}

export default function render(options: Options) {
  const templateName = options.template || 'default';
  var template = templates[templateName] || templates.default;
  return template(transform(options));
}
