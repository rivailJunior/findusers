export interface RepositoriesInterface {
    findRepositories(userName: string): Promise<any>,
    repositories: any[],
    error: any,
    repoRequestLoading: boolean,
    getRepositoryByName(userName: string, repositoryName: string): Promise<any>,
    repository: Object
}