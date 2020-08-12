import axios, { AxiosRequestConfig } from 'axios';
import { parse, HTMLElement } from 'node-html-parser';
import dotenv from 'dotenv';

let errorCount = 0;

(async () => {
  dotenv.config();

  for (;;) {
    if (await main()) {
      console.log('新商品が追加されたのでストップします。');
      break;
    }
    await sleep(60000);
  }
})().catch(async (e) => {
  console.log(e);
  const options: AxiosRequestConfig = {
    method: 'post',
    baseURL: process.env.TEST_SLACK_URL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    data: `{
          "text": "<@${process.env.USER_ID_NO}> コスメチェックが失敗しました}",
        }`,
  };
  await axios.request(options);
});

// 2020/08/08 23:19時点での商品リスト
const currentItems = [
  'NEW!  Illicit Affairs',
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
  let res;
  try {
    res = await axios.get('https://www.shleeepolish.com/');
  } catch (err) {
    errorCount++;
    console.log(err);

    if (errorCount >= 5) {
      console.log('axiosで5回失敗しました');
      throw err;
    }
    return;
  }
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
      baseURL: process.env.SLACK_BASE_URL,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: `{
            "text": "<@${process.env.USER_ID_NM}> 新規に追加された商品です\n${newItems.join('\n')}",
          }`,
    };
    try {
      await axios.request(options);

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    console.log('追加されませんでした');
  }
}

async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}
