import React from 'react';
import styles from "./deleteAccountButton.module.css";

const SignInButton = ({onClick}) => {
    return (
        <button className={styles.deleteBtn} onClick={onClick}>
            Delete account
        </button>
    )
}

export default SignInButton;