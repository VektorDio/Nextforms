import React from 'react';
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import FormColumn from "src/components/pages/forms/formColumn";
import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";

const FormsList = () => {
    return (
        <>
            <Head>
                <title>Forms | NextForms</title>
                <meta name="description" content="Forms list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"form"}/>
                <FormColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default FormsList;