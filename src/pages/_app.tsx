import React from 'react'
import { AppProps } from 'next/app'
import './app.scss'
import './fonts.scss'
import Head from 'next/head'
import { CookiesProvider } from 'react-cookie'
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Find Users</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </div>

  )
}

export default MyApp
