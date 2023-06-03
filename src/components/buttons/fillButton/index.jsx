import React from 'react';
import styles from './fillButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowRestore} from "@fortawesome/free-solid-svg-icons";
const FillButton = ({onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <FontAwesomeIcon className={styles.icon} icon={faWindowRestore} />
        </button>
    );
};

export default FillButton;