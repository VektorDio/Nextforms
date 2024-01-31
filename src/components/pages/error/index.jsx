import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";

const Error = ({error}) => {
    return (
        <>
            <Head>
                <title>Error Page | NextForms</title>
                <meta name="description" content="Error page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <SimpleMessage>
                    An error occurred. <br/>
                    {error}
                </SimpleMessage>
            </Main>
        </>
    );
};

export default Error;