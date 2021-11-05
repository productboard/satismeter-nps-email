import { renderV2, OptionsV2 } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'Smiley'
};

const smiley: OptionsV2 = {
  intro: '',
  outro: '',
  question: {
    id: 'smiley',
    type: 'smiley',
    label: 'I am satisfied with the service',
    maxLegend: messages.LIKELY,
    minLegend: messages.UNLIKELY
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const basic = () => renderV2(smiley);
