import React, {useEffect, useState} from 'react';
import ReportEntry from "@/components/home/reportColumn/reportEntry";
import {useSession} from "next-auth/react";
import {useDeleteReportById, useGetReportsByCreatorId} from "@/queries/reports";

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

    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error</div>)

    if (reports) return (
        <div>
            {
                reports?.map((entry,index) =>
                    <ReportEntry
                        key={index}
                        reportEntry={entry}
                        onDelete={handleEntryDelete}
                    />
                )
            }
        </div>
    );
};

export default ReportColumn;