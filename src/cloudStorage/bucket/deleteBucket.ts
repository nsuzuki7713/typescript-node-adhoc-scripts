import { Storage, DeleteBucketOptions } from '@google-cloud/storage';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucket = storage.bucket('createbucket-14de618e-a92e-465f-bd5d-2c83e82160ef');

  const options: DeleteBucketOptions = {
    ignoreNotFound: true,
  };
  await bucket.delete(options);
})().catch(async (e) => {
  console.log(e.code, e.errors);
});
