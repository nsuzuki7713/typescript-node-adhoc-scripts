// 参照: https://maku.blog/p/7r6gr3d/P

import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';

type listOrgsReposResponse = Endpoints['GET /orgs/:org/repos']['response'];

(async () => {
  const octokit = new Octokit();

  const response = await octokit.repos.listForOrg({
    org: 'sony', // 取得対象とする組織 (organization)
    type: 'public', // public なリポジトリのみ取得
    sort: 'full_name', // レスポンスの data 配列を full_name でソート
    per_page: 5, // 1リクエストごとのデータ数（デフォルト:30、最大:100）
  });

  const data = response.data as listOrgsReposResponse['data'];

  for (const repo of data) {
    console.log(`${repo.full_name} - ${repo.description}`);
  }
})().catch((e) => {
  console.log(e);
});
