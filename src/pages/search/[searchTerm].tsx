import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";

import Footer from "../../components/common/footer/footer";
import React from "react";

export default function Search(initialData: any) {
    const router = useRouter();
    const userSearchTerm = (router.query.searchTerm as string).trim();
    const metaDescription = userSearchTerm.length > 0
        && initialData?.giphys
        && initialData.giphys.length > 0
        && initialData.giphys.map((each: any) => each.title + " ");
    return (
        <>
            <div className="container">
                <Head>
                    <title>Search results for {userSearchTerm}</title>
                    <meta name="description" content={metaDescription}></meta>
                    <link rel="stylesheet" href="/styles.css"/>

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#2d89ef"/>
                    <meta name="theme-color" content="#ffffff"/>
                </Head>
                <p>Go <Link href="/">home</Link></p>
                <h1>Search results for: {userSearchTerm}</h1>
                <div className="giphy-search-results-grid">
                    {
                        initialData?.giphys && initialData.giphys.length > 0 && initialData.giphys.map((each: any, index: number) => {
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

export async function getServerSideProps(context: any) {
    const apiKey = process.env.GIPHY_API_KEY
    const searchTerm = context.query.searchTerm;
    let giphys: any = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=6`);
    giphys = await giphys.json();
    return {props: {giphys: giphys.data}}
}
