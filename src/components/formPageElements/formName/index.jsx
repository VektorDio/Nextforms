import React from 'react';
import styles from "./formName.module.css";

const FormName = ({children}) => {
    return <span className={styles.formNameText}>{children}</span>
}

export default FormName;