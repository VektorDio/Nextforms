import React from 'react';
import styles from './activityButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";

const ActivityButton = ({toggled, onClick}) => {
    if (toggled) {
        return (
            <button className={styles.buttonOn} onClick={onClick} aria-label={"Toggle activity off"}>
                <FontAwesomeIcon className={styles.icon} icon={faToggleOn} />
            </button>
        )
    } else return (
        <button className={styles.buttonOff} onClick={onClick} aria-label={"Toggle activity on"}>
            <FontAwesomeIcon className={styles.icon} icon={faToggleOff} />
        </button>
    )
}

export default ActivityButton;