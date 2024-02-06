import React from 'react';
import Head from "next/head";

const MetaHead = ({title, description, children}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#272e3a"/>
            {children}
        </Head>
    )
}

export default MetaHead;