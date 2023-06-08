import React from 'react';
import styles from './nameBlock.module.css'
import TextParagraph from "@/components/inputs/textParagraph";
import ToggleButton from "@/components/buttons/toggleButton";
const ConstructorNameBlock = ({formName, formDescription, handleNameChange,
                                  handleDescriptionChange, handleAcceptChange, setSelectedBlockId, acceptAnswers}) => {
    return (
        <div className={styles.container} onClick={() => setSelectedBlockId("head")}>
            <div className={styles.formName}>
                <TextParagraph
                    onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                    placeholder={"Нова форма"}
                    defaultValue={formName}
                />
            </div>
            <div className={styles.formDescription}>
                <TextParagraph
                    onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                    placeholder={"Опис"}
                    defaultValue={formDescription}
                />
            </div>
            <div>
                <ToggleButton
                    text={"Приймати відповіді"}
                    onClick={(e) => handleAcceptChange(e.target.checked)}
                    checked={acceptAnswers}
                />
            </div>
        </div>
    );
};

export default ConstructorNameBlock;