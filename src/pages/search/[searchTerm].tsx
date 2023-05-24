import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";

import Footer from "../../components/common/footer/footer";

export default function Search(initialData) {
    const router = useRouter();
    const userSearchTerm = (router.query.searchTerm as string).trim();
    const metaDescription = userSearchTerm.length > 0
        && initialData?.giphys
        && initialData.giphys.length > 0
        && initialData.giphys.map((each, index) => each.title + " ");
    return (
        <>
            <div className="container">
                <Head>
                    <title>Search results for {userSearchTerm}</title>
                    <meta name="description" content={metaDescription}></meta>

                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="stylesheet" href="/styles.css"/>
                </Head>
                <p>Go <Link href="/">home</Link></p>
                <h1>Search results for: {userSearchTerm}</h1>
                <div className="giphy-search-results-grid">
                    {
                        initialData?.giphys && initialData.giphys.length > 0 && initialData.giphys.map((each, index) => {
                            return (
                                <div key={index}>
                                    <h3>{each.title}</h3>
                                    <img src={each.images.original.url} alt={each.title}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context) {
    const apiKey = process.env.GIPHY_API_KEY
    const searchTerm = context.query.searchTerm;
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=6`);
    giphys = await giphys.json();
    return {props: {giphys: giphys.data}}
}
