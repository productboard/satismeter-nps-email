import render from '..';
import express from 'express';

var app = express();

app.get('/', function(req, res) {
  res.send(
    render({
      url: 'http://localhost/survey',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      unsubscribeUrl: 'http://localhost/unsubscribe'
    })
  );
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
