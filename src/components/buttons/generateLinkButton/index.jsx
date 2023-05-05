import React from 'react';
import styles from './generateLinkButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
const GenerateLinkButton = ({onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <FontAwesomeIcon className={styles.icon} icon={faLink} />
        </button>
    );
};

export default GenerateLinkButton;