var render = require('..');

console.log(
  render({
    intro: 'Hi!\n\nPlease fill in the *survey* below:',
    outro: 'Bye!',
    url: 'http://localhost/survey',
    urlParams: {
      token: 'aaa',
      userId: '1'
    },
    color: 'orange'
  })
);
