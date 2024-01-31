import React from 'react';
import styles from './reportEntry.module.css'
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";
const ReportEntry = ({reportEntry, onDelete}) => {

    return (
        <div className={styles.reportEntry} >
            <div className={styles.reportName}>{reportEntry.name}</div>
            <div className={styles.buttons}>
                <Link href={`/home/reportConstructor/redact/${reportEntry.id}`}>
                    <SimpleButton iconType={"redact"} bgColor={"#3a4556"}/>
                </Link>
                <Link href={{pathname: '/home/reportConstructor/fill', query: {reportId: reportEntry.id, formId: null}}}>
                    <SimpleButton iconType={"window"} bgColor={"#3a4556"}/>
                </Link>
                <SimpleButton onClick={() => onDelete(reportEntry.id)} iconType={"xmark"} bgColor={"#d00c0c"}/>
            </div>
        </div>
    );
};

export default ReportEntry;