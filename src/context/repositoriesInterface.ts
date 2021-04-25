import { User } from './../model/user';
export interface RepositoriesInterface {
    findRepositories(userName: string, token: string): Promise<any>,
    repositories: Object[],
    error: any,
    repoRequestLoading: boolean
}