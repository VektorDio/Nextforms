import React from 'react';
import styles from './activityButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOn} from "@fortawesome/free-solid-svg-icons";
const ActivityButton = () => {
    return (
        <div>
            <button className={styles.button}>
                <FontAwesomeIcon className={styles.icon} icon={faToggleOn} />
            </button>
        </div>
    );
};

export default ActivityButton;