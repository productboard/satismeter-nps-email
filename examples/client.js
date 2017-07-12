var render = require('..');

document.body.innerHTML = render({
  intro: 'Hi!\n\nPlease fill in the *survey* below:',
  outro: 'Bye!',
  userId: '1',
  url: 'http://localhost/survey',
  token: 'aaa',
  color: 'pink',
  serviceName: 'ACME',
  unsubscribe: true,
  preview: true
});
