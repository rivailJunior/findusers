import { Repository, repositoryMockValue } from './../model/repository';
import React, { useState } from 'react';
import { getRepositoriesByUserName, getRepository } from '../provider/requestProvider';
import { RepositoriesInterface } from './repositoriesInterface';
import useSession from './useSession';

const useRepositories = (): RepositoriesInterface => {
    const { sessionToken } = useSession()
    const [repositories, setRepositories] = useState([]);
    const [error, setError] = useState(null)
    const [repoRequestLoading, setLoading] = useState(false)
    const [repository, setRepository] = useState<Repository | any>(repositoryMockValue)

    const findRepositories = async (userName) => {
        try {
            setLoading(true)
            const { data } = await getRepositoriesByUserName({ userName, token: sessionToken })
            const sortByBiggest = data.sort((ac, current) => ac.stargazers_count < current.stargazers_count ? 1 : -1)
            setRepositories(sortByBiggest)
            return data
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const getRepositoryByName = async (userLogin, repositoryName) => {
        try {
            setLoading(true);
            const { data } = await getRepository({ userLogin, repositoryName, token: sessionToken });
            setRepository(data)
            return data;
        } catch (err) {
            console.log('error on get repository', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        findRepositories,
        repositories,
        error,
        repoRequestLoading,
        repository,
        getRepositoryByName
    }
};





export default useRepositories;
