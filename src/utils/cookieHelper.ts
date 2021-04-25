import cookie from 'cookie'

type Icookie = {
  [key: string]: string
}

const parseCookies = (req: any): Icookie => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

export { parseCookies }
