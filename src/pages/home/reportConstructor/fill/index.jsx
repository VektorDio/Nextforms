import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import {useRouter} from "next/router";
import {useGetAnswersByFormId} from "@/queries/forms";
import {useSession} from "next-auth/react";
import {useGetReportById} from "@/queries/reports";
import FillBlock from "@/components/fillElements/fillBlock";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from "./reportFill.module.css";
import TextParagraph from "@/components/inputs/textParagraph";
import ConstructorColumn from "src/components/constructorColumn";
import FillHeader from "@/components/fillElements/fillHeader";
import Header from "@/components/pageWraper/header";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import isValidIdObject from "@/utils/utils";
import SimpleMessage from "@/components/messages/simpleMessage";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/You must be logged in.`
            }
        }
    }

    const {formId, reportId} = context.query
    const userId = session.user.id
    let formListData, reportListData
    let answers = null
    let report = null

    try {
        if (isValidIdObject(formId)) {
            answers = (await axios.get('http://localhost:3000/api/form/answers', {
                params: {
                    formId: formId,
                    userId: userId
                },
                headers: {
                    Cookie: context.req.headers.cookie
                }
            })).data
        }

        if (isValidIdObject(reportId)){
            report = (await axios.get('http://localhost:3000/api/report', {
                params: {
                    reportId: reportId,
                    userId: userId
                },
                headers: {
                    Cookie: context.req.headers.cookie
                }
            })).data
        }

        formListData = (await axios.get('http://localhost:3000/api/form/formByCreatorId', {
            params: {
                userId: userId,
                withNames: true
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data

        reportListData = (await axios.get('http://localhost:3000/api/report/reportsByCreatorId', {
            params: {
                userId: userId,
                withNames: true
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data

    } catch (e){
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/${e}`
            }
        }
    }

    if (report === null && answers === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    return { props: { formListData, reportListData, userId, report, answers } }
}

const ReportFillPage = ({ formListData, reportListData, userId, report, answers }) => {
    const router = useRouter()
    useSession({
        required:true
    })

    const {reportId:queryReportId, formId:queryFormId} = router.query

    const [reportId, setReportId] = useState(queryReportId)
    const [formId, setFormId] = useState(queryFormId)

    const [reportObject, setReportObject] = useState(() => {
        return report ? {...report.report} : null
    })
    const [answersObject, setAnswersObject] = useState(() => {
        return answers ? [...answers.questions] : null
    })

    const {
        error: reportError,
        data: reportData,
        isInitialLoading: reportLoading,
        refetch: refetchReport,
        isFetching: reportFetching
    } = useGetReportById({
        reportId: reportId,
        userId: userId
    })

    const {
        error: answersError,
        data: answersData,
        isInitialLoading: answersLoading,
        refetch: refetchAnswers,
        isFetching: answersFetching
    } = useGetAnswersByFormId({
        formId: formId,
        userId: userId
    })

    useEffect(() => {
        if (reportData) {
            setReportObject({...reportData.report})
        }
    }, [reportData])

    useEffect(() => {
        if (answersData) {
            setAnswersObject([...answersData.questions])
        }
    }, [answersData])

    useEffect(() => {
        if (isValidIdObject(formId)) {
            refetchAnswers()
        }
    }, [formId])

    useEffect(() => {
        if (isValidIdObject(reportId)) {
            refetchReport()
        }
    }, [reportId])

    function handleFormIdChange(formId) {
        if (isValidIdObject(formId)) {
            setFormId(formId)
        }
    }

    function handleReportIdChange(reportId) {
        if (isValidIdObject(reportId)) {
            setReportId(reportId)
        }
    }

    useEffect(() => {
        const beforeunloadHandler = (e) => {
            e.preventDefault()
            e.returnValue = true
        }

        window.addEventListener("beforeunload", beforeunloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler)
        }
    }, [reportObject])

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
                            formNamesData={formListData}
                            reportNamesData={reportListData}
                            onReportIdChange={handleReportIdChange}
                            onFormIdChange={handleFormIdChange}
                            handlePrint={handlePrint}
                />
            </Header>
            <Main>
                <ConstructorColumn>
                    {
                        (reportLoading || answersLoading) ? (
                            <LoadingMessage/>
                        ) : (reportFetching || answersFetching) ? (
                            <SimpleMessage>Fetching data...</SimpleMessage>
                        ) : (reportError || answersError) ? (
                            <ErrorMessage error={(reportError?.message || answersError?.message)}/>
                        ) : (reportObject) && (
                            <>
                                <div className={styles.container} >
                                    <div className={styles.formName}>
                                        <TextParagraph
                                            placeholder={"New report"}
                                            defaultValue={reportObject.name}
                                        />
                                    </div>
                                    <div className={styles.formDescription}>
                                        <TextParagraph
                                            placeholder={"Description"}
                                            defaultValue={reportObject.description}
                                        />
                                    </div>
                                </div>
                                {
                                    reportObject.blocks?.map((block , index) => (
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

export default ReportFillPage;