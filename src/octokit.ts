/* eslint-disable @typescript-eslint/no-unused-vars */
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();
const octokit = new Octokit({
  auth: process.env.GIHUB_ACCESS_TOKEN,
});

const owner = 'nsuzuki7713';
const repo = 'typescript-node-adhoc-scripts';

const fetchShaFromBranch = async (branch: string): Promise<string> => {
  const { data } = await octokit.repos.getBranch({
    owner,
    repo,
    branch,
  });
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

(async () => {
  await createTag('master', `test-tag-${Date.now()}`);
})().catch((e) => {
  console.log(e);
});
