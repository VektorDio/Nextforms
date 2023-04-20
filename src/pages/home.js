import React from 'react';
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import Main from "@/components/pageWraper/main";
import ColumnWrapper from "@/components/home/columnWraper";
import LeftColumn from "@/components/home/leftColumn";
import CentralColumn from "@/components/home/centralColumn";
import RightColumn from "@/components/home/rightColumn";

const Home = () => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <Main>
            <ColumnWrapper>
                <LeftColumn></LeftColumn>
                <CentralColumn></CentralColumn>
                <RightColumn></RightColumn>
            </ColumnWrapper>
            </Main>
        </>
    );
};

export default Home;