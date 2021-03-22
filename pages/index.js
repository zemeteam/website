import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zeme.team</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        </style>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Zeme team
        </h1>
        <b>Earn shielded Zcash for creating fun and educational zemes.</b>
      </main>
    </div>
  )
}
