import { CreateBucketRequest, Storage } from '@google-cloud/storage';
import { v4 } from 'uuid';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucketName = `createbucket-${v4()}`;
  const metadata: CreateBucketRequest = {
    location: 'asia-northeast1',
    storageClass: 'standard',
  };
  const [bucket] = await storage.createBucket(bucketName, metadata);
  console.log(`${bucket.name}`);
})().catch(async (e) => {
  console.log(e);
  console.log(e.code, e.errors);
});
