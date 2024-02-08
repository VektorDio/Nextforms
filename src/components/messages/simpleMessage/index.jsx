import React from 'react';
import styles from './simpleMessage.module.css'

const SimpleMessage = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default SimpleMessage;