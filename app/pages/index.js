import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
export default function Home() {
  useEffect(()=>{
    document.getElementById('imagecontainer').innerHTML = `<center><img src="/files/form.svg" width="50%" /></center>`
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>FormRocket</title>
        <meta name="description" content="A new way to collect data from HTML forms." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div id="imagecontainer">

        </div>
        <h1 className={styles.title}>
          Forms, Your Way
        </h1>

        <p className={styles.description}>
        A new way to collect data from HTML forms.
        </p>

        <p>
          Coming next year.
        </p>

      </main>

    </div>
  )
}
