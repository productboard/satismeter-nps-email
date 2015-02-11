var render = require('..');

document.body.innerHTML = render({
  intro: 'Hi!\n\nPlease fill in the survey below:',
  outro: 'Bye!',
  visitor: {id: '1'},
  url: 'http://localhost/survey',
  token: 'aaa',
  language: 'de',
  color: 'orange',
  serviceName: 'ACME'
});
