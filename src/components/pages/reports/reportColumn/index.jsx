import React, {useEffect, useState} from 'react';
import ReportEntry from "src/components/pages/reports/reportEntry";
import {useSession} from "next-auth/react";
import {useDeleteReportById, useGetReportsByCreatorId} from "@/queries/reports";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './reportsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";

const ReportColumn = () => {
    const {data:session} = useSession()
    const {mutateAsync:deleteReport} = useDeleteReportById()
    const [reports, setReports] = useState()

    const {id:userId} = session.user
    const {error, data, isLoading} = useGetReportsByCreatorId({
        userId: userId,
    })

    useEffect(() => {
        if(data) {
            setReports(data.reports)
        }
    }, [data])

    async function handleEntryDelete(id) {
        await deleteReport({
            reportId: id,
            userId: userId
        })
    }

    return (
        <div className={styles.container}>
            {
                (isLoading) ? (
                    <LoadingMessage/>
                ) : (error) ? (
                    <ErrorMessage error={error.message}/>
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