import React, { useState } from 'react';
import { doGetRequest } from '../provider/requestProvider';
import { RepositoriesInterface } from './repositoriesInterface';
import useSession from './useSession';

const useRepositories = (): RepositoriesInterface => {
    const [repositories, setRepositories] = useState([]);
    const [error, setError] = useState(null)
    const [repoRequestLoading, setLoading] = useState(false)

    const findRepositories = async (userName, token) => {
        try {
            setLoading(true)
            const { data } = await doGetRequest({ userName, token })
            const sortByBiggest = data.sort((ac, current) => ac.stargazers_count < current.stargazers_count ? 1 : -1)
            setRepositories(sortByBiggest)
            return data
        } catch (err) {
            console.log('err', err)
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        findRepositories,
        repositories,
        error,
        repoRequestLoading
    }
};





export default useRepositories;
