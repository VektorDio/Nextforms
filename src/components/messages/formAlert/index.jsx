import React from 'react';
import styles from './formAlert.module.css'

const FormAlert = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default FormAlert;