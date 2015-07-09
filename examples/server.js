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
    language: 'da',
    color: 'pink',
    serviceName: 'ACME',
    unsubscribe: true
  }));
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
