import render, { Options } from '..';
import express from 'express';

const baseSurvey: Options = {
  url: 'http://localhost/survey',
  urlParams: {
    token: 'aaa',
    userId: '1'
  },
  unsubscribeUrl: 'http://localhost/unsubscribe'
};

const npsV2: Options = {
  ...baseSurvey,
  template: 'surveyV2'
};

const rating: Options = {
  ...baseSurvey,
  template: 'surveyV2',
  question: 'I am satisfied with the service',
  max: 5,
  min: 0,
  maxLegend: 'Agree',
  minLegend: 'Disagree'
};

const choice: Options = {
  ...baseSurvey,
  template: 'surveyV2',
  question: 'We are sorry you leave. What is the reason?',
  choices: ['Bad support', 'Not enough features', 'The price is too high']
};

var app = express();

app.get('/', (req, res) => res.send(render(baseSurvey)));

app.get('/nps', (req, res) => res.send(render(npsV2)));
app.get('/rating', (req, res) => res.send(render(rating)));
app.get('/choice', (req, res) => res.send(render(choice)));

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
