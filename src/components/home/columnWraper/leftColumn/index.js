import React from 'react';
import styles from './left.module.css'
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFileCode,
    faFileLines,
    faUser,
    faWindowMaximize,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
const LeftColumn = ({setCentralColumnContent}) => {
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
            <Link href={"/formConstructor"}>
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileCode} />
                    Form constructor
                </div>
            </Link>
            <Link href={"/reportConstructor"}>
                <div className={styles.menuButton}>
                    <FontAwesomeIcon className={styles.icons} icon={faFileLines} />
                    Report constructor
                </div>
            </Link>

        </div>
    );
};

export default LeftColumn;