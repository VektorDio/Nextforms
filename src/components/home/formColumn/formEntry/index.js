import React from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/home/formColumn/formEntry/activityButton";
import GenerateLinkButton from "@/components/home/formColumn/formEntry/generateLinkButton";
import ReductButton from "@/components/home/formColumn/formEntry/reductButton";
import ReportButton from "@/components/home/formColumn/formEntry/reportButton";
import DeleteButton from "@/components/home/formColumn/formEntry/deleteButton";
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