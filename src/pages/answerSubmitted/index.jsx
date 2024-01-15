import React from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import Header from "@/components/pageWraper/header";

const AnswerSubmit = () => {
    return (
        <>
            <Head>
                <title>Answer Received | Report Generator</title>
                <meta name="description" content="Answer received page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main>
                <div>
                    Answer has been submitted
                </div>
            </Main>
        </>
    );
};

export default AnswerSubmit;