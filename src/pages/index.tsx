import Head from 'next/head'
import {useEffect, useState} from "react";

export default function Home(initialData: any) {
    const [formInputs, setFormInputs] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("cats");

    useEffect(() => {
        setSearchResults(initialData.catGiphys.data);
    }, [initialData])

    const handleInputs  = (event: any) => {
        let {name, value} = event.target;
        setFormInputs({...formInputs, [name]: value});
    }

    // const handleSubmit  = (event: any) => {
    //     event.preventDefault();
    //     console.log(formInputs.searchTerm);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY
        let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${apiKey}&limit=6`);
        giphys = await giphys.json();
        console.log("giphys: ", giphys);
        setSearchTerm(formInputs.searchTerm);
        setSearchResults(giphys.data);
    }

    return (
        <div className='container'>
            <Head>
                <title>Gabo&apos;s Giphy Search App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="/styles.css"/>
            </Head>

            <h1>Gabo&apos;s Giphy Search App</h1>

            <form onSubmit={handleSubmit}>
                <input name="searchTerm" onChange={handleInputs} required type="text" />
                <button>Search</button>
            </form>

            <h2>Search results for: {searchTerm}</h2>
            <div className="giphy-search-results-grid">
                {searchResults && searchResults.length > 0 && searchResults.map((each, index) => {
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
    let catGiphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${apiKey}&limit=6`);
    catGiphys = await catGiphys.json();
    return {
        props: {catGiphys: catGiphys}
    }
}
