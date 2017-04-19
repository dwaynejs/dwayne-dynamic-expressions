# dwayne-dynamic-expressions

### Why?

The plugin is needed for setting locals to the results of evaluating
dynamic expressions (depending on args, globals or other locals).

### Installation

```bash
$ npm install --save dwayne-dynamic-expressions
```

### Usage

```html
<!-- MyBlock/index.html -->

<div>
  <span>{a}</span>
  <span>{a}</span>
</div>
```

```js
// MyBlock/index.js

import { Block } from 'dwayne';
import template from './index.html';
import dynamicExpressions from 'dwayne-dynamic-expressions';

class MyBlock extends Block {
  static template = template;
  
  b = 1;
}

Block.block('MyBlock', MyBlock.wrap(
  dynamicExpressions({
    a: js`b + args.a + globals.c`
  })
));

// or if you don't use dwayne babel preset

Block.block('MyBlock', MyBlock.wrap(
  dynamicExpressions({
    a(block) {
      return block.b + block.args + block.globals.c;
    }
  })
));
```
