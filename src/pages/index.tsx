import Head from 'next/head'

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>Gabo's Giphy Search App</h1>
    </div>
  )
}
