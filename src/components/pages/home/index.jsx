import React from 'react';
import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import HomeColumn from "src/components/pages/home/homeColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";

const Home = () => {
    return (
        <>
            <Head>
                <title>Home | NextForms</title>
                <meta name="description" content="Home page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn/>
                <HomeColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default Home;