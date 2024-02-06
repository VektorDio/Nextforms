import React from 'react';
import styles from "./formBody.module.css";

const FormBody = ({children}) => {
    return (
        <div className={styles.formBody}>
            {children}
        </div>
    )
}

export default FormBody;