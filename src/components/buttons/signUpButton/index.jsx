import React from 'react';
import styles from "./signUpButton.module.css";

const SignUpButton = ({onClick}) => {
    return (
        <div>
            <button className={styles.signUpBtn} onClick={onClick}>
                Register
            </button>
        </div>
    );
};

export default SignUpButton;