import { Block } from 'dwayne';

const { hasOwnProperty } = {};

export function dynamicExpressionsWrapper(expressions) {
  return (Block) => {
    expressions = assign({}, expressions, Block.expressions);

    return class extends Block {
      constructor(opts) {
        super(opts);

        iterate(expressions, (expression, local) => {
          this[local] = undefined;
        });
      }

      afterConstruct() {
        iterate(expressions, (expression, local) => {
          this[local] = this.evaluate(expression, (newValue) => {
            this[local] = newValue;
          });
        });

        super.afterConstruct();
      }
    };
  };
}

export class DynamicExpressions extends Block {
  constructor(opts) {
    super(opts);

    iterate(this.getConstructor().expressions, (expression, local) => {
      this[local] = undefined;
    });
  }

  _afterConstruct() {
    iterate(this.getConstructor().expressions, (expression, local) => {
      this[local] = this.evaluate(expression, (newValue) => {
        this[local] = newValue;
      });
    });

    super._afterConstruct();
  }
}

function iterate(object, cb) {
  for (const local in object) {
    if (object::hasOwnProperty(local)) {
      cb(object[local], local);
    }
  }
}

function assign(object) {
  for (let i = 1, length = arguments.length; i < length; i++) {
    iterate(arguments[i], (value, key) => {
      object[key] = value;
    });
  }

  return object;
}
