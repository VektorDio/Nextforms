import React from 'react';
import styles from './time.module.css'
const Time = () => {
    return (
        <>
            <input
                className={styles.timeField}
                type="time"
                defaultValue={"20:00"}
                disabled={true}
            />
        </>
    );
};

export default Time;