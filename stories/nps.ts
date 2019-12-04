import { default as render, Options } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'NPS'
};

const nps: Options = {
  template: 'surveyV2',
  question: {
    id: 'nps',
    type: 'scale',
    label: messages.HOW_LIKELY,
    max: 10,
    min: 0,
    maxLegend: messages.LIKELY,
    minLegend: messages.UNLIKELY
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey'
};

export const basic = () => render(nps);

export const RTL_direction = () =>
  render({ ...nps, translation: { DIRECTION: 'rtl' } });

export const whitelabeled = () => render({ ...nps, showPoweredBy: false });

export const no_unsubscribe_link = () =>
  render({ ...nps, unsubscribeUrl: undefined });
