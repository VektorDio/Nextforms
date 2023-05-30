import React from 'react';
import styles from './reportEntry.module.css'
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
import {useRouter} from "next/router";
import Link from "next/link";
const ReportEntry = ({reportEntry, onDelete}) => {
    const router = useRouter()
    function handleRedact() {
        router.push(`/home/reportConstructor/create/${reportEntry.id}`)
    }

    return (
        <div className={styles.reportEntry} >
            <div onClick={handleRedact} className={styles.reportName}>{reportEntry.name}</div>
            <div className={styles.buttons}>
                <Link href={`/home/reportConstructor/fill/${reportEntry.id}`}>
                    <ReportButton/>
                </Link>
                <DeleteButton onClick={() => onDelete(reportEntry.id)}/>
            </div>
        </div>
    );
};

export default ReportEntry;