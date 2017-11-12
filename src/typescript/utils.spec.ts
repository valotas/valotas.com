/* eslint-env jasmine */
import { inflate, deflate, compareMoments } from './utils';
import * as moment from 'moment';

describe('deflate/infalte', () => {
  const obj = {
    param1: 'val1',
    param2: {
      param21: 'val21',
      param22: 'val22'
    }
  };

  it('should be able to inflate a given object and deflate it back', () => {
    const binary = deflate(obj);
    expect(binary).toBeTruthy();
    const restored = inflate(binary);
    expect(restored).toEqual(obj);
  });
});

describe('compareMoments', () => {
  class Dummy {
    constructor(private date: string) {}

    moment() {
      return moment(this.date);
    }
  }
  it('should sort arrays in moment descending order', () => {
    const one = new Dummy('2013-05-01');
    const two = new Dummy('2015-05-01');
    const three = new Dummy('2014-05-01');

    const actual = [one, two, three].sort(compareMoments);
    expect(actual).toEqual([two, three, one]);
  });
});
