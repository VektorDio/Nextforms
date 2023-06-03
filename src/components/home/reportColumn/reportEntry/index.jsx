import React from 'react';
import styles from './reportEntry.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import Link from "next/link";
import FillButton from "@/components/buttons/fillButton";
import RedactButton from "@/components/buttons/redactButton";
const ReportEntry = ({reportEntry, onDelete}) => {

    return (
        <div className={styles.reportEntry} >
            <div className={styles.reportName}>{reportEntry.name}</div>
            <div className={styles.buttons}>
                <Link href={`/home/reportConstructor/create/${reportEntry.id}`}>
                    <RedactButton/>
                </Link>
                <Link href={{ pathname: '/home/reportConstructor/fill', query: { reportId: reportEntry.id, formId: null } }}>
                    <FillButton/>
                </Link>
                <DeleteButton onClick={() => onDelete(reportEntry.id)}/>
            </div>
        </div>
    );
};

export default ReportEntry;