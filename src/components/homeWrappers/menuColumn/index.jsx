import React from 'react';
import styles from './menuColumn.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileCode,
    faFileLines,
    faUser,
    faWindowMaximize,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
import {useAddForm} from "@/queries/forms";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useAddReport} from "@/queries/reports";
import Link from "next/link";
const MenuColumn = ({centralColumn}) => {
    const {data:session} = useSession()
    const router = useRouter()

    const {mutateAsync: addForm} = useAddForm()
    const {mutateAsync: addReport} = useAddReport()

    async function handleFormCreation() {
        const {data} = await addForm({
            userId: session.user.id,
        })
        router.push(`/home/formConstructor/redact/${data.form.id}`)
    }

    async function handleReportCreation() {
        const {data} = await addReport({
            userId: session.user.id,
        })
        router.push(`/home/reportConstructor/redact/${data.report.id}`)
    }

    return (
        <div className={styles.menuColumn}>

            <Link href={`/home/profile/`}>
                <div className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "profile") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faUser} />
                    <div className={styles.iconTextContainer}>
                        Profile
                    </div>
                </div>
            </Link>

            <Link href={`/home/forms/`}>
                <div className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "form") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faWindowRestore} />
                    <div className={styles.iconTextContainer}>
                        Forms
                    </div>
                </div>
            </Link>

            <Link href={`/home/reports/`}>
                <div className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "report") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faWindowMaximize} />
                    <div className={styles.iconTextContainer}>
                        Reports
                    </div>
                </div>
            </Link>

            <div onClick={handleFormCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileCode} />
                    <div className={styles.iconTextContainer}>
                        New form
                    </div>
                </div>
            </div>

            <div onClick={handleReportCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileLines} />
                    <div className={styles.iconTextContainer}>
                        New report
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MenuColumn;