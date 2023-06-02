import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './constructorBlock.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import ToggleButton from "@/components/buttons/toggleButton";
import AddButton from "@/components/buttons/addButton";
import Select from "@/components/inputs/selectInput";
import BlockInput from "@/components/inputs/blockInput";
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
import OptionInput from "@/components/inputs/optionInput";
import DateInput from "@/components/inputs/dateInput";
import TimeInput from "@/components/inputs/timeInput";
const ConstructorBlock = ({question, handleDelete, handleAdd, handleSelectChange, handleQuestionChange, handleRequiredToggle, selectedBlockId, setSelectedBlockId}) => {
    const [options, setOptions] = useState(() => {
        if (typeof question.options[0] === "string"){

            return question.options.map(e => ({
                id: uuidv4(),
                text: e,
            }))
        } else return question.options
    })
    const isSelected = selectedBlockId === question.id
    question.options = options
    function handleOptionRedacted(id, text) {
        if (text.length < 1){
            handleDeleteOption(id)
            return
        }

        let buf = [...options]
        let index = buf.findIndex(e => e.id === id)

        if (buf.some((e) => e.text === text)){
            buf[index].text = ""
            return
        }
        buf[index].text = text
        setOptions([...buf])
    }

    function handleDeleteOption(id) {
        let buf = [...options]
        let index = buf.findIndex(e => e.id === id)
        if(buf.length > 1){
            buf.splice(index, 1)
        }
        setOptions([...buf])
    }

    function handleAddOption() {
        let buf = [...options]

        if (buf.some((e) => e.text === "Option")){
            //display error
            return
        }

        buf.splice(options.length, 0, {
            id: uuidv4(),
            text: "Option"
        })

        setOptions([...buf])
    }

    let component
    switch (question.type){
        case "oneLineText":
            component = (
                <div className={styles.oneLineText}>
                    <InlineInput
                        placeholder={"Answer"}
                        disabled={true}
                    />
                </div>
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText}>
                    <TextParagraph
                        placeholder={"Answer"}
                        disabled={true}
                    />
                </div>
            )
            break;
        case "radio":
            component = (
                <>
                    {options.map((e) =>
                        <OptionInput
                            id={e.id}
                            key={e.id}
                            type={"radio"}
                            text={e.text}
                            disabled={!isSelected}
                            deletable={(options.length > 1)}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <div style={(isSelected) ? null : {display:"none"}}>
                        <OptionInput type={"radio"}
                                     addOption={true}
                                     handleAddOption={handleAddOption}
                        />
                    </div>
                </>
            )
            break;
        case "checkbox":
            component = (
                <>
                    {options.map((e) =>
                            <OptionInput
                                id={e.id}
                                key={e.id}
                                type={"checkbox"}
                                text={e.text}
                                deletable={options.length > 1}
                                disabled={!isSelected}
                                handleOptionRedacted={handleOptionRedacted}
                                handleDeleteOption={handleDeleteOption}
                            />
                        )}
                    <div style={(isSelected) ? null : {display:"none"}}>
                        <OptionInput type={"checkbox"}
                                     addOption={true}
                                     handleAddOption={handleAddOption}
                        />
                    </div>
                </>
            )
            break;
        case "select":
            component = (
                <>
                    {options.map((e, index) =>
                        <OptionInput
                            id={e.id}
                            key={e.id}
                            type={"select"}
                            text={e.text}
                            deletable={options.length > 1}
                            disabled={!isSelected}
                            index={index+1}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <div style={(isSelected) ? null : {display:"none"}}>
                        <OptionInput type={"select"}
                                     addOption={true}
                                     index={options.length+1}
                                     handleAddOption={handleAddOption}

                        />
                    </div>
                </>
            )
            break;
        case "date":
            component = (<DateInput disabled={true} defaultValue={"2000-01-01"}/>)
            break;
        case "time":
            component = (<TimeInput disabled={true} defaultValue={"20:00"}/>)
            break;
        default:
            component = (<></>)
            break;
    }

    return (
        <div
            className={(selectedBlockId === question.id) ? styles.outerContainer : styles.outerContainerDisabled}
            onClick={() => setSelectedBlockId(question.id)}
        >
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    {
                        (isSelected) ? (
                            <>
                                <BlockInput
                                placeholder="Question"
                                defaultValue={question.question}
                                onBlur={(e) => handleQuestionChange(question.id, e.currentTarget.textContent)}
                            />
                                <div className={styles.selectContainer}>
                                    <Select
                                        defaultValue={question.type}
                                        onChange={(e) => handleSelectChange(question.id, e.target.value)}
                                    >
                                        <option value="oneLineText">Text (One Line) </option>
                                        <option value="paragraphText">Text (Paragraph) </option>
                                        <option value="radio">One from List </option>
                                        <option value="checkbox">Many from List </option>
                                        <option value="select">Select List </option>
                                        <option value="date">Date </option>
                                        <option value="time">Time </option>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <div className={styles.unselectedText}>{question.question || "Question"}</div>
                        )
                    }

                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
                <div className={styles.blockFooter} style={(isSelected) ? null : {display:"none"}}>
                    <ToggleButton onClick={(e) => handleRequiredToggle(question.id, e.target.checked)} text={"Required Field"} checked={question.required}/>
                    <DeleteButton onClick={() => handleDelete(question.id)}/>
                </div>
            </div>
            <div className={styles.addButton} style={(isSelected) ? null : {display:"none"}}>
                <AddButton onClick={()=> handleAdd(question.id)}/>
            </div>
        </div>
    );
};

export default ConstructorBlock;