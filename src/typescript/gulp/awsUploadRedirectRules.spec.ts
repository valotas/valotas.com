import { MetaFile } from '../content/MetaFile';
import { _RedirectRule } from './awsUploadRedirectRules';


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

      expect(actual).toEqual(`/2015/08/the-path.html`);
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
