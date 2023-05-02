import React from 'react';
import styles from './nameBlock.module.css'
import LongText from "@/components/inputs/textParagraph";
import TextParagraph from "@/components/inputs/textParagraph";
const ConstructorNameBlock = ({formName}) => {

    function handleNameChange(e){
        formName.formName = e.currentTarget.textContent
    }
    function handleDescriptionChange(e){
        formName.formDescription = e.currentTarget.textContent
    }

    return (
        <div className={styles.container}>
            <div className={styles.formName}>
                <TextParagraph onBlur={handleNameChange} placeholder={"New Form"}/>
            </div>
            <div className={styles.formDescription}>
                <TextParagraph onBlur={handleDescriptionChange} placeholder={"Description"}/>
            </div>
        </div>
    );
};

export default ConstructorNameBlock;