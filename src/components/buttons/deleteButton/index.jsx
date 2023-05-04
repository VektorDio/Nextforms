import React from 'react';
import styles from './deleteButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
const DeleteButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>
                    <FontAwesomeIcon className={styles.icon} icon={faXmark}/>
            </button>
        </div>
    );
};

export default DeleteButton;