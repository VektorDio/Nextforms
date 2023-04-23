import React from 'react';
import styles from './reportButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartColumn} from "@fortawesome/free-solid-svg-icons";
const ReportButton = () => {
    return (
        <div>
            <button className={styles.button}>
                <FontAwesomeIcon className={styles.icon} icon={faChartColumn} />
            </button>
        </div>
    );
};

export default ReportButton;