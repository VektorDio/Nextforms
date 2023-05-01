import React from 'react';
import styles from './blockInput.module.css'
const BlockInput = ({placeholder, onBlur}) => {
    return (
        <div className={styles.mainQuestion}
             contentEditable={true}
             placeholder={placeholder}
             onBlur={ onBlur}>
        </div>
    );
};

export default BlockInput;