import React from 'react';
import styles from './nameBlock.module.css'
const ConstructorNameBlock = ({formName}) => {
    function handleNameChange(e){
        formName.formName = e.currentTarget.textContent
    }
    function handleDescriptionChange(e){
        formName.formDescription = e.currentTarget.textContent
    }

    return (
        <div className={styles.container}>
            <div className={styles.formName} contentEditable={true} onBlur={handleNameChange}>
                New Form
            </div>
            <div className={styles.formDescription} contentEditable={true} onBlur={handleDescriptionChange}>
                Description
            </div>
        </div>
    );
};

export default ConstructorNameBlock;