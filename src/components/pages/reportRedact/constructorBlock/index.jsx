import React from 'react';
import styles from './constructorBlock.module.css'
import AddButton from "@/components/buttons/addButton";
import SelectInput from "@/components/inputFields/selectInput";
import BlockInput from "@/components/inputFields/blockInput";
import InlineInput from "@/components/inputFields/inlineInput";
import TextParagraph from "@/components/inputFields/textParagraph";
import SimpleButton from "@/components/buttons/simpleButton";

const ConstructorBlock = ({block, index, handlers, selectedBlockId, maxBlockName=120}) => {

    const {
        handleDelete,
        handleAdd,
        handleBlockTypeChange,
        handleNameChange,
        setSelectedBlockId
    } = handlers

    const isSelected = selectedBlockId === index

    let component
    switch (block.type){
        case "oneLineText":
            component = (
                <div className={styles.oneLineText}>
                    <InlineInput
                        placeholder={"Text"}
                        disabled={true}
                    />
                </div>
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText}>
                    <TextParagraph
                        placeholder={"Text"}
                        disabled={true}
                    />
                </div>
            )
            break
        case "statistics":
            component = (
                <div className={styles.oneLineText}>
                    <SelectInput placeholder={"Select answer"} isDisabled={true}/>
                </div>
            )
            break;
        default:
            component = (<></>)
            break;
    }

    let blockTypeOptions = [
        {value: "oneLineText", label: "Text (One line)"},
        {value: "paragraphText", label: "Text (Paragraph)"},
        {value: "statistics", label: "Statistics"}
    ]

    return (
        <div
            className={(isSelected) ? styles.outerContainer : styles.outerContainerDisabled}
            onClick={(e) => setSelectedBlockId(e, index)}
        >
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    {
                        (isSelected) ? (
                            <>
                                <BlockInput
                                placeholder="Text"
                                defaultValue={block.name}
                                onBlur={(e) => handleNameChange(index, e.currentTarget.textContent)}
                                maxLength={maxBlockName}
                            />
                                <div className={styles.selectContainer}>
                                    <SelectInput
                                        ariaLabel={"Select block type"}
                                        defaultValue={blockTypeOptions.find((e) => e.value === block.type)}
                                        options={blockTypeOptions}
                                        onChange={(choice) => handleBlockTypeChange(index, choice.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className={styles.unselectedText}>{block.name || "Text"}</div>
                        )
                    }
                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
                <div className={styles.blockFooter} style={(isSelected) ? null : {display:"none"}}>
                    <SimpleButton onClick={() => handleDelete(index)} iconType={"xmark"} bgColor={"#d00c0c"} ariaLabel={"Delete block"}/>
                </div>
            </div>
            <div className={styles.addButtonColumn} style={(isSelected) ? null : {display:"none"}}>
                <div className={styles.addButton}>
                    <AddButton onClick={()=> handleAdd(index)}/>
                </div>
            </div>
        </div>
    );
};

export default ConstructorBlock;