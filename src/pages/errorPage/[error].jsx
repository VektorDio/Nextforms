import Head from "next/head";
import Header from "@/components/pageWraper/header";
import Main from "@/components/pageWraper/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";
import {useRouter} from "next/router";

const ErrorPage = () => {
    const router = useRouter()
    const {error} = router.query

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

export default ErrorPage;