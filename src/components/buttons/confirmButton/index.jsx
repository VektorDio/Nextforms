import React from 'react';
import styles from './confirmButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const ConfirmButton = ({onClick, type}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick} type={type}>
                    <FontAwesomeIcon className={styles.icon} icon={faCheck}/>
            </button>
        </div>
    );
};

export default ConfirmButton;