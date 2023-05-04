import React from 'react';
import styles from './settingsButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
const SettingsButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>
                <FontAwesomeIcon className={styles.icon} icon={faGear} />
            </button>
        </div>
    );
};

export default SettingsButton;