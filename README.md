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
import expressions from 'dwayne-dynamic-expressions';

class MyBlock extends Block {
  static html = html;
  static expressions = {
    b: js`c + args.b + globals.a`
  };

  b = 1;
}

export default MyBlock.wrap(
  expressions({
    a: js`b + args.a + globals.c`
  })
);

// or if you don't use dwayne babel preset

export default MyBlock.wrap(
  expressions({
    a(block) {
      return block.b + block.args + block.globals.c;
    }
  })
);
```

Expressions from the static property are merged with the wrapper
argument (static property has a higher priority). You can start
using them starting from `afterConstruct`.
