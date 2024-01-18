import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import {useRouter} from "next/router";
import {useGetAnswersByFormId, useGetFormNamesByCreatorId} from "@/queries/forms";
import {useSession} from "next-auth/react";
import {useGetReportById, useGetReportNamesByCreatorId} from "@/queries/reports";
import FillBlock from "@/components/fillElements/fillBlock";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from "./reportFill.module.css";
import TextParagraph from "@/components/inputs/textParagraph";
import ConstructorColumn from "src/components/constructorColumn";
import FillHeader from "@/components/fillElements/fillHeader";
import Header from "@/components/pageWraper/header";

const ReportConstructor = () => {
    const router = useRouter()
    const { data: session} = useSession()
    const userId = session?.user.id

    const {reportId:queryReportId, formId:queryFormId} = router.query

    const [reportId, setReportId] = useState()
    const [formId, setFormId] = useState()

    const [reportObject, setReportObject] = useState()
    const [answersObject, setAnswersObject] = useState()

    const {error: formNamesError, data: formNamesData, isLoading: formNamesLoading} = useGetFormNamesByCreatorId({
        id: userId,
    })

    const {error: reportNamesError, data: reportNamesData, isLoading: reportNamesLoading} = useGetReportNamesByCreatorId({
        id: userId,
    })

    const {error: reportError, data: reportData, isLoading: reportLoading} = useGetReportById({
        id: reportId,
    })

    const {error: answersError, data: answersData, isLoading: answersLoading} = useGetAnswersByFormId({
        id: formId,
    })

    useEffect(() => {
        if(reportData) {
            setReportObject({...reportData.report})
        }
    }, [reportData, reportId])

    useEffect(() => {
        if(answersData) {
            setAnswersObject([...answersData])
        }
    }, [answersLoading, answersData, formId])

    useEffect(() => {
        if (queryReportId) {
            setReportId(queryReportId)
        }
        if (queryFormId) {
            setFormId(queryFormId)
        }
    }, [queryReportId, queryFormId])

    function onFormIdChange(id) {
        (id !== "placeholder") && setFormId(id)
    }

    function onReportIdChange(id) {
        (id !== "placeholder") && setReportId(id)
    }

    function handlePrint() {
        window.print()
    }

    return (
        <>
            <Head>
                <title>Report Fill | NextForms</title>
                <meta name="description" content="Report fill page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header movable={true}>
                <FillHeader formId={formId}
                            reportId={reportId}
                            formNamesData={formNamesData}
                            reportNamesData={reportNamesData}
                            onReportIdChange={onReportIdChange}
                            onFormIdChange={onFormIdChange}
                            handlePrint={handlePrint}
                />
            </Header>
            <Main>
                <ConstructorColumn>
                    {
                        (formNamesLoading || reportNamesLoading || reportLoading || answersLoading) ? (
                            <LoadingMessage/>
                        ) : (formNamesError || reportNamesError || reportError || answersError) ? (
                            <ErrorMessage error={(formNamesError || reportNamesError || reportError || answersError)}/>
                        ) : (reportObject) && (
                            <>
                                <div className={styles.container} >
                                    <div className={styles.formName}>
                                        <TextParagraph
                                            placeholder={"New report"}
                                            defaultValue={reportObject?.name}
                                        />
                                    </div>
                                    <div className={styles.formDescription}>
                                        <TextParagraph
                                            placeholder={"Description"}
                                            defaultValue={reportObject?.description}
                                        />
                                    </div>
                                </div>
                                {
                                    reportObject?.blocks?.map((block , index) => (
                                        <FillBlock key={index} block={block} answers={answersObject || []}/>
                                    ))
                                }
                            </>
                        )
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default ReportConstructor;