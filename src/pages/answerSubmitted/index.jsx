import React from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import Header from "@/components/pageWraper/header";
import SimpleMessage from "@/components/messages/simpleMessage";

const AnswerSubmit = () => {
    return (
        <>
            <Head>
                <title>Answer Submitted | NextForms</title>
                <meta name="description" content="Answer submitted page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <SimpleMessage>
                    Answer has been submitted
                </SimpleMessage>
            </Main>
        </>
    );
};

export default AnswerSubmit;