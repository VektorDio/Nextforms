import React from 'react';
import styles from './reportButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartColumn} from "@fortawesome/free-solid-svg-icons";
const ReportButton = ({onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <FontAwesomeIcon className={styles.icon} icon={faChartColumn} />
        </button>
    );
};

export default ReportButton;