import * as fs from 'fs';

const level = (level: number | string): number => {
  if (typeof level === 'number') {
    return level;
  }

  switch (level) {
    case 'off':
      return 0;
    case 'warn':
      return 1;
    case 'error':
      return 2;
    default:
      throw new Error('想定外の値');
  }
};

(async () => {
  const jsonObject: Record<string, any> = JSON.parse(fs.readFileSync(`${__dirname}/../eslint-setting.json`, 'utf8'));
  const eslintUrl = 'https://eslint.org/docs/rules/';
  const typescriptEslintUrl =
    'https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules/';

  const rules: { url: string; level: number }[] = [];
  for (const [key, value] of Object.entries(jsonObject.rules)) {
    let url = `${eslintUrl}${key}`;
    if (key.startsWith('@typescript-eslint')) {
      url = `${typescriptEslintUrl}${key.replace('@typescript-eslint/', '')}.md`;
    }
    rules.push({
      url: `[${key}](${url})`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      level: level(value[0]),
    });
  }
  rules.sort((a, b) => a.level - b.level);
  rules.forEach((rule) => {
    console.log(`${rule.url}: ${rule.level}`);
  });
  return;
})().catch(async () => {});
