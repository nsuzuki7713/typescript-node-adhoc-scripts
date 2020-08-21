/* eslint-disable @typescript-eslint/no-unused-vars */
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

// dirPath以下を再帰的に検索してのfile一覧を取得する
const func2 = (dirPath: string): { dir: string; name: string }[] => {
  const allDirents = fs.readdirSync(dirPath, { withFileTypes: true });

  const files = [];
  for (const dirent of allDirents) {
    if (dirent.isDirectory()) {
      const fp = path.join(dirPath, dirent.name);
      files.push(func2(fp));
    } else if (dirent.isFile() && ['.txt'].includes(path.extname(dirent.name))) {
      files.push({
        dir: path.join(dirPath, dirent.name),
        name: dirent.name,
      });
    }
  }
  return files.flat();
};

(async () => {
  const dirPath = './__tests__/readFileList';
  // func1(dirPath);
  console.log(func2(dirPath));
})().catch((e) => {
  console.log(e);
});
