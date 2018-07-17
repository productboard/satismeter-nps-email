import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './templates/survey';
import './templates/inline';
import './templates/zonky-survey';
import './templates/ilos-survey';
import transform from './transform';
import { TransformOptions } from './transform';
import { Rating } from './components/rating';

// const templates: { [name: string]: any } = {
//   default: Handlebars.templates['survey.hbs'],
//   inline: Handlebars.templates['inline.hbs'],
//   zonky: Handlebars.templates['zonky-survey.hbs'],
//   ilos: Handlebars.templates['ilos-survey.hbs']
// };

export interface Options extends TransformOptions {
  template?: string;
}

export default function render(options: Options) {
  // const templateName = options.template || 'default';
  // var template = templates[templateName] || templates.default;
  const o = transform(options);
  const renderer = ReactDOMServer.renderToString(
    <Rating number={1} url={undefined} isLast={false} colors={o.colors} />
  );

  console.log(renderer);
  return renderer;
  // return template(transform(options));
}
