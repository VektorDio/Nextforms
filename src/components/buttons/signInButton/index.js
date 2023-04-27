import React from 'react';
import styles from "./signInButton.module.css";

const SignInButton = ({children ,onClick}) => {
    return (
        <div>
            <button className={styles.signInBtn} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default SignInButton;