import React, {useEffect, useState} from 'react';
import Main from "src/components/globalWrappers/main";
import {useRouter} from "next/router";
import {useGetAnswersByFormId} from "@/queries/forms";
import {useGetReportById} from "@/queries/reports";
import FillBlock from "src/components/pages/reportFill/fillBlock";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from "./reportFill.module.css";
import TextParagraph from "@/components/inputFields/textParagraph";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import FillHeader from "src/components/pages/reportFill/fillHeader";
import Header from "src/components/globalWrappers/header";
import isValidIdObject from "@/utils/isValidIdObject";
import MetaHead from "@/components/metaHead";

const ReportFill = ({ formList, reportList, userId, report, answers }) => {
    const router = useRouter()
    const {reportId:queryReportId, formId:queryFormId} = router.query //not updating

    const [reportId, setReportId] = useState(queryReportId)
    const [formId, setFormId] = useState(queryFormId)

    const [reportObject, setReportObject] = useState(() => {
        return report ? {...report} : null
    })

    const [answersObject, setAnswersObject] = useState(() => {
        return answers ? {...answers} : null
    })

    const {
        error: reportError,
        data: reportData,
        isInitialLoading: reportLoading,
    } = useGetReportById({
        reportId: reportId,
        userId: userId
    })

    const {
        error: answersError,
        data: answersData,
        isInitialLoading: answersLoading,
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

    function handlePrint() {
        window.print()
    }

    let content

    if (reportLoading || answersLoading) {
        content = (
            <LoadingMessage/>
        )
    } else if (reportError || answersError) {
        content = (
            <ErrorMessage error={reportError?.response.data.message || answersError?.response.data.message}/>
        )
    } else if (reportObject) {
        content = (
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
                        <FillBlock key={index} block={block} answers={answersObject} />
                    ))
                }
            </>
        )
    }

    return (
        <>
            <MetaHead title={"Report Fill | NextForms"} description={"Report fill page"}/>
            <Header movable={true} early={true}>
                <FillHeader formId={formId}
                            reportId={reportId}
                            formNamesData={formList}
                            reportNamesData={reportList}
                            onReportIdChange={handleReportIdChange}
                            onFormIdChange={handleFormIdChange}
                            handlePrint={handlePrint}
                />
            </Header>
            <Main>
                <ConstructorColumn>
                    { content }
                </ConstructorColumn>
            </Main>
        </>
    )
}

export default ReportFill;