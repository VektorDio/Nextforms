import React from 'react';
import styles from './confirmButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const AddButton = ({onClick, type}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick} type={type}>
                    <FontAwesomeIcon className={styles.icon} icon={faPlus}/>
            </button>
        </div>
    );
};

export default AddButton;