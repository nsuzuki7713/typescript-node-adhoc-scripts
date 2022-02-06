import * as yup from 'yup';

describe('yup', () => {
  it('使い方', async () => {
    let schema = yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().positive().integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    // schemaが正しい場合はtrueを返す
    const result = await schema.isValid({
      name: 'jimmy',
      age: 24,
    });

    console.log(result);

    // castされる
    // { name: 'jimmy', age: 24, createdOn: Date }
    const cast = schema.cast({
      name: 'jimmy',
      age: '24',
      createdOn: '2014-09-23T19:25:25Z',
    });

    console.log(cast);
  });

  describe('validate', () => {
    it('正しいスキーマの場合', async () => {
      const schema = yup.object({
        name: yup.string().required(),
        age: yup.number().required().positive(),
      });

      const params = {
        name: 'jimmy',
        age: 23,
      };

      try {
        const result = await schema.validate(params, { strict: true });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    });

    it('正しくないスキーマの場合', async () => {
      const schema = yup.object({
        name: yup.string().required(),
        age: yup.number().required().positive(),
      });

      const params = {
        name: 12,
      };

      try {
        const result = await schema.validate(params, { strict: true, abortEarly: false });
        console.log(result);
      } catch (e) {
        if (e instanceof yup.ValidationError) {
          console.log('yup error');
          console.log(e);
        } else {
          console.log(e);
        }
      }
    });
  });

  describe('schema', () => {
    it('test1', () => {
      type Human = {
        name: string;
        age?: number;
      };
      // https://github.com/jquense/yup/blob/master/docs/typescript.md#typescript-support
      const validateSchema: yup.SchemaOf<Human> = yup
        .object({
          name: yup.string().defined(),
          age: yup.number(),
        })
        .defined();
      validateSchema.validateSync({ name: 'jon', age: 12 });
    });

    it('test2', async () => {
      const schema = yup.object({
        id: yup.string().required(),
        names: yup.object({
          first: yup.string().required(),
        }),
      });
      // falseが変える
      //github.com/jquense/yup#object-schema-defaults
      console.log(schema.isValidSync({ id: 1 }));
    });

    it.only('test3', async () => {
      const schema = yup.object({
        id: yup.string().required(),
        names: yup
          .object({
            first: yup.string().required(),
          })
          .nullable()
          .default(null),
      });
      // trueが変える
      console.log(schema.isValidSync({ id: 1 }));
    });
  });

  describe('array', () => {
    it('test1', async () => {
      const schema = yup.array().of(yup.number().min(2));

      await schema.isValid([2, 3]); // => true
      await schema.isValid([1, -24]); // => false

      schema.cast(['2', '3']); // => [2, 3]
    });
  });
});
