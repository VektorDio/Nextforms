import React from 'react';
import {useSession} from "next-auth/react";
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import ColumnWrapper from "@/components/home/columnWraper";
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import ReportColumn from "@/components/home/reportColumn";

const ReportsColumn = () => {
    useSession({
        required: true,
    })

    return (
        <>
            <Head>
                <title>Reports | Report Generator</title>
                <meta name="description" content="Reports list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <ColumnWrapper>
                <MenuColumn centralColumn={"report"}/>
                <ReportColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default ReportsColumn;