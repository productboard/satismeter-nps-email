import render from '..';
import express from 'express';

var app = express();

app.get('/', function(req, res) {
  res.send(
    render({
      userId: '1',
      url: 'http://localhost/survey',
      token: 'aaa',
      serviceName: 'ACME',
      unsubscribeUrl: 'http://localhost/unsubscribe'
    })
  );
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
