import React, {useEffect, useState} from 'react';
import ReportEntry from "src/components/pages/reports/reportEntry";
import {useSession} from "next-auth/react";
import {useDeleteReportById, useGetReportsByCreatorId} from "@/queries/reports";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './reportsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";
import {useRouter} from "next/router";
import Paginator from "@/components/paginator";

const ReportColumn = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const userId = session?.user.id

    const pageParam = parseInt(router.query.page)
    const pageSize = 10

    const [reports, setReports] = useState()
    const [reportsCount, setReportsCount] = useState(0)
    const [page, setPage] = useState(pageParam !== null ? pageParam : 1)

    const {mutateAsync:deleteReport} = useDeleteReportById()
    const {error, data, isLoading} = useGetReportsByCreatorId({
        userId: userId,
        pageSize: pageSize,
        currentPage: page
    })

    const maxPages = Math.ceil(reportsCount /10)

    useEffect(() => {
        if(data) {
            setReports(data.reports)
            setReportsCount(data.count)
        }
    }, [data])

    function handlePageChange(value) {
        router.push(`/home/reports/${value}` )
        setPage(value)
    }

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
                    <ErrorMessage error={error.response.data.message}/>
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
            <Paginator currentPage={page} setCurrentPage={handlePageChange} maxPages={maxPages}/>
        </div>
    );
};

export default ReportColumn;