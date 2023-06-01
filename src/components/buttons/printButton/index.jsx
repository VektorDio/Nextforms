import React from 'react';
import styles from './confirmButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";
const PrintButton = ({onClick, type}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick} type={type}>
                    <FontAwesomeIcon className={styles.icon} icon={faPrint}/>
            </button>
        </div>
    );
};

export default PrintButton;