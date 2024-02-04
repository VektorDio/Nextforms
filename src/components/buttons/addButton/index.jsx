import React from 'react';
import styles from './addButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const AddButton = ({onClick, type}) => {
    return (
        <button className={styles.button} onClick={onClick} type={type} aria-label={"Add block"}>
                <FontAwesomeIcon className={styles.icon} icon={faPlus} />
        </button>
    );
};

export default AddButton;