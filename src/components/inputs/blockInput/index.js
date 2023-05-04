import React from 'react';
import styles from './blockInput.module.css'
const BlockInput = ({placeholder, onBlur, defaultValue}) => {
    return (
        <div className={styles.mainQuestion}
             contentEditable={true}
             placeholder={placeholder}
             onBlur={onBlur}
             suppressContentEditableWarning={true}
        >
            {defaultValue}
        </div>
    );
};

export default BlockInput;