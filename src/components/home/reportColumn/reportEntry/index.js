import React from 'react';
import styles from './reportEntry.module.css'
import ReductButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
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