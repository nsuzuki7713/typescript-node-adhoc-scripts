import { Storage, DeleteFileOptions } from '@google-cloud/storage';

(async () => {
  const storage = new Storage({
    projectId: 'firebase-tutorial-suzuki',
    keyFilename: './src/cloudLogging/key.json',
  });

  const bucket = storage.bucket('createbucket-69fd9e10-25eb-4311-aac3-9641fa49c247');
  const srcFileName = 'a.txt';
  const options: DeleteFileOptions = {
    // オブジェクトが存在しない場合エラーにするかどうか
    ignoreNotFound: true,
  };

  await bucket.file(srcFileName).delete(options);
})().catch(async (e) => {
  console.log(e.code, e.errors);
});
