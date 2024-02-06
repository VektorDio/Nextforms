import React from "react";
import ConstructorHeader from "@/components/pages/formRedact/constructorHeader";
import Main from "src/components/globalWrappers/main";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import styles from "./statistics.module.css";
import Header from "src/components/globalWrappers/header";
import dynamic from "next/dynamic";
import LoadingMessage from "@/components/messages/loadingMessage";
import SimpleButton from "@/components/buttons/simpleButton";
import Link from "next/link";
import MetaHead from "@/components/metaHead";

const FormStatistics = ({data, formId}) => {
    const answersCount = data.questions.reduce((acc, val) => (acc + val.answers.length), 0)
    return (
        <>
            <MetaHead title={"Statistics | NextForms"} description={"Form statistics page"}/>
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