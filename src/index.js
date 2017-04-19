const { hasOwnProperty } = {};

export default (expressions) => {
  return (Block) => {
    return class extends Block {
      constructor(opts) {
        super(opts);

        for (const local in expressions) {
          if (expressions::hasOwnProperty(local)) {
            this[local] = this.evaluateAndWatch(expressions[local], (newValue) => {
              this[local] = newValue;
            });
          }
        }
      }
    };
  };
};
