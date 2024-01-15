import React from 'react';
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import ColumnWrapper from "@/components/home/columnWraper";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import HomeColumn from "@/components/home/homeColumn";

const Home = () => {
    const router = useRouter()
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    return (
        <>
            <Head>
                <title>Home | NextForms</title>
                <meta name="description" content="Home page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            {
                (status !== "loading") && (
                    <ColumnWrapper>
                        <MenuColumn/>
                        <HomeColumn/>
                        <InfoColumn/>
                    </ColumnWrapper>
                )
            }
        </>
    );
};

export default Home;