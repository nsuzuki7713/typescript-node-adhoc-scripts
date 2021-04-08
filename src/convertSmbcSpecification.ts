import fs from 'fs';
import iconv from 'iconv-lite';

const file = fs.readFileSync('./meisai.csv');
const text = iconv.decode(Buffer.from(file), 'Shift_JIS');
const details = text.split('\r\n').slice(1);

fs.unlinkSync('./convertMeisai.csv');
fs.writeFileSync('./convertMeisai.csv', `年\t月\t日\tお引出し\tお預入れ\tお取り扱い内容\t残高\t詳細\r\n`);
details.map((detail) => {
  const items = detail.split(',');
  const date = items[0].split('.');

  const outPut = [
    convertWarekiToSeireki(date[0]),
    Number(date[1]),
    date[2],
    ...items.slice(1),
    convertUse(items[2], items[3]),
  ].join('\t');

  fs.appendFileSync('./convertMeisai.csv', `${outPut}\r\n`);
});

function convertWarekiToSeireki(wareki: string): number {
  switch (wareki) {
    case 'R01':
      return 2019;
    case 'R02':
      return 2020;
    case 'R03':
      return 2021;
    case 'R04':
      return 2022;
    case 'R05':
      return 2023;
    default:
      return 9999;
  }
}

function convertUse(deposit: string, content: string): string {
  if (deposit) {
    return '入金';
  }

  const funds = [
    '"MHF)ｳｴﾙｽﾅﾋﾞ"',
    '"AP(ﾏﾈﾂｸｽﾂﾐﾀﾃ"',
    '"ｺｸﾐﾝﾈﾝｷﾝｷｷﾝﾚﾝｺﾞｳｶｲ(ｶ"',
    '"ｼﾖｳｷﾎﾞｶｹｷﾝ"',
    '"ﾏﾈﾂｸｽｼﾖｳｹﾝ"',
    '"DF.THEOﾂﾐﾀﾃ"',
  ];
  if (funds.includes(content)) {
    return '資金移動';
  }

  return '支払い';
}
