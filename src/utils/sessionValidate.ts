import { parseCookies } from './cookieHelper'

/**
 * handleSession - Check if session is valid
 * @param req - requisition
 * @param res - response
 * @returns token or redirect user to index page
 */
const handleSession = (req: any, res: any): any => {
    const data = parseCookies(req)
    if (!data.token) {
        res.statusCode = 302
        return false;
    } else {
        return data.token.replace('"', '').replace('"', '')
    }
}

const handleRedirect = (req: any, res: any, location: string = '/'): any => {
    res.statusCode = 302
    return res.setHeader('Location', location)
}

export { handleSession, handleRedirect }