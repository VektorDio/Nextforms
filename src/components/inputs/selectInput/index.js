import React from 'react';
import styles from "./select.module.css";

const Select = ({children, onChange, defaultValue, disabled}) => {
    return (
        <select className={styles.typeSelect} defaultValue={defaultValue} onChange={onChange} disabled={disabled}>
            {children}
        </select>
    );
};

export default Select;