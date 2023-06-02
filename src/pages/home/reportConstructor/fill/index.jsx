import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import {useRouter} from "next/router";
import {useGetAnswersByFormId, useGetFormNamesByCreatorId} from "@/queries/forms";
import FillHeader from "@/components/fillElements/fillHeader";
import {useSession} from "next-auth/react";
import {useGetReportById, useGetReportNamesByCreatorId} from "@/queries/reports";
import FillColumn from "@/components/fillElements/fillColumn";
import FillNameBlock from "@/components/fillElements/fillNameBlock";
import FillBlock from "@/components/fillElements/fillBlock";
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

    if (formNamesLoading || reportNamesLoading || reportLoading || answersLoading) return (
        <Main>Loading...</Main>
    )
    if (formNamesError || reportNamesError || reportError || answersError) return (<div>error</div>)

    function onFormIdChange(id) {
        setFormId(id)
    }

    function onReportIdChange(id) {
        setReportId(id)
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
            <FillHeader
                reportEntries={reportNamesData.reports}
                formEntries={formNamesData.forms}
                onFormChange={onFormIdChange}
                onReportChange={onReportIdChange}
                onPrint={handlePrint}
                formId={formId}
                reportId={reportId}
            />
            <Main>
                {
                    (reportObject) ? (
                    <FillColumn>
                        <FillNameBlock
                            formName={reportObject?.name}
                            formDescription={reportObject?.description}
                        />
                        {
                            reportObject?.blocks?.map((block , index) => (
                                <FillBlock key={index} block={block} answers={answersObject || []}/>
                            ))
                        }
                    </FillColumn>
                ) : null
                }
            </Main>
        </>
    );
};

export default ReportConstructor;