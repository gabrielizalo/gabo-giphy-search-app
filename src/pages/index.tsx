import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import React, {useEffect, useState} from "react";

import Footer from "../components/common/footer/footer";

export default function Home(initialData: any) {
    type formInputsType = {
        searchTerm: string;
    };
    const formInputsBase: formInputsType = {
        searchTerm: ""
    }

    const [formInputs, setFormInputs] = useState(formInputsBase);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("cats");

    useEffect(() => {
        setSearchResults(initialData.catGiphys.data);
    }, [initialData])

    const handleInputs = (event: any) => {
        let {name, value} = event.target;
        setFormInputs({...formInputs, [name]: value});
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY
        let giphys: any =
            await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${apiKey}&limit=6`);
        giphys = await giphys.json();
        console.log("giphys: ", giphys);
        setSearchTerm(formInputs.searchTerm);
        setSearchResults(giphys.data);
    }

    return (
        <>
            <div className='container'>
                <Head>
                    <title>Gabo&apos;s Giphy Search App</title>
                    <meta name="description"
                          content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation."></meta>
                    <link rel="stylesheet" href="/styles.css"/>

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#2d89ef"/>
                    <meta name="theme-color" content="#ffffff"/>
                </Head>

                <h1>Gabo&apos;s Giphy Search App</h1>
                <div className="logo-container">
                    <Image src="/logo.gif" alt="Gabo&apos;s Giphy Search App" width={480} height={270}/>
                </div>

                <form onSubmit={handleSubmit}>
                    <input name="searchTerm" onChange={handleInputs} required type="text"/>
                    <button>Search</button>
                </form>

                <h2>Search results for: {searchTerm}</h2>
                <p>Share this search with others:
                    <Link href="/search/[pid]" as={`search/${searchTerm}`}>
                        {`http://localhost:3000/search/${searchTerm}`}
                    </Link>
                </p>

                <div className="giphy-search-results-grid">
                    {searchResults && searchResults.length > 0 && searchResults.map((each: any, index: number) => {
                        return (
                            <div key={index}>
                                <h3>{each.title}</h3>
                                <img src={each.images.original.url} alt={each.title}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    const apiKey = process.env.GIPHY_API_KEY
    let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${apiKey}&limit=6`);
    catGiphys = await catGiphys.json();
    return {
        props: {catGiphys: catGiphys}
    }
}
