import { Repository } from './../model/repository';
export interface RepositoriesInterface {
    findRepositories(userName: string): Promise<[Repository]>,
    repositories: Repository[],
    error: any,
    repoRequestLoading: boolean,
    getRepositoryByName(userName: string, repositoryName: string): Promise<any>,
    repository: Repository
}