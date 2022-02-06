import * as yup from 'yup';

// スキーマオブジェクトを作成
// let schema = yup.object().shape({
//   name: yup.string().required(),
//   age: yup.number().required().positive().integer(),
//   email: yup.string().email(),
//   website: yup.string().url(),
//   createdOn: yup.date().default(function () {
//     return new Date();
//   }),
// });

// // check validity
// schema
//   .isValid({
//     name: 'jimmy',
//     age: 24,
//   })
//   .then(function (valid) {
//     console.log(valid);
//   });

// // you can try and type cast objects to the defined schema
// schema.cast({
//   name: 'jimmy',
//   age: '24',
//   createdOn: '2014-09-23T19:25:25Z',
// });
// // => { name: 'jimmy', age: 24, createdOn: Date }

let schema = yup.object().shape({
  nested: yup.object().shape({
    arr: yup.array().of(yup.object().shape({ num: yup.number().max(4) })),
  }),
});

yup.reach(schema, 'nested.arr.num');
yup.reach(schema, 'nested.arr[].num');
yup.reach(schema, 'nested.arr[1].num');
yup.reach(schema, 'nested["arr"][1].num');
