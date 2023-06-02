import React from 'react';
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import ColumnWrapper from "@/components/home/columnWraper";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const Home = () => {
    const router = useRouter()
    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    return (
        <>
            <Head>
                <title>Home | Report Generator</title>
                <meta name="description" content="Home page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <ColumnWrapper/>
        </>
    );
};

export default Home;