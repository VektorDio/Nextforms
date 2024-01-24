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

    try {
        formListData = (await axios.get('http://localhost:3000/api/form/formNamesByCreatorId', {
            params: {
                userId: userId,
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

    try {
        reportListData = (await axios.get('http://localhost:3000/api/report/reportNamesByCreatorId', {
            params: {
                userId: userId,
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

    return { props: { formListData, reportListData, userId } }
}

const ReportFillPage = ({ formListData, reportListData, userId }) => {
    const router = useRouter()
    useSession({
        required:true
    })

    const {reportId:queryReportId, formId:queryFormId} = router.query

    const [reportId, setReportId] = useState(queryReportId)
    const [formId, setFormId] = useState(queryFormId)
    const [reportObject, setReportObject] = useState({})
    const [answersObject, setAnswersObject] = useState([])

    const {error: reportError, data: reportData, isLoading: reportLoading} = useGetReportById({
        formId: reportId,
        userId: userId
    })

    const {error: answersError, data: answersData, isLoading: answersLoading} = useGetAnswersByFormId({
        formId: formId,
        userId: userId
    })

    useEffect(() => {
        if(reportData) {
            setReportObject({...reportData.report})
        }
    }, [reportData, reportId])

    useEffect(() => {
        if(answersData) {
            setAnswersObject([...answersData.questions])
        }
    }, [answersData, formId])

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
                            onReportIdChange={setReportId}
                            onFormIdChange={setFormId}
                            handlePrint={handlePrint}
                />
            </Header>
            <Main>
                <ConstructorColumn>
                    {
                        (reportLoading || answersLoading) ? (
                            <LoadingMessage/>
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