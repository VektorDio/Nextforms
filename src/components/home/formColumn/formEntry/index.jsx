import React from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import GenerateLinkButton from "@/components/buttons/generateLinkButton";
import RedactButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
import Link from "next/link";
const FormEntry = ({formEntry, onActivityToggle, onGenerateLink, onDelete}) => {
    return (
        <div className={styles.formEntry}>
            <div>{formEntry.formName}</div>
            <div className={styles.buttons}>
                <ActivityButton toggled={formEntry.active} onClick={() => onActivityToggle(formEntry.id)}/>
                <GenerateLinkButton onClick={() => onGenerateLink(formEntry.id)}/>
                <Link href={`/home/formConstructor/redact/${formEntry.id}`}>
                    <RedactButton/>
                </Link>
                <Link href={`/home/formConstructor/statistics/${formEntry.id}`}>
                    <ReportButton/>
                </Link>
                <DeleteButton onClick={() => onDelete(formEntry.id)}/>
            </div>
        </div>
    );
};

export default FormEntry;