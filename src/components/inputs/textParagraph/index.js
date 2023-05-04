import React from 'react';
import styles from "./longText.module.css";

const TextParagraph = ({placeholder, defaultValue, onBlur, disabled}) => {
    return (
        <div className={styles.formName} onBlur={onBlur}
             placeholder={placeholder}
             contentEditable={!disabled}
             suppressContentEditableWarning={true}
        >
            {defaultValue}
        </div>
    );
};

export default TextParagraph;