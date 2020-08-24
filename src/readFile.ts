import fs from 'fs';

const func1 = (filePath: string) => {
  const buff = fs.readFileSync(filePath, 'utf-8');
  return buff;
};

(async () => {
  const dirPath = './__tests__/readFileList/testFile.txt';
  // func1(dirPath);
  console.log(func1(dirPath));
  const used = process.memoryUsage();
  for (const [key, value] of Object.entries(used)) {
    console.log(`${key} ${Math.round((value / 1024 / 1024) * 100) / 100} MB`);
  }
})().catch((e) => {
  console.log(e);
});

// setInterval(() => {
//   const used = process.memoryUsage();
//   const messages = [];
//   for (let key in used) {
//     messages.push(`${key}: ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
//   }
//   console.log(new Date(), messages.join(', '));
// }, 5 * 60 * 1000);
