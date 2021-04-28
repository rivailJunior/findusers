import { User } from './../model/user';
export interface SessionInterface {
    sessionToken: string,
    setSession?: Function,
    removeSession: Function,
    user?: User,
    findUser(userName: string): Promise<User | any>,
    findError?: string,
    setUser
}