import { renderV2, OptionsV2 } from '../src/index';

export default {
  title: 'Text'
};

const text: OptionsV2 = {
  intro: '',
  outro: '',
  submit: 'Submit Feedback',
  question: {
    id: 'text',
    type: 'long-text',
    label: 'Do you have any comments for us?'
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const basic = () => renderV2(text);

export const RTL_direction = () => renderV2({ ...text, direction: 'rtl' });
