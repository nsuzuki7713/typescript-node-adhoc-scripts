import * as yup from 'yup';

describe('yup', () => {
  describe('reach', () => {
    const schema = yup.object().shape({
      nested: yup.object().shape({
        arr: yup.array().of(yup.object().shape({ num: yup.number().max(4) })),
      }),
    });

    // NumberSchemaのが返ってくる
    console.log(yup.reach(schema, 'nested.arr.num'));
    yup.reach(schema, 'nested.arr[].num');
    yup.reach(schema, 'nested.arr[1].num');
    yup.reach(schema, 'nested["arr"][1].num');

    schema.validate;
  });
});
