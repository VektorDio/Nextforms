import React from 'react';
import styles from './radio.module.css'
const RadioInput = ({name, disabled, onChange, text, value}) => {
    return (
        <label className={styles.radioContainer}>
            <div className={(disabled) ? styles.textDisabled : styles.text}>{text}</div>
            <input type="radio" name={name} onChange={onChange} disabled={disabled} value={value}/>
            <span className={(disabled) ? styles.checkmarkDisabled : styles.checkmark}></span>
        </label>
    );
};

export default RadioInput;