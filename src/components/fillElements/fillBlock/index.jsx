import React from 'react';
import styles from './fillBlock.module.css'
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
import StatisticsInput from "@/components/inputs/statisticsInput";

const FillBlock = ({block, answers}) => {
    let component
    switch (block.type){
        case "oneLineText":
            component = (
                <div className={styles.oneLineText}>
                    <InlineInput
                        name={block.id}
                        placeholder={"Text"}
                    />
                </div>
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText}>
                    <TextParagraph
                        name={block.id}
                        placeholder={"Text"}
                    />
                </div>
            )
            break;
        case "statistics":
            component = (
                <StatisticsInput answers={answers}/>
            )
            break;
        default:
            component = (<></>)
            break;
    }

    return (
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    <div className={styles.unselectedText}>{block.name || "Text"}</div>
                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
            </div>
    );
};

export default FillBlock;