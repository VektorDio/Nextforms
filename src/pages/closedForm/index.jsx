import Head from "next/head";
import Header from "@/components/pageWraper/header";
import Main from "@/components/pageWraper/main";
import React from "react";

const ClosedForm = () => {
    return (
        <>
            <Head>
                <title>Closed Form | NextForms</title>
                <meta name="description" content="Answer received page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <div>
                    This form no longer accepts answers
                </div>
            </Main>
        </>
    );
};

export default ClosedForm;