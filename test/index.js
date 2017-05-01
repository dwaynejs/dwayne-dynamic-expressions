import { initApp } from 'dwayne-test-utils';
import { strictEqual } from 'assert';
import { Block } from 'dwayne';
import expressions from '../src';

let remove;

let App = class extends Block {
  b = 1;
  c = 2;
};

App = App.wrap(
  expressions({
    a: js`b + c`
  })
);

describe('it should test injectLocalConstants wrapper', () => {
  before(remove = initApp(App));

  it('should test setting locals', () => {
    strictEqual($app.a, 3);
  });
  it('should test changing locals', () => {
    $app.b = 3;
    $app.c = 4;

    strictEqual($app.a, 7);
  });

  after(remove);
});
