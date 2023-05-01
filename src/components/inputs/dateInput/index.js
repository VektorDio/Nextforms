import React from 'react';
import styles from './date.module.css'
const Date = ({disabled, defaultValue}) => {
    return (<input
                className={styles.dateField}
                type="date"
                defaultValue={defaultValue}
                disabled={disabled}
            />
    );
};

export default Date;