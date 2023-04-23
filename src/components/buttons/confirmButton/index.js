import React from 'react';
import styles from './confirmButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
const ConfirmButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faCheck}/>
            </button>
        </div>
    );
};

export default ConfirmButton;