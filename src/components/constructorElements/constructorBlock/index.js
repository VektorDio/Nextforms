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
const ConstructorBlock = ({question, handleDelete, handleAdd, handleSelectChange, handleQuestionChange, handleRequiredToggle}) => {
    const [options, setOptions] = useState(question.options)

    question.options = options
    function handleOptionRedacted(id, text) {
        let buf = [...options]
        let index = buf.findIndex(e => e.id === id)
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
        buf.splice(options.length, 0, {
            id: uuidv4(),
            text: ""
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
                            deletable={options.length > 1}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <OptionInput type={"radio"}
                                 addOption={true}
                                 handleAddOption={handleAddOption}
                    />
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
                                handleOptionRedacted={handleOptionRedacted}
                                handleDeleteOption={handleDeleteOption}
                            />
                        )}
                    <OptionInput type={"checkbox"}
                                 addOption={true}
                                 handleAddOption={handleAddOption}
                    />
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
                            index={index+1}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <OptionInput type={"select"}
                                 addOption={true}
                                 index={options.length+1}
                                 handleAddOption={handleAddOption}
                    />
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
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    <BlockInput
                        placeholder="Question"
                        defaultValue={question.question}
                        onBlur={(e) => handleQuestionChange(question.id, e.currentTarget.textContent)}
                    />

                    <Select defaultValue={question.type} onChange={(e) => handleSelectChange(question.id, e.target.value)}>
                        <option value="oneLineText">Text (One Line) </option>
                        <option value="paragraphText">Text (Paragraph) </option>
                        <option value="radio">One from List </option>
                        <option value="checkbox">Many from List </option>
                        <option value="select">Select List </option>
                        <option value="date">Date </option>
                        <option value="time">Time </option>
                    </Select>
                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
                <div className={styles.blockFooter}>
                    <ToggleButton onClick={(e) => handleRequiredToggle(question.id, e.target.checked)} text={"Required Field"} checked={false}/>
                    <DeleteButton onClick={() => handleDelete(question.id)}/>
                </div>
            </div>
            <div className={styles.addButton}>
                <AddButton onClick={()=> handleAdd(question.id)}/>
            </div>
        </div>
    );
};

export default ConstructorBlock;