import * as td from 'testdouble';
export * from 'testdouble';

let initialized = false;

(function init() {
  if (initialized) {
    return;
  }

  beforeEach(() => {
    console.log('Screem!');
  });

  afterEach(() => {
    td.reset();
  });

  initialized = true;
})();
