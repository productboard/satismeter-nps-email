import { renderV2, OptionsV2 } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'Rating'
};

const rating: OptionsV2 = {
  intro: '',
  outro: '',
  question: {
    id: 'rating',
    type: 'scale',
    label: 'I am satisfied with the service',
    max: 5,
    min: 0,
    maxLegend: messages.LIKELY,
    minLegend: messages.UNLIKELY
  },
  urlParams: { token: 'token', user: 'user' },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  botHoneypotUrl: 'http://localhost/honeypot'
};

export const basic = () => renderV2(rating);

export const odd_scale_range = () =>
  renderV2({
    ...rating,
    question: {
      id: 'rating',
      type: 'scale',
      label: 'I love odd rating scales',
      max: -6,
      min: 3,
      maxLegend: 'Yes',
      minLegend: 'Salmon'
    }
  });
