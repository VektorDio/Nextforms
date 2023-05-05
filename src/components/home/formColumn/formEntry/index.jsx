import React from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import GenerateLinkButton from "@/components/buttons/generateLinkButton";
import RedactButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
const FormEntry = () => {
    const formName = "Some form #1"

    return (
        <div  className={styles.formEntry}>
            <div>{formName}</div>
            <div className={styles.buttons}>
                <ActivityButton/>
                <GenerateLinkButton/>
                <RedactButton/>
                <ReportButton/>
                <DeleteButton/>
            </div>
        </div>
    );
};

export default FormEntry;