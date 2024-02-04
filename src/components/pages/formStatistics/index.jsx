import React from "react";
import Head from "next/head";
import ConstructorHeader from "@/components/pages/formRedact/constructorHeader";
import Main from "src/components/globalWrappers/main";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import styles from "./statistics.module.css";
import Header from "src/components/globalWrappers/header";
import dynamic from "next/dynamic";
import LoadingMessage from "@/components/messages/loadingMessage";
import SimpleButton from "@/components/buttons/simpleButton";
import Link from "next/link";

const FormStatistics = ({data, formId}) => {
    const answersCount = data.questions.reduce((acc, val) => (acc + val.answers.length), 0)
    return (
        <>
            <Head>
                <title>Statistics | NextForms</title>
                <meta name="description" content="Form statistics page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#272e3a"/>
            </Head>
            <Header movable={true}>
                <ConstructorHeader>
                    <Link href={`/home/formConstructor/redact/${formId}`} replace={true}>
                        <SimpleButton iconType={"redact"} bgColor={"#3a4556"} adaptive={true} ariaLabel={"Redact form"}/>
                    </Link>
                </ConstructorHeader>
            </Header>
            <Main>
                <ConstructorColumn>
                    <div className={styles.container}>
                        <div className={styles.answersCount}>
                            {answersCount} answers
                        </div>
                        <div className={styles.formDescription}>

                        </div>
                    </div>
                    {
                        data.questions.map((question, index) => (
                            <DynamicStatisticBlock
                                key={index}
                                question={question}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

const DynamicStatisticBlock = dynamic(() => import('src/components/pages/formStatistics/statisticBlock'), {
    loading: () => <LoadingMessage/>,
})

export default FormStatistics;