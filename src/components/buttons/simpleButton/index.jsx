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

const SimpleButton = ({onClick, type, iconType, bgColor, adaptive=false}) => {
    return (
        <button className={styles.button} onClick={onClick} type={type}
                style={{backgroundColor: bgColor, width: (adaptive) ? null : "40px", minWidth: (adaptive) ? null : "0"}}>
            <FontAwesomeIcon className={styles.icon} icon={icons[iconType]}/>
        </button>
    )
}

export default SimpleButton;