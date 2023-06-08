import React from 'react';
import styles from './nameBlock.module.css'
import TextParagraph from "@/components/inputs/textParagraph";
const ConstructorNameBlock = ({handleNameChange, handleDescriptionChange, setSelectedBlockId, disabled}) => {
    return (
        <div className={styles.container} onClick={() => setSelectedBlockId("head")}>
            <div className={styles.formName}>
                <TextParagraph
                    disabled={disabled}
                    onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                    placeholder={"Поле імені звіту"}
                />
            </div>
            <div className={styles.formDescription}>
                <TextParagraph
                    disabled={disabled}
                    onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                    placeholder={"Опис нового звіту"}
                />
            </div>
        </div>
    );
};

export default ConstructorNameBlock;