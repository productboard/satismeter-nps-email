import render, { Options } from '..';
import express from 'express';
import messages from '../messages';

const baseSurvey: Options = {
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  urlParams: {
    token: 'aaa',
    userId: '1'
  }
};

const npsV2: Options = {
  template: 'surveyV2',
  question: {
    type: 'scale',
    id: 'nps-id',
    label: messages.HOW_LIKELY,
    max: 10,
    min: 0,
    maxLegend: messages.LIKELY,
    minLegend: messages.UNLIKELY
  },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  urlParams: {
    token: 'aaa',
    userId: '1'
  }
};

const rating: Options = {
  template: 'surveyV2',
  question: {
    type: 'scale',
    id: 'rating-id',
    label: 'I am satisfied with the service',
    max: 5,
    min: 0,
    maxLegend: messages.AGREE,
    minLegend: messages.DISAGREE
  },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  urlParams: {
    token: 'aaa',
    userId: '1'
  }
};

const choice: Options = {
  template: 'surveyV2',
  question: {
    type: 'single-choice',
    id: 'choice-id',
    label: 'We are sorry you leave. What is the reason?',
    choices: ['Bad support', 'Not enough features', 'The price is too high']
  },
  unsubscribeUrl: 'http://localhost/unsubscribe',
  url: 'http://localhost/survey',
  urlParams: {
    token: 'aaa',
    userId: '1'
  }
};

var app = express();

app.get('/', (req, res) => res.send(render(baseSurvey)));

app.get('/nps', (req, res) => res.send(render(npsV2)));
app.get('/rating', (req, res) => res.send(render(rating)));
app.get('/choice', (req, res) => res.send(render(choice)));

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
