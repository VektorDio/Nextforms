import React from 'react';
import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ReportColumn from "src/components/pages/reports/reportColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";

const ReportsList = () => {
    return (
        <>
            <Head>
                <title>Reports | NextForms</title>
                <meta name="description" content="Reports list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"report"}/>
                <ReportColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default ReportsList;