import axios, { AxiosRequestConfig } from 'axios';
import { parse, HTMLElement } from 'node-html-parser';
import dotenv from 'dotenv';

(async () => {
  dotenv.config();
  await main();
})().catch((e) => {
  console.log(e);
});

// 2020/08/08 23:19時点での商品リスト
const currentItems = [
  'NEW!  Crickets *Limit 1 per customer*',
  'NEW!  Illicit Affairs *Limit 1 per customer*',
  'Moder',
  'Quick Convo',
  'Beauxbatons',
  'Top Glass - Top Coat',
  'Modern Loneliness',
  'Wicked Moon',
  'Rain on Me 2.0',
  'May Queen',
  `Hell's Princess`,
  'Elvish',
];

async function main() {
  const res = await axios.get('https://www.shleeepolish.com/');
  const root = parse(res.data) as HTMLElement;
  const lists = root.querySelectorAll('.listing-card');
  const newItems = [];

  for (const list of lists) {
    const url = list.getAttribute('href');
    const item = list.querySelector('.card-label .title').text;

    if (!currentItems.includes(item)) {
      newItems.push(`<https:${url}|${item}>`);
    }
  }

  if (newItems.length > 0) {
    const options: AxiosRequestConfig = {
      method: 'post',
      baseURL: process.env.TEST_SLACK_URL,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: `{
            "text": "新規に追加された商品です\n${newItems.join('\n')}",
          }`,
    };
    try {
      console.log(options);
      await axios.request(options);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('追加されませんでした');
  }
}
