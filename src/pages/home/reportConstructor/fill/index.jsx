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
import Icon from "@/components/pageWraper/header/icon";
import SelectInput from "@/components/inputs/selectInput";
import SimpleButton from "@/components/buttons/simpleButton";
import Link from "next/link";
import TextParagraph from "@/components/inputs/textParagraph";
import ConstructorColumn from "@/components/formConstructorElements/constructorColumn";

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
                <title>Report Fill | Report Generator</title>
                <meta name="description" content="Report fill page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.header}>
                <div className={styles.iconBlock}>
                    <Icon/>
                    <div className={styles.siteName}>
                        ReportsGenerator.js
                    </div>
                </div>

                <div className={styles.centerBlock}>
                    <div className={styles.selectContainer}>
                        <SelectInput defaultValue={reportId} onChange={(e) => onReportIdChange(e.target.value)}>
                            {
                                (reportId === undefined) ? <option
                                    key={"placeholder"}
                                    value={"placeholder"}
                                    selected={true}
                                    disabled={true}
                                    hidden={true}
                                >
                                    Select report
                                </option> : null
                            }
                            {
                                reportNamesData?.reports.map((e, i) => (
                                    <option key={i} value={e.id} label={e.name}>{e.name}</option>
                                ))
                            }
                        </SelectInput>
                    </div>
                    <div className={styles.selectContainer}>
                        <SelectInput defaultValue={formId} onChange={(e) => {onFormIdChange(e.target.value)}}>
                            {
                                (formId === undefined) ? <option
                                    key={"placeholder"}
                                    value={"placeholder"}
                                    selected={true}
                                    disabled={true}
                                    hidden={true}
                                >
                                    Select form
                                </option> : null
                            }
                            {
                                formNamesData?.forms.map((e, i) => (
                                    <option key={i} value={e.id} label={e.name}>{e.name}</option>
                                ))
                            }
                        </SelectInput>
                    </div>
                </div>

                <div className={styles.sideBlock}>
                    <SimpleButton onClick={handlePrint} iconType={"print"} bgColor={"#399412"}/>
                    <Link href={"/home"}>
                        <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                    </Link>
                </div>
            </div>
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