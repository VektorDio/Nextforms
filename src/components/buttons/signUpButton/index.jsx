import React from 'react';
import styles from "./signUpButton.module.css";

const SignUpButton = ({children ,onClick}) => {
    return (
        <div>
            <button className={styles.signUpBtn} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default SignUpButton;