import React from 'react';
import styles from './nameBlock.module.css'
const ConstructorNameBlock = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formName} contentEditable={true}>
                New Form
            </div>
            <div className={styles.formDescription} contentEditable={true}>
                Description
            </div>
        </div>
    );
};

export default ConstructorNameBlock;