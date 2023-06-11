import React from 'react';
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import ColumnWrapper from "@/components/home/columnWraper";
import FormColumn from "@/components/home/formColumn";
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import {useSession} from "next-auth/react";

const FormsHomePage = () => {
    useSession({
        required: true,
    })

    return (
        <>
            <Head>
                <title>Forms | Report Generator</title>
                <meta name="description" content="Forms list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <ColumnWrapper>
                <MenuColumn centralColumn={"form"}/>
                <FormColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default FormsHomePage;