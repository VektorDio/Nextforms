import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>Error 404 | NextForms</title>
                <meta name="description" content="Error 404 page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <SimpleMessage>
                    404 - Page not found
                </SimpleMessage>
            </Main>
        </>
    );
};

export default Custom404;