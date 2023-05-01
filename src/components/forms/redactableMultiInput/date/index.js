import React from 'react';
import styles from './date.module.css'
const Date = () => {
    return (
        <>
            <input
                className={styles.dateField}
                type="date"
                defaultValue={"2000-01-01"}
                disabled={true}
            />
        </>
    );
};

export default Date;