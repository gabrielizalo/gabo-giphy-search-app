import Head from 'next/head'

import Footer from "../components/common/footer/footer";
import React from "react";

export default function About() {
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
                <h1>About</h1>

                <p>Love giphys? So do we. use our app <b>giphy search</b> to find the perfect giphy for any occasion.
                </p>

                <h2>Why do people love giphys?</h2>

                <p>Some people may work better with words, others with numbers, but everyone gets pictures. 90% of
                    information transmitted to the human brain is visual.</p>

                <p>The old saying &quot;a picture is worth a thousand words&quot; is quite cliche. But that doesn&apos;t
                    make it any less true, especially in marketing and particularly in the instant-gratification, short
                    attention span world we live in today. Getting folks to retain (or even register) your messages and
                    content or take action is harder than ever, especially if all you are giving them is words.</p>

                <p>Images are stronger than words. However, the fast-moving nature of GIFs make them stronger than
                    images and their shorter length make them more digestible than video. That&apos;s the short
                    answer.</p>
            </div>
            <Footer/>
        </>
    )
}
