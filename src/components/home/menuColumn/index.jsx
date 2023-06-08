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
const MenuColumn = ({setCentralColumnContent}) => {
    const {data:session} = useSession()
    const router = useRouter()

    const {mutateAsync: addForm} = useAddForm()
    const {mutateAsync: addReport} = useAddReport()
    async function handleFormCreation() {
        const {data} = await addForm({
            userId: session.user.id,
        })
        router.push(`/home/formConstructor/redact/${data.id}`)
    }

    async function handleReportCreation() {
        const {data} = await addReport({
            userId: session.user.id,
        })
        router.push(`/home/reportConstructor/create/${data.id}`)
    }

    return (
        <div className={styles.mainColumn}>
            <div className={styles.menuButton} onClick={() => setCentralColumnContent("profile")}>
                <FontAwesomeIcon className={styles.icons} icon={faUser} />
                Профіль
            </div>

            <div className={styles.menuButton} onClick={() => setCentralColumnContent("form")}>
                <FontAwesomeIcon className={styles.icons} icon={faWindowRestore} />
                Форми
            </div>

            <div className={styles.menuButton} onClick={() => setCentralColumnContent("report")}>
                <FontAwesomeIcon className={styles.icons} icon={faWindowMaximize} />
                Звіти
            </div>

            <div onClick={handleFormCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileCode} />
                    Нова форма
                </div>
            </div>

            <div onClick={handleReportCreation} >
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileLines} />
                    Новий звіт
                </div>
            </div>

        </div>
    );
};

export default MenuColumn;