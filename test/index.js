import { initApp } from 'dwayne-test-utils';
import { strictEqual } from 'assert';
import { Block } from 'dwayne';
import { dynamicExpressionsWrapper, DynamicExpressions } from '../src';

let remove;

let App1 = class extends Block {
  b = 1;
  c = 2;
};

App1 = App1.wrap(
  dynamicExpressionsWrapper({
    a: js`b + c`
  })
);

class BaseBlock extends Block {}

BaseBlock.extend(DynamicExpressions);

class App2 extends BaseBlock {
  static expressions = {
    a: js`b + c`
  };

  b = 1;
  c = 2;
}

describe('it should test dynamicExpressions wrapper', () => {
  before(remove = initApp(App1));

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

describe('it should test DynamicExpressions extend class', () => {
  before(remove = initApp(App2));

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
