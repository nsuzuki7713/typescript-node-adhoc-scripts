import * as fs from 'fs';

(async () => {
  const jsonObject: Record<string, any> = JSON.parse(fs.readFileSync(`${__dirname}/input.json`, 'utf8'));
  fs.writeFileSync(`${__dirname}/output.json`, JSON.stringify(jsonObject));
})().catch((e) => {
  console.log(e);
});
