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

            <div className="giphy-search-results-grid">
                {initialData.catGiphys.data.map((each, index) => {
                    return (
                        <div key={index}>
                            <h3>{each.title}</h3>
                            <img src={each.images.original.url} alt={each.title}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const apiKey = process.env.GIPHY_API_KEY
    let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${apiKey}&limit=10`);
    catGiphys = await catGiphys.json();
    return {
        props: {catGiphys: catGiphys}
    }
}
