import React from 'react';
import styles from './date.module.css'
const Date = ({name, disabled, defaultValue, field, error, ...props}) => {
    return (
        <input
                className={styles.dateField}
                name={name}
                type="date"
                defaultValue={defaultValue}
                disabled={disabled}
                {...field}
                {...props}
        />
    )
}

export default Date;