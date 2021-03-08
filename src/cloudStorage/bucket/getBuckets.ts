import { GetBucketsRequest, Storage } from '@google-cloud/storage';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const options: GetBucketsRequest = {
    prefix: 'createbucket-',
  };
  const [buckets] = await storage.getBuckets(options);
  buckets.forEach((bucket) => console.log(bucket.name));
})().catch(async (e) => {
  console.log(e.code, e.errors);
});
