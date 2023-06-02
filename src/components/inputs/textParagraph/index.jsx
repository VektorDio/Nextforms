import React from 'react';
import styles from "./longText.module.css";

const TextParagraph = ({placeholder, defaultValue, onBlur, disabled, error}) => {
    return (
        <div className={(error) ? styles.containerError : styles.containerOutline}>
            <div className={styles.container} onBlur={onBlur}
                 placeholder={placeholder}
                 contentEditable={!disabled}
                 suppressContentEditableWarning={true}
            >
                {defaultValue}
            </div>
        </div>
    );
};

export default TextParagraph;