import React from 'react';
import styles from "./deleteAccountButton.module.css";

const SignInButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.deleteBtn} onClick={onClick}>
                Delete account
            </button>
        </div>
    );
};

export default SignInButton;