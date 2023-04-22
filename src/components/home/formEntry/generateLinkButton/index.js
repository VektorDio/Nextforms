import React from 'react';
import styles from './generateLinkButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
const GenerateLinkButton = () => {
    return (
        <div>
            <button className={styles.button}>
                <FontAwesomeIcon className={styles.icon} icon={faLink} />
            </button>
        </div>
    );
};

export default GenerateLinkButton;