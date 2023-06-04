import React, {useState} from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import GenerateLinkButton from "@/components/buttons/generateLinkButton";
import RedactButton from "@/components/buttons/redactButton";
import ReportButton from "@/components/buttons/reportButton";
import DeleteButton from "@/components/buttons/deleteButton";
import Link from "next/link";
import FillButton from "@/components/buttons/fillButton";
const FormEntry = ({formEntry, onActivityToggle, onDelete}) => {
    const [isMessageCopied, setIsMessageCopied] = useState(false)

    function handleGenerateLink() {
        setIsMessageCopied(true)
        navigator.clipboard.writeText(`http://localhost:3000/view/${formEntry.id}`)
    }

    return (
        <div className={styles.formEntry} >
            <div className={styles.formName}>{formEntry.name}</div>
            <div className={styles.buttons}>
                <ActivityButton toggled={formEntry.active} onClick={() => onActivityToggle(formEntry.id, !formEntry.active)}/>
                <div className={styles.copyMessageContainer} onMouseLeave={() => setIsMessageCopied(false)}>
                    <div className={styles.copyMessage}
                         style={{opacity: (isMessageCopied) ? 100 : 0,
                             visibility: (isMessageCopied) ? "visible" : "hidden"}}
                    > Copied to clipboard </div>
                    <GenerateLinkButton onClick={handleGenerateLink} />
                </div>
                <Link href={`/home/formConstructor/redact/${formEntry.id}`}>
                    <RedactButton/>
                </Link>
                <Link href={`/home/formConstructor/statistics/${formEntry.id}`}>
                    <ReportButton/>
                </Link>
                <Link href={{ pathname: '/home/reportConstructor/fill', query: { reportId: null, formId: formEntry.id }}}>
                    <FillButton/>
                </Link>
                <DeleteButton onClick={() => onDelete(formEntry.id)}/>
            </div>
        </div>
    );
};

export default FormEntry;