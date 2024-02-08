import React from 'react';
import styles from "./signUpButton.module.css";

const SignUpButton = ({onClick}) => {
    return (
        <button className={styles.signUpBtn} onClick={onClick}>
            Register
        </button>
    )
}

export default SignUpButton;