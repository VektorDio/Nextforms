import React from 'react';
import styles from './loading.module.css'

const LoadingMessage = () => {
    return (
        <div className={styles.container}>
            Завантажуємо...
        </div>
    );
};

export default LoadingMessage;