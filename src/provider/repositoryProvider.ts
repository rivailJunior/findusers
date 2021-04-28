import { Repository } from './../model/repository';
import { Octokit } from '@octokit/core'
type iGetParams = {
    userName?: string,
    token: string
}

const getRepositoriesByUserName = async ({
    userName,
    token
}: iGetParams): Promise<any> => {
    const octokit = new Octokit({ auth: token });
    return await octokit.request('/users/{username}/repos', {
        username: userName
    })
}

type IGetRepo = {
    userLogin: string,
    repositoryName: string,
    token: string
}
const getRepository = async ({ userLogin, repositoryName, token }: IGetRepo) => {
    const octokit = new Octokit({ auth: token });
    return await octokit.request('GET /repos/{owner}/{repo}', {
        owner: userLogin,
        repo: repositoryName
    })
}

export { getRepositoriesByUserName, getRepository };