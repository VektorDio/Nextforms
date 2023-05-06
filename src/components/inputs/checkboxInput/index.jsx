import React from 'react';
import styles from "./checkbox.module.css";

const CheckboxInput = ({name, disabled, onChange, text, value}) => {
    return (
        <label className={styles.checkboxContainer}>
            <div className={(disabled) ? styles.textDisabled : styles.text}>{text}</div>
            <input type="checkbox" name={name} onChange={onChange} disabled={disabled} value={value}/>
            <span className={(disabled) ? styles.checkmarkDisabled : styles.checkmark} ></span>
        </label>
    );
};

export default CheckboxInput;