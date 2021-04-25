import React from 'react'
import { AppProps } from 'next/app'
import './app.scss'
import './fonts.scss'

import { CookiesProvider } from 'react-cookie'
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp
