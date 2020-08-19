import fs from 'fs';
import path from 'path';

// dirPath直下のfile一覧を取得する
// ２階層目のディレクトリ配下は検索しない
const func1 = (dirPath: string) => {
  const allDirents = fs.readdirSync(dirPath, { withFileTypes: true });
  const fileNames = allDirents
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => {
      return {
        dir: path.join(dirPath, name),
        name,
      };
    });
  console.log(fileNames);
};

(async () => {
  const dirPath = './__tests__/readFileList';
  func1(dirPath);
})().catch((e) => {
  console.log(e);
});
