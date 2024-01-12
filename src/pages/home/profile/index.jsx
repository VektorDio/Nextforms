import React from 'react';
import {useSession} from "next-auth/react";
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import ColumnWrapper from "@/components/home/columnWraper";
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import Profile from "@/components/home/profileColumn";

const ProfileColumn = () => {
    const { status } = useSession({
        required: true,
    })

    if(status === "loading"){
        return (
            <>
                <div>Loading...</div>
            </>
        );
    }
    return (
        <>
            <Head>
                <title>Profile | Report Generator</title>
                <meta name="description" content="Profile page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <ColumnWrapper>
                <MenuColumn centralColumn={"profile"}/>
                <Profile/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default ProfileColumn;