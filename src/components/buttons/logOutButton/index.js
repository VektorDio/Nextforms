import React from 'react';
import styles from './logOutButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
const LogOutButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>
                <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
            </button>
        </div>
    );
};

export default LogOutButton;