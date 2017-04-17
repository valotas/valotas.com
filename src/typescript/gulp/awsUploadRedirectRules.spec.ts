import * as cp from 'child_process';
import * as moment from 'moment';
import { MetaFile } from '../content/MetaFile';
import { _RedirectRule, _Aws } from './awsUploadRedirectRules';


describe('_RedirectRule', () => {
  describe('isApplicable', () => {
    it('should return false if no file exists', () => {
      const actual = new _RedirectRule(null);

      expect(actual.isApplicable()).toBe(false);
    });

    it('should return false if file is unpublished', () => {
      const meta = new MetaFile();
      meta.published = false;
      const actual = new _RedirectRule(meta);

      expect(actual.isApplicable()).toBe(false);
    });

    it('should return false if file has no date', () => {
      const meta = new MetaFile();
      meta.published = true;
      const actual = new _RedirectRule(meta);

      expect(actual.isApplicable()).toBe(false);
    });

    it('should return true if file has date and is published', () => {
      const meta = new MetaFile();
      meta.published = true;
      meta.date = 'date';
      const actual = new _RedirectRule(meta);

      expect(actual.isApplicable()).toBe(true);
    });
  });

  describe('path', () => {
    it('should a path matching the old blogger one', () => {
      const meta = new MetaFile();
      meta.published = true;
      meta.date = '2015-08-24';
      meta.path = 'the-path';
      const rule = new _RedirectRule(meta);

      const actual = rule.path();

      expect(actual).toEqual(`2015/08/the-path.html`);
    });
  });

  describe('redirectLocation', () => {
    it('should return the given meta\'s path', () => {
      const meta = new MetaFile();
      meta.published = true;
      meta.date = '2015-08-24';
      meta.path = 'the-path';
      const rule = new _RedirectRule(meta);

      const actual = rule.redirectLocation();

      expect(actual).toEqual(`/the-path/`);
    });
  });
});

describe('_Aws', () => {

  describe('putRule', () => {
    const now = moment('2017-08-23T19:43:31');

    it('executes aws s3api put-object', (done) => {
      const meta = new MetaFile();
      meta.published = true;
      meta.date = '2015-08-24';
      meta.path = 'the-path';

      spyOn(cp, 'exec').and.callFake((cmd, cb) => {
        cb(null, cmd);
      });

      const aws = new _Aws('the-site.com', now);
      aws.putRule(new _RedirectRule(meta))
        .then((cmd) => {
          expect(cmd).toEqual([
            'aws s3api put-object',
            '--acl public-read',
            '--bucket "the-site.com"',
            '--key "2015/08/the-path.html"',
            '--expires "Tue, 21 Nov 2017 19:43:31 GTM"',
            '--website-redirect-location "/the-path/"'
          ].join(' '));
          done();
        })
        .catch(err => done.fail(err));
    });
  });
});
