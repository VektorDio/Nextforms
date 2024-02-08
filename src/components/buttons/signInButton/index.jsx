import React from 'react';
import styles from "./signInButton.module.css";

const SignInButton = ({onClick}) => {
    return (
        <button className={styles.signInBtn} onClick={onClick}>
            Log In
        </button>
    )
}

export default SignInButton;