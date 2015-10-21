var render = require('..');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send(render({
    intro: 'Hi!\n\nPlease fill in the survey below:',
    outro: 'Bye!',
    user: {userId: '1'},
    url: 'http://localhost/survey',
    token: 'aaa',
    language: 'en',
    color: 'pink',
    serviceName: 'ACME',
    unsubscribeUrl: 'http://localhost/unsubscribe'
  }));
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
