import React from 'react';
import styles from "./longText.module.css";

const TextParagraph = ({placeholder, onBlur, disabled}) => {
    return (
        <div className={styles.formName} onBlur={onBlur}
             placeholder={placeholder}
             contentEditable={!disabled}
        >
        </div>
    );
};

export default TextParagraph;