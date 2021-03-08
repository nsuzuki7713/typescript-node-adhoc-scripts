// import { Storage, GetFilesOptions } from '@google-cloud/storage';

// (async () => {
//   const storage = new Storage({
//     projectId: 'firebase-tutorial-suzuki',
//     keyFilename: './src/cloudLogging/key.json',
//   });

//   const bucket = storage.bucket('createbucket-69fd9e10-25eb-4311-aac3-9641fa49c247');

//   const options: GetFilesOptions = {};
//   // const options: GetFilesOptions = {
//   //   autoPaginate: false,
//   //   delimiter: 'a/',
//   // };
//   const [files] = await bucket.getFiles(options);

//   files.forEach((file) => {
//     console.log(file.name);
//   });
// })().catch(async (e) => {
//   console.log(e.code, e.errors);
// });

import { Storage, GetFilesOptions } from '@google-cloud/storage';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  // const bucket = storage.bucket('createbucket-69fd9e10-25eb-4311-aac3-9641fa49c247');
  const bucket = storage.bucket('createbucket-3f8018e7-76c8-4aa8-8613-47b218feb1a3');

  // const options: GetFilesOptions = {};
  const options: GetFilesOptions = {
    autoPaginate: true,
    delimiter: '/',
    prefix: 'b/d/',
  };

  const files = await bucket.getFiles(options);
  files[0].forEach((file) => {
    console.log(file.name);
  });

  files[2].prefixes.forEach((dir: any) => {
    console.log(dir);
  });
})().catch(async (e) => {
  console.log(e.code, e.errors);
});
