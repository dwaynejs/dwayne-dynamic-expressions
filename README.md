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
import html from './index.html';
import { dynamicExpressionsWrapper } from 'dwayne-dynamic-expressions';

class MyBlock extends Block {
  static html = html;
  static expressions = {
    b: js`c + args.b + globals.a`
  };

  b = 1;
}

export default MyBlock.wrap(
  dynamicExpressionsWrapper({
    a: js`b + args.a + globals.c`
  })
);

// or if you don't use dwayne babel preset

export default MyBlock.wrap(
  dynamicExpressionsWrapper({
    a(block) {
      return block.b + block.args + block.globals.c;
    }
  })
);
```

Expressions from the static property are merged with the wrapper
argument (static property has a higher priority). You can start
using them starting from `afterConstruct`.

### API

The plugin exports a wrapper function and an extend class.

##### `dynamicExpressionsWrapper(Object?: expressions): typeof Block`

Use this to apply the plugin behaviour to the block that you wrap.
The wrapper merges the argument with the block static `expressions`
property and uses the merged object.

Example:

```js
export default MyBlock.wrap(
  dynamicExpressionsWrapper({
    a: js`b + c`
  })
);
```

##### `DynamicExpressions`

Extend the default block with this block to apply the behaviour to
all blocks you use. The plugin will use the block static `expressions`
property.

```js
Block.extend(DynamicExpressions);
```
