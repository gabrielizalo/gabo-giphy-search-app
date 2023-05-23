import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";

export default function Search (initialData) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Search</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <p>Go <Link href="/">home</Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>
            <div className="giphy-search-results-grid">
                {
                    initialData?.giphys && initialData.giphys.length > 0 && initialData.giphys.map((each, index) => {
                        return (
                            <div key={index}>
                                <h3>{each.title}</h3>
                                <img src={each.images.original.url} alt={each.title} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const apiKey = process.env.GIPHY_API_KEY
    const searchTerm = context.query.searchTerm;
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=6`);
    giphys = await giphys.json();
    return { props: { giphys: giphys.data } }
}
