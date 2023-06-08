import React from 'react';
import styles from './fillNameBlock.module.css'
import TextParagraph from "@/components/inputs/textParagraph";
const FillNameBlock = ({formName, formDescription}) => {
    return (
        <div className={styles.container} >
            <div className={styles.formName}>
                <TextParagraph
                    placeholder={"Новий звіт"}
                    defaultValue={formName}
                />
            </div>
            <div className={styles.formDescription}>
                <TextParagraph
                    placeholder={"Опис звіту"}
                    defaultValue={formDescription}
                />
            </div>
        </div>
    );
};

export default FillNameBlock;