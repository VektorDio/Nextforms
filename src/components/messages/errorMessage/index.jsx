import React from 'react';
import styles from './error.module.css'
const ErrorMessage = ({error}) => {
    return (
        <div className={styles.container}>
            {error}
        </div>
    )
}

export default ErrorMessage;