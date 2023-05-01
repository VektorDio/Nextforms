import React from 'react';
import styles from './toggleButton.module.css'
const ToggleButton = ({onClick, text}) => {
    return (
        <div className={styles.toggleContainer}>
            <label className={styles.toggleSwitch}>
                <input type="checkbox" onClick={onClick} />
                <span className={styles.slider}></span>
            </label>
            <div className={styles.text}>{text}</div>
        </div>
    );
};

export default ToggleButton;