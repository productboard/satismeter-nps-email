import { default as render, Options } from '../src/index';

export default {
  title: 'V1 Template'
};

const nps: Options = {
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const _default = () => render(nps);

export const zonky = () => render({ ...nps, template: 'zonky' });
