import React from 'react';
import styles from './reductButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
const ReductButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>
                <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} />
            </button>
        </div>
    );
};

export default ReductButton;