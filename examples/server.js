var render = require('..');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send(render({
    intro: 'Hey there,\n\nIt would really help us if you could take 10 seconds of your time to rate your experience with us.',
    outro: 'Thank you for taking the time to let us know what you think. We will use this information to help improve our services!\n\nBest Regards.',
    user: {userId: '1'},
    url: 'http://localhost/survey',
    token: 'aaa',
    color: 'pink',
    serviceName: 'ACME',
    unsubscribeUrl: 'http://localhost/unsubscribe'
  }));
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
