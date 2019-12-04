import { default as render, Options } from '../src/index';

export default {
  title: 'Choice'
};

const choice: Options = {
  template: 'surveyV2',
  question: {
    id: 'choice',
    type: 'single-choice',
    label: 'We are sorry you are leaving. What is the reason?',
    choices: ['Bad support', 'Not enough features', 'The price is too high']
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey'
};

export const basic = () => render(choice);

export const RTL_direction = () =>
  render({ ...choice, translation: { DIRECTION: 'rtl' } });
