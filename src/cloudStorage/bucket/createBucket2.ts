import { Storage } from '@google-cloud/storage';
import { v4 } from 'uuid';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucketName = `createbucket-${v4()}`;
  const options = {
    location: 'asia-northeast1',
    storageClass: 'standard',
  };
  const bucket = storage.bucket(bucketName);
  await bucket.create(options);
  console.log(bucketName);
})().catch(async (e) => {
  console.log(e);
  console.log(e.code, e.errors);
});
