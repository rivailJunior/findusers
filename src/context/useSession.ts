import { User } from './../model/user';
import { SessionInterface } from './sessionInterface';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
export default function useSession(session: string, userData: User): SessionInterface {
    const [cookie, setCookie, removeCookie] = useCookies(['session'])
    const [sessionToken, setSession] = useState(cookie.token)
    const [user, setUser] = useState(cookie.user);
    const router = useRouter()

    useEffect(() => {
        if (session && !user) {
            setCookie('token', JSON.stringify(session))
            setCookie('user', JSON.stringify(userData))
            setUser(userData)
        }
    }, []);

    const removeSession = () => {
        setSession('')
        removeCookie('token')
        removeCookie('user')
        router.push('/')
    }

    return {
        removeSession,
        setSession,
        user,
        sessionToken
    }
}