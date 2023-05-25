import React, {useState} from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import GenerateLinkButton from "@/components/buttons/generateLinkButton";
import RedactButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
import Link from "next/link";
import {useRouter} from "next/router";
const FormEntry = ({formEntry, onActivityToggle, onDelete}) => {
    const router = useRouter()
    const [isMessageCopied, setIsMessageCopied] = useState(false)
    function handleRedact() {
        router.push(`/home/formConstructor/redact/${formEntry.id}`)
    }

    function handleGenerateLink() {
        setIsMessageCopied(true)
        navigator.clipboard.writeText(`/view/${formEntry.id}`)
    }

    return (
        <div className={styles.formEntry} >
            <div onClick={handleRedact} className={styles.formName}>{formEntry.name}</div>
            <div className={styles.buttons}>
                <ActivityButton toggled={formEntry.active} onClick={() => onActivityToggle(formEntry.id, !formEntry.active)}/>
                <div className={styles.copyMessageContainer} onMouseLeave={() => setIsMessageCopied(false)}>
                    <div className={styles.copyMessage}
                         style={{opacity: (isMessageCopied) ? 100 : 0,
                             visibility: (isMessageCopied) ? "visible" : "hidden"}}
                    > Copied to clipboard </div>
                    <GenerateLinkButton onClick={handleGenerateLink} />
                </div>

                <Link href={``}>
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