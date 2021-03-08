import { Storage } from '@google-cloud/storage';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucket = storage.bucket('createbucket-69fd9e10-25eb-4311-aac3-9641fa49c247');
  const srcFileName = '35178b3c-602d-44db-a01a-92f995ac3165/uploadFile';

  const res = await bucket.file(srcFileName).get();
  console.log(res[0].name);
})().catch(async (e) => {
  console.log(e.code, e.errors);
});
