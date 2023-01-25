import Head from 'next/head'
import {useEffect} from "react";

export default function Home(initialData: any) {
    useEffect(() => {
        console.log(initialData);
    })

    return (
        <div className='container'>
            <Head>
                <title>Gabo's Giphy Search App</title>

                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="/styles.css"/>
            </Head>

            <h1>Gabo's Giphy Search App</h1>
        </div>
    )
}

export async function getStaticProps() {
    let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=process.env.GIPHY_API_KEY&limit=10');
    catGiphys = await catGiphys.json();
    return {
        props: {cat: catGiphys}
    }
}
