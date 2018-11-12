import { assert } from 'chai';
import cheerio from 'cheerio';

import render from '..';

describe('email', function() {
  it('should render email', function() {
    var html = render({
      intro: 'Hi!\n\nPlease fill in the survey below:',
      outro: 'Bye!',
      url: 'http://localhost/survey',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      color: 'orange',
      unsubscribeUrl: 'http://localhost/survey/unsubscribe?token=aaa&userId=1',
      translation: {
        HOW_LIKELY: 'Je ACME dobry?'
      }
    });

    assert.isString(html);
    assert.include(html, 'Please fill');
    assert.include(html, 'Bye');
    assert.include(html, 'Je ACME dobry?');
    assert.include(html, 'Extremely likely');
    assert.include(
      html,
      'href="http://localhost/survey/unsubscribe?token&#x3D;aaa&amp;userId&#x3D;1"'
    );

    var $ = cheerio.load(html);
    assert.equal($('a:not([href])').length, 0);
  });

  it('should include passed urlParams', function() {
    var html = render({
      intro: 'Hi!\n\nPlease fill in the survey below:',
      outro: 'Bye!',
      url: 'http://localhost/survey',
      urlParams: {
        token: 'aaa',
        userId: '1',
        foo: 'bar'
      },
      color: 'orange',
      unsubscribeUrl: 'http://localhost/survey/unsubscribe?token=aaa&userId=1',
      translation: {
        HOW_LIKELY: 'Je ACME dobry?'
      }
    });

    assert.include(
      html,
      'href="http://localhost/survey?token=aaa&amp;userId=1&amp;foo=bar&amp;rating=10"'
    );
  });

  it('should escape question', function() {
    var html = render({
      url: 'http://localhost/survey',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      color: 'orange',
      unsubscribeUrl: 'http://localhost/survey/unsubscribe?token=aaa&userId=1',
      translation: {
        HOW_LIKELY: 'Je ACME <b>dobry</b>?'
      }
    });

    var $ = cheerio.load(html);
    assert.include($.root().text(), 'Je ACME <b>dobry</b>?');
  });

  it('should not include unsubscribe', function() {
    var html = render({
      intro: 'Hi!\n\nPlease fill in the survey below:',
      outro: 'Bye!',
      url: 'http://localhost/survey',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      color: 'orange',
      translation: {
        HOW_LIKELY: 'Je ACME dobry?'
      }
    });
    assert.isString(html);
    assert.notInclude(html, 'Unsubscribe');

    var $ = cheerio.load(html);
    assert.equal($('a:not([href])').length, 0);
  });

  it('should handle undefined values', function() {
    var html = render({
      intro: 'Hi!\n\nPlease fill in the survey below:',
      outro: 'Bye!',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      color: 'orange',
      serviceName: 'ACME'
    });
    var $ = cheerio.load(html);
    assert.equal($('a:not([href])').length, 11);
  });

  it('should handle other templates', function() {
    var html = render({
      intro: 'Hi!\n\nPlease fill in the survey below:',
      outro: 'Bye!',
      urlParams: {
        token: 'aaa',
        userId: '1'
      },
      color: 'orange',
      serviceName: 'ACME',
      template: 'zonky'
    });
    var $ = cheerio.load(html);
    assert.equal(
      $(
        'img[src="https://zonky.cz/images/zebra/zebra-point-self-fill-flipped.png"]'
      ).length,
      1
    );
  });
});
