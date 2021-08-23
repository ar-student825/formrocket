import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
  <Provider session={pageProps.session}>
  <Head>
        <title>FormRocket</title>
        <meta name="description" content="A new way to collect data from HTML forms." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Component {...pageProps} />
  </Provider>
  </>
  )
}

export default MyApp
