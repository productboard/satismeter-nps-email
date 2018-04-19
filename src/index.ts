import Handlebars from 'handlebars/dist/handlebars.runtime';
import './templates/survey';
import './templates/inline';
import './templates/zonky-survey';
import './templates/ilos-survey';
import transform from './transform';

const templates: { [name: string]: any } = {
  default: Handlebars.templates['survey.hbs'],
  inline: Handlebars.templates['inline.hbs'],
  zonky: Handlebars.templates['zonky-survey.hbs'],
  ilos: Handlebars.templates['ilos-survey.hbs']
};

export default function render(options: any) {
  var template = templates[options.template] || templates.default;
  return template(transform(options));
}
