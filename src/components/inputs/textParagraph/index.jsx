import React from 'react';
import styles from "./longText.module.css";

const TextParagraph = ({name, placeholder, defaultValue, onBlur, disabled}) => {
    return (
        <div className={styles.formName} onBlur={onBlur}
             placeholder={placeholder}
             contentEditable={!disabled}
             name={name}
             suppressContentEditableWarning={true}
        >
            {defaultValue}
        </div>
    );
};

export default TextParagraph;