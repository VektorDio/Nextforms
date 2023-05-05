import React from 'react';
import styles from "./select.module.css";

const Select = ({name, children, onChange, defaultValue, disabled}) => {
    return (
        <select
            name={name}
                className={styles.typeSelect}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}>
            {children}
        </select>
    );
};

export default Select;