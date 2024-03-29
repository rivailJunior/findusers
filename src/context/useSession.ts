import { User } from './../model/user';
import { SessionInterface } from './sessionInterface';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getNewUser } from '../provider/requestProvider';
export default function useSession(session?: string, userData?: User): SessionInterface {
    const [cookie, setCookie, removeCookie] = useCookies(['session'])
    const [sessionToken, setSession] = useState(cookie.token)
    const [loggedUser, setloggedUser] = useState(cookie.loggedUser);
    const [user, setUser] = useState(cookie.user);
    const [findError, setError] = useState(null);
    const router = useRouter()

    useEffect(() => {
        if (session && !user) {
            setCookie('token', JSON.stringify(session))
            setCookie('user', JSON.stringify(userData))
            setUser(userData)
        }
        if (session && userData) {
            setCookie('loggedUser', JSON.stringify(userData))
            setloggedUser(userData)
        }
    }, []);

    useEffect(() => {
        setCookie('user', JSON.stringify(user))
    }, [user])

    const removeSession = () => {
        setSession('')
        removeCookie('token')
        removeCookie('user')
        router.push('/')
    }

    const findUser = async (userName) => {
        try {
            const { data } = await getNewUser({ userName, token: sessionToken });
            setUser(data)
            setError(null);
            return data;
        } catch (err) {
            setUser({})
            setError("Nenhum usuário encontrado!")
        }

    }

    return {
        removeSession,
        setSession,
        user,
        sessionToken,
        findUser,
        findError,
        setUser,
        loggedUser
    }
}