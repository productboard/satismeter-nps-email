import { assert } from 'chai';
import cheerio from 'cheerio';

import render from '..';
import messages from '../messages';

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
        someBoolean: true,
        someNumber: 2,
        notThis: undefined
      },
      color: 'orange',
      unsubscribeUrl: 'http://localhost/survey/unsubscribe?token=aaa&userId=1',
      translation: {
        HOW_LIKELY: 'Je ACME dobry?'
      }
    });

    assert.include(
      html,
      'href="http://localhost/survey?token=aaa&amp;userId=1&amp;someBoolean=true&amp;someNumber=2&amp;rating=10"'
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

  describe('V2', function() {
    it('should handle V2 survey', function() {
      const html = render({
        template: 'surveyV2',
        url: 'localhost/survey',
        urlParams: { token: 'aaa' },
        question: {
          id: 'QID',
          label: messages.HOW_LIKELY,
          type: 'scale',
          max: 10,
          min: 0,
          maxLegend: messages.LIKELY,
          minLegend: messages.UNLIKELY
        }
      });

      assert.isString(html);
      assert.include(html, messages.INTRO.split('\n\n')[0]);
      assert.include(html, messages.INTRO.split('\n\n')[1]);
      assert.include(html, messages.HOW_LIKELY);
      assert.include(html, messages.UNLIKELY);
      assert.include(html, messages.LIKELY);
      assert.include(html, messages.OUTRO.split('\n\n')[0]);
      assert.include(html, messages.OUTRO.split('\n\n')[1]);

      const $ = cheerio.load(html);
      assert.equal($('a[href*="survey?token=aaa"]').length, 11);
    });

    it('should handle NPS in legacy rating parameter mode', function() {
      const html = render({
        template: 'surveyV2',
        legacyRatingParameterMode: true,
        url: 'localhost/survey',
        urlParams: { token: 'aaa' },
        question: {
          id: 'SM_rating',
          label: messages.HOW_LIKELY,
          type: 'scale',
          max: 10,
          min: 0,
          maxLegend: messages.LIKELY,
          minLegend: messages.UNLIKELY
        }
      });

      const $ = cheerio.load(html);
      assert.equal($('a[href*="survey?token=aaa&rating="]').length, 11);
    });

    it('should handle single-choice surveys', function() {
      const html = render({
        template: 'surveyV2',
        question: {
          choices: ['abc', '123'],
          id: 'QID',
          type: 'single-choice',
          label: 'What is the reason you are leaving?'
        },
        url: 'localhost/survey',
        urlParams: { token: 'aaa' }
      });

      const $ = cheerio.load(html);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=abc"]').length, 1);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=123"]').length, 1);
    });

    it('should handle custom scale surveys', function() {
      const html = render({
        template: 'surveyV2',
        question: {
          max: 3,
          min: 1,
          maxLegend: messages.AGREE,
          minLegend: messages.DISAGREE,
          label: 'I agree with this statement',
          id: 'QID',
          type: 'scale'
        },
        url: 'localhost/survey',
        urlParams: { token: 'aaa' }
      });

      const $ = cheerio.load(html);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=1"]').length, 1);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=2"]').length, 1);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=3"]').length, 1);
    });

    it('should handle odd custom scales', function() {
      const html = render({
        template: 'surveyV2',
        question: {
          max: -1,
          min: -3,
          maxLegend: messages.AGREE,
          minLegend: messages.DISAGREE,
          label: 'I like odd scales',
          id: 'QID',
          type: 'scale'
        },
        url: 'localhost/survey',
        urlParams: { token: 'aaa' }
      });

      const $ = cheerio.load(html);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=-1"]').length, 1);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=-2"]').length, 1);
      assert.equal($('a[href*="survey?token=aaa&answers[QID]=-3"]').length, 1);
    });
  });
});
