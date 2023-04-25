import React from 'react';
import styles from "./signInButton.module.css";

const SignInButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.signInBtn} onClick={onClick}>
                Sign In
            </button>
        </div>
    );
};

export default SignInButton;