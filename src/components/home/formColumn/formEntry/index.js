import React from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import GenerateLinkButton from "@/components/buttons/generateLinkButton";
import ReductButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
const FormEntry = () => {
    const formName = "Some form #1"

    return (
        <div  className={styles.formEntry}>
            <div className={styles.formName}>{formName}</div>
            <div className={styles.buttons}>
                <ActivityButton></ActivityButton>
                <GenerateLinkButton></GenerateLinkButton>
                <ReductButton></ReductButton>
                <ReportButton></ReportButton>
                <DeleteButton></DeleteButton>
            </div>
        </div>
    );
};

export default FormEntry;