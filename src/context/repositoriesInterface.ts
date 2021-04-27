export interface RepositoriesInterface {
    findRepositories(userName: string): Promise<any>,
    repositories: Object[],
    error: any,
    repoRequestLoading: boolean,
    getRepositoryByName(userName: string, repositoryName: string): Promise<any>,
    repository: Object
}