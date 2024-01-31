import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";

const ClosedForm = () => {
    return (
        <>
            <Head>
                <title>Closed Form | NextForms</title>
                <meta name="description" content="Closed form message" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <SimpleMessage>
                    This form no longer accepts answers
                </SimpleMessage>
            </Main>
        </>
    );
};

export default ClosedForm;