import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'
const styles={
  wrapper:`bg-black h-screen overflow-hidden`,
  container:`flex `
}
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>
          SPOTIFY
        </title>
      </Head>
     <main className={styles.container}>
        <Sidebar/>
        <Center/>
     </main>
     <div className='sticky bottom-0 text-white'>
        <Player/>
     </div>
    </div>
  )
}
