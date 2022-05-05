import { renderV2, OptionsV2 } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'NPS'
};

const nps: OptionsV2 = {
  intro: '',
  outro: '',
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
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const basic = () => renderV2(nps);

export const RTL_direction = () => renderV2({ ...nps, direction: 'rtl' });

export const whitelabeled = () => renderV2({ ...nps, showPoweredBy: false });

export const no_unsubscribe_link = () =>
  renderV2({ ...nps, unsubscribeUrl: undefined });

export const markdown = () =>
  renderV2({
    ...nps,
    intro: 'Hey **man**',
    outro: 'Bye **bye**'
  });

export const xss = () =>
  renderV2({
    ...nps,
    question: {
      ...nps.question,
      label:
        '**Question** <img src=x onerror=alert(document.domain)>PAYLOAD<img>'
    }
  });
