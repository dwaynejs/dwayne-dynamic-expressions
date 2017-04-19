import { Block, initApp, removeApp, doc } from 'dwayne';
import { strictEqual } from 'assert';
import dynamicExpressions from '../src';

let app;
const container = doc.create('div');
const remove = () => {
  removeApp(container);
};

class App extends Block {
  b = 1;
  c = 2;

  afterRender() {
    app = this;
  }
}

Block.block('App', App.wrap(
  dynamicExpressions({
    a: js`args.a + args.b`
  })
));

describe('it should test injectLocalConstants wrapper', () => {
  before(() => {
    initApp(`<App/>`, container);
  });

  it('should test setting locals', () => {
    strictEqual(app.a, 3);
  });
  it('should test changing locals', () => {
    app.b = 3;
    app.c = 4;

    strictEqual(app.a, 7);
  });

  after(remove);
});
