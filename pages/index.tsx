import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import Navbar from 'components/Navbar'
const fetcher = (...args) => fetch(...args).then((res) => res.json())


const Home: NextPage = () => {
  const { data, error } = useSWR('/api/users/v1/@me', fetcher)
  return (
    <div>
      <Head>
        <title>AyuBot</title>
        <meta name="description" content="Ayu dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p>{data?.username??"No one"}</p>
    </div>
  )
}

export default Home
