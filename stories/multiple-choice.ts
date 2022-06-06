import { renderV2, OptionsV2 } from '../src/index';

export default {
  title: 'Multiple Choice'
};

const choice: OptionsV2 = {
  intro: '',
  outro: '',
  question: {
    id: 'choice',
    type: 'multiple-choice',
    label: 'We are sorry you are leaving. What are the reasons?',
    choices: ['Bad support', 'Not enough features', 'The price is too high']
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const basic = () => renderV2(choice);

export const RTL_direction = () => renderV2({ ...choice, direction: 'rtl' });
