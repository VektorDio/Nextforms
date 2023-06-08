import React from 'react';
import styles from './constructorBlock.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import AddButton from "@/components/buttons/addButton";
import Select from "@/components/inputs/selectInput";
import BlockInput from "@/components/inputs/blockInput";
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
const ConstructorBlock = ({block, handleDelete, handleAdd, handleBlockTypeChange,
                              handleNameChange, selectedBlockId, setSelectedBlockId}) => {

    const isSelected = selectedBlockId === block.id

    let component
    switch (block.type){
        case "oneLineText":
            component = (
                <div className={styles.oneLineText}>
                    <InlineInput
                        placeholder={"Текст"}
                        disabled={true}
                    />
                </div>
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText}>
                    <TextParagraph
                        placeholder={"Текст"}
                        disabled={true}
                    />
                </div>
            )
            break
        case "statistics":
            component = (
                <div className={styles.paragraphText}>
                    <Select defaultValue={"placeholder"} disabled={true}>
                        <option value={"placeholder"}>Виберіть відповідь</option>
                    </Select>
                </div>
            )
            break;
        default:
            component = (<></>)
            break;
    }

    return (
        <div
            className={(selectedBlockId === block.id) ? styles.outerContainer : styles.outerContainerDisabled}
            onClick={() => setSelectedBlockId(block.id)}
        >
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    {
                        (isSelected) ? (
                            <>
                                <BlockInput
                                placeholder="Текст"
                                defaultValue={block.name}
                                onBlur={(e) => handleNameChange(block.id, e.currentTarget.textContent)}
                            />
                                <div className={styles.selectContainer}>
                                    <Select
                                        defaultValue={block.type}
                                        onChange={(e) => handleBlockTypeChange(block.id, e.target.value)}
                                    >
                                        <option value="oneLineText">Текст (Одна лінія) </option>
                                        <option value="paragraphText">Текст (Параграф) </option>
                                        <option value="statistics">Статистика </option>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <div className={styles.unselectedText}>{block.name || "Текст"}</div>
                        )
                    }

                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
                <div className={styles.blockFooter} style={(isSelected) ? null : {display:"none"}}>
                    <DeleteButton onClick={() => handleDelete(block.id)}/>
                </div>
            </div>
            <div className={styles.addButton} style={(isSelected) ? null : {display:"none"}}>
                <AddButton onClick={()=> handleAdd(block.id)}/>
            </div>
        </div>
    );
};

export default ConstructorBlock;