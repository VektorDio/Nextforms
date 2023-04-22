import React from 'react';
import styles from './reportEntry.module.css'
import ReductButton from "@/components/home/formColumn/formEntry/reductButton";
import ReportButton from "@/components/home/formColumn/formEntry/reportButton";
import DeleteButton from "@/components/home/formColumn/formEntry/deleteButton";
const ReportEntry = () => {
    const reportName = "Some report #1"

    return (
        <div  className={styles.reportEntry}>
            <div className={styles.reportName}>{reportName}</div>
            <div className={styles.buttons}>
                <ReductButton></ReductButton>
                <ReportButton></ReportButton>
                <DeleteButton></DeleteButton>
            </div>
        </div>
    );
};

export default ReportEntry;