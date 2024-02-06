import React from 'react';
import styles from "./formContainer.module.css";
import Link from "next/link";

const FormContainer = ({children}) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.siteName}>
                <Link href="/" rel="dofollow">
                    <h1>NextForms</h1>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default FormContainer;