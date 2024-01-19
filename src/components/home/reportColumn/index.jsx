import React, {useEffect, useState} from 'react';
import ReportEntry from "@/components/home/reportColumn/reportEntry";
import {useSession} from "next-auth/react";
import {useDeleteReportById, useGetReportsByCreatorId} from "@/queries/reports";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './reportsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";
const ReportColumn = () => {
    const {status, data:session} = useSession({
        required: true,
    })
    const {mutateAsync:deleteReport, isLoading:isUpdating} = useDeleteReportById()
    const [reports, setReports] = useState()

    let userId = ""

    if (status !== 'loading'){
        const {id} = session.user
        userId = id
    }

    const {error, data, isLoading} = useGetReportsByCreatorId({
        id: userId,
    })

    useEffect(() => {
        if(data) {
            setReports(data.reports)
        }
    }, [data])

    async function handleEntryDelete(id) {
        await deleteReport({
            id: id,
        })
    }

    return (
        <div className={styles.container}>
            {
                (isLoading) ? (
                    <LoadingMessage/>
                ) : (error) ? (
                    <ErrorMessage error={error}/>
                ) : (reports?.length > 0) ? (
                    reports?.map((entry,index) =>
                        <ReportEntry
                            key={index}
                            reportEntry={entry}
                            onDelete={handleEntryDelete}
                        />
                    )
                ) : (
                    <SimpleMessage>
                        There no reports yet
                    </SimpleMessage>
                )
            }
        </div>
    );
};

export default ReportColumn;