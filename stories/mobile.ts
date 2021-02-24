import render, { renderV2, OptionsV2 } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'Mobile'
};

const basic: OptionsV2 = {
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
  botHoneypotUrl: 'http://localhost/honeypot',
  preview: true,
  previewDevice: 'mobile'
};

export const NPS = () => renderV2(basic);
export const Rating = () => renderV2({
  ...basic,
  question: {
    id: 'rating',
    type: 'scale',
    label: 'I am satisfied with the service',
    max: 5,
    min: 1,
    maxLegend: messages.AGREE,
    minLegend: messages.DISAGREE
  }
});
export const Text = () => renderV2({
  ...basic,
  question: {
    id: 'text',
    type: 'long-text',
    label: 'Do you have any comments for us?',
  }
});
export const Choice = () => renderV2({
  ...basic,
  question: {
    id: 'choice',
    type: 'single-choice',
    label: 'We are sorry you are leaving. What is the reason?',
    choices: ['Bad support', 'Not enough features', 'The price is too high']
  }
});
export const V1Template = () => render({
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot',
  previewDevice: 'mobile'
});