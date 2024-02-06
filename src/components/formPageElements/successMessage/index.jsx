import React from 'react';
import styles from "./successMessage.module.css";

const SuccessMessage = ({children}) => {
    return (
        <div className={styles.success}>
            {children}
        </div>
    )
}

export default SuccessMessage;