import React from 'react';
import styles from './nameBlock.module.css'
import TextParagraph from "@/components/inputs/textParagraph";
import ToggleButton from "@/components/buttons/toggleButton";
const ConstructorNameBlock = ({formName, formDescription, handleNameChange, handleDescriptionChange, handleAcceptChange}) => {
    return (
        <div className={styles.container}>
            <div className={styles.formName}>
                <TextParagraph
                    onChange={(e) => handleNameChange(e.currentTarget.textContent || "")}
                    placeholder={"New Form"}
                    defaultValue={formName}
                />
            </div>
            <div className={styles.formDescription}>
                <TextParagraph
                    onChange={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                    placeholder={"Description"}
                    defaultValue={formDescription}
                />
            </div>
            <div>
                <ToggleButton
                    text={"Accept answers"}
                    onClick={(e) => handleAcceptChange(e.currentTarget.textContent || "")}
                    checked={true}
                />
            </div>
        </div>
    );
};

export default ConstructorNameBlock;