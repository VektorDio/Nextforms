import React from 'react';
import styles from './activityButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";
const ActivityButton = ({toggled, onClick}) => {
    return (
        <div>
            {(toggled)?(
                <button className={styles.buttonOn} onClick={onClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faToggleOn} />
                </button>
            ):(
                <button className={styles.buttonOff} onClick={onClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faToggleOff} />
                </button>
            )}
        </div>
    );
};

export default ActivityButton;