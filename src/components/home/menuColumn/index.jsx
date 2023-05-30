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
const MenuColumn = ({setCentralColumnContent}) => {
    const {data:session} = useSession()
    const router = useRouter()

    const {mutateAsync} = useAddForm()
    async function handleFormCreation() {
        const {data} = await mutateAsync({
            userId: session.user.id,
        })
        router.push(`/home/formConstructor/redact/${data.id}`)
    }

    async function handleReportCreation() {
        // const {data} = await mutateAsync({
        //     userId: session.user.id,
        // })
        //router.push(`/home/reportConstructor/create/${data.id}`)
        router.push(`/home/reportConstructor/create/test`)
    }

    return (
        <div className={styles.mainColumn}>
            <div className={styles.menuButton} onClick={() => setCentralColumnContent("profile")}>
                <FontAwesomeIcon className={styles.icons} icon={faUser} />
                Profile
            </div>

            <div className={styles.menuButton} onClick={() => setCentralColumnContent("form")}>
                <FontAwesomeIcon className={styles.icons} icon={faWindowRestore} />
                Forms
            </div>

            <div className={styles.menuButton} onClick={() => setCentralColumnContent("report")}>
                <FontAwesomeIcon className={styles.icons} icon={faWindowMaximize} />
                Reports
            </div>

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