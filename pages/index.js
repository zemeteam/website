import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zeme Team</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        </style>
      </Head>

      <main className={styles.main}>
        <img src="/zemeteam-logo.png" style={{width: '150px'}} />
      </main>
    </div>
  )
}
