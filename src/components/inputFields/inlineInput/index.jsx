import React from 'react';
import styles from "./inlineText.module.css";

const InlineInput = ({error, field, ...props}) => {
    return (
        <input
            className={(error) ? (styles.inputInvalid) : (styles.oneLineText)}
            {...field}
            {...props}
        />
    );
};

export default InlineInput;