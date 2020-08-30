/* eslint-disable @typescript-eslint/no-unused-vars */
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();
const octokit = new Octokit({
  auth: process.env.GIHUB_ACCESS_TOKEN,
});

const owner = 'nsuzuki7713';
const repo = 'typescript-node-adhoc-scripts';

const fetchShaFromBranch = async (branch: string): Promise<string> => {
  const { data } = await octokit.repos.getBranch({ owner, repo, branch });
  return data.commit.sha;
};

const createTag = async (branch: string, tagName: string) => {
  const sha = await fetchShaFromBranch(branch);

  await octokit.git.createTag({
    owner,
    repo,
    tag: tagName,
    message: '',
    object: sha,
    type: 'commit',
  });

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/tags/${tagName}`,
    sha,
  });
};

const getPullRequestMergingList = async (base: string, head: string): Promise<PullRequestList[]> => {
  const response = await octokit.repos.compareCommits({ owner, repo, base, head });
  return response.data.commits.reduce((acc, cur) => {
    const [title, , ...body] = cur.commit.message.split('\n');
    const result = title.match(/Merge pull request (#.)/);
    if (result) {
      acc.push({
        pullRequestNumber: result[1],
        message: body[0],
      });
    }
    return acc;
  }, [] as PullRequestList[]);
};

const createRelease = async (tagName: string): Promise<void> => {
  const list = await getPullRequestMergingList(tagName, 'master');

  let body: string[] = [];
  body.push('# テストリリースのbody');
  body.push('## リリース内容');
  body.push('| プルリク | 内容 |');
  body.push('| -- | -- |');
  list.forEach(({ pullRequestNumber, message }) => {
    body.push(`| ${pullRequestNumber} | ${message} |`);
  });

  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: tagName,
    name: 'テストリリースのタイトル',
    body: body.join('\n'),
  });
};

const createIssue = async (tagName: string) => {
  const list = await getPullRequestMergingList(tagName, 'master');

  let body: string[] = [];
  body.push('# テストリリースのbody');
  body.push('## リリース内容');
  body.push('| プルリク | 内容 |');
  body.push('| -- | -- |');
  list.forEach(({ pullRequestNumber, message }) => {
    body.push(`| ${pullRequestNumber} | ${message} |`);
  });

  await octokit.issues.create({
    owner,
    repo,
    title: 'issueテスト',
    body: body.join('\n'),
  });
};

const createPulls = async (base: string, head: string): Promise<void> => {
  await octokit.pulls.create({
    owner,
    repo,
    title: 'プルリクテスト',
    head,
    base,
    body: 'bodyテスト',
  });
};

const listPulls = async () => {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'all',
    per_page: 100,
  });

  for (const datum of data) {
    const createdAt = moment(datum.created_at);
    const updatedAt = moment(datum.updated_at);
    console.log(
      datum.html_url,
      datum.title,
      createdAt.format('YYYY/MM/DD HH:mm:ss'),
      updatedAt.format('YYYY/MM/DD HH:mm:ss')
    );
  }
};

(async () => {
  // await createTag('master', `test-tag-${Date.now()}`);
  // console.log(await getPullRequestMergingList('test-tag-1598708009047', 'master'));
  // await createRelease('test-tag-1598708009047');
  // await createIssue('test-tag-1598708009047');
  // await createPulls('master', 'feature/octokit');
  await listPulls();
})().catch((e) => {
  console.log(e);
});

interface PullRequestList {
  pullRequestNumber: string;
  message: string;
}
