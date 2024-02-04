import React, {useState} from 'react';
import styles from './formEntry.module.css'
import ActivityButton from "@/components/buttons/activityButton";
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";

const FormEntry = ({formEntry, onActivityToggle, onDelete}) => {
    const [isMessageCopied, setIsMessageCopied] = useState(false)

    function handleGenerateLink() {
        setIsMessageCopied(true)
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL +`/view/${formEntry.id}`)
    }

    return (
        <div className={styles.formEntry} >
            <div className={styles.formName}>{formEntry.name}</div>
            <div className={styles.buttons}>
                <ActivityButton
                    toggled={formEntry.active}
                    onClick={() => onActivityToggle(formEntry.id, !formEntry.active)}
                />

                <div className={styles.copyMessageContainer} onMouseLeave={() => setIsMessageCopied(false)}>
                    <div className={styles.copyMessage}
                         style={{opacity: (isMessageCopied) ? 100 : 0,
                             visibility: (isMessageCopied) ? "visible" : "hidden"}}
                    > Copied to clipboard </div>
                    <SimpleButton
                        onClick={handleGenerateLink}
                        iconType={"link"}
                        bgColor={"#3a4556"}
                        ariaLabel={"Generate form link"}
                    />
                </div>

                <Link href={`/home/formConstructor/redact/${formEntry.id}`}>
                    <SimpleButton iconType={"redact"} bgColor={"#3a4556"} ariaLabel={"Redact form"}/>
                </Link>
                <Link href={`/home/formConstructor/statistics/${formEntry.id}`}>
                    <SimpleButton iconType={"report"} bgColor={"#3a4556"} ariaLabel={"Form statistics"}/>
                </Link>
                <Link href={{ pathname: '/home/reportConstructor/fill', query: { reportId: null, formId: formEntry.id }}}>
                    <SimpleButton iconType={"window"} bgColor={"#3a4556"} ariaLabel={"Fill report with this form"}/>
                </Link>

                <SimpleButton
                    onClick={() => onDelete(formEntry.id)}
                    iconType={"xmark"} bgColor={"#d00c0c"}
                    ariaLabel={"Delete form"}
                />
            </div>
        </div>
    );
};

export default FormEntry;