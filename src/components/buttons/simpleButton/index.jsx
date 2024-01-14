import React from 'react';
import styles from './simpleButton.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faPlus,
    faCheck,
    faXmark,
    faWindowRestore,
    faLink,
    faArrowRight,
    faPrint,
    faPenToSquare,
    faChartColumn,
    faGear,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    plus: faPlus,
    check: faCheck,
    xmark: faXmark,
    window: faWindowRestore,
    link: faLink,
    arrowRight: faArrowRight,
    print: faPrint,
    redact: faPenToSquare,
    report: faChartColumn,
    settings: faGear,
}

const SimpleButton = ({onClick, type, iconType, bgColor}) => {
    return (
        <div>
            <button className={styles.button} onClick={onClick} type={type} style={{backgroundColor: bgColor}}>
                <FontAwesomeIcon className={styles.icon} icon={icons[iconType]}/>
            </button>
        </div>
    );
};

export default SimpleButton;