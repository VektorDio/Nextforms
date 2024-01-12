import React from 'react';
import styles from './fillNameBlock.module.css'
import TextParagraph from "@/components/inputs/textParagraph";
const FillNameBlock = ({formName, formDescription}) => {
    return (
        <div className={styles.container} >
            <div className={styles.formName}>
                <TextParagraph
                    placeholder={"New report"}
                    defaultValue={formName}
                />
            </div>
            <div className={styles.formDescription}>
                <TextParagraph
                    placeholder={"Description"}
                    defaultValue={formDescription}
                />
            </div>
        </div>
    );
};

export default FillNameBlock;