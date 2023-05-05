import React from 'react';
import styles from './time.module.css'
const TimeInput = ({disabled, defaultValue, field, error, ...props}) => {
    return (
            <input
                className={styles.timeField}
                type="time"
                defaultValue={defaultValue}
                disabled={disabled}
                {...field}
                {...props}
            />
    );
};

export default TimeInput;