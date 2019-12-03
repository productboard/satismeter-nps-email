import { default as render, Options } from '../src/index';
import messages from '../src/messages';

export default {
  title: 'Rating'
};

const rating: Options = {
  template: 'surveyV2',
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
  url: 'http://localhost/survey'
};

export const basic = () => render(rating);

export const odd_scale_range = () =>
  render({
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
