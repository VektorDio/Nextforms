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
        router.push(`/home/reportConstructor/create/${data.report.id}`)
    }

    return (
        <div className={styles.mainColumn}>

            <Link href={`/home/profile/`}>
                <div
                    className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "profile") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faUser} />
                    Profile
                </div>
            </Link>

            <Link href={`/home/forms/`}>
                <div
                    className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "form") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faWindowRestore} />
                    Forms
                </div>
            </Link>

            <Link href={`/home/reports/`}>
                <div
                    className={styles.menuButton}
                    style={{backgroundColor: (centralColumn === "report") ? "#365688" : null}}
                >
                    <FontAwesomeIcon className={styles.icons} icon={faWindowMaximize} />
                    Reports
                </div>
            </Link>

            <div onClick={handleFormCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileCode} />
                    New form
                </div>
            </div>

            <div onClick={handleReportCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileLines} />
                    New report
                </div>
            </div>

        </div>
    );
};

export default MenuColumn;