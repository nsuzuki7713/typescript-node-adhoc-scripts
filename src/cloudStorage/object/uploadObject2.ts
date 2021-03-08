import { Storage, UploadOptions } from '@google-cloud/storage';
// import { v4 } from 'uuid';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucket = storage.bucket('createbucket-69fd9e10-25eb-4311-aac3-9641fa49c247');
  const options: UploadOptions = {
    contentType: 'application/zip',
  };

  await bucket.upload('./src/cloudStorage/object/uploadObject.zip', options);
})().catch(async (e) => {
  console.log(e);
  console.log(e.code, e.errors);
});
