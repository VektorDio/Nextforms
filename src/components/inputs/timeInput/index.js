import React from 'react';
import styles from './time.module.css'
const TimeInput = ({disabled, defaultValue}) => {
    return (
            <input
                className={styles.timeField}
                type="time"
                defaultValue={defaultValue}
                disabled={disabled}
            />
    );
};

export default TimeInput;