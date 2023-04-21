import React from 'react';
import styles from './formEntry.module.css'
const FormEntry = () => {
    const formName = "Some form #1"

    return (
        <div  className={styles.formEntry}>
            <div className={styles.formName}>{formName}</div>

        </div>
    );
};

export default FormEntry;