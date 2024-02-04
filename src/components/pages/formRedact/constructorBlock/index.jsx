import React, {useState} from 'react';
import styles from './constructorBlock.module.css'
import ToggleButton from "@/components/buttons/toggleButton";
import AddButton from "@/components/buttons/addButton";
import SelectInput from "@/components/inputFields/selectInput";
import BlockInput from "@/components/inputFields/blockInput";
import InlineInput from "@/components/inputFields/inlineInput";
import TextParagraph from "@/components/inputFields/textParagraph";
import OptionInput from "@/components/inputFields/optionInput";
import DateInput from "@/components/inputFields/dateInput";
import TimeInput from "@/components/inputFields/timeInput";
import SimpleButton from "@/components/buttons/simpleButton";
import classNames from "classnames";

const ConstructorBlock = ({question, handlers, questionIndex, selectedBlockId, maxOptions=10, maxQuestionLength=120}) => {
    const [options, setOptions] = useState(() => {
        return question.options !== undefined ? question.options : []
    })

    const {
        handleDelete,
        handleAdd,
        handleSelectChange,
        handleQuestionChange,
        handleRequiredToggle,
        setSelectedBlockId,
        handleOptionsChange
    } = handlers

    const isSelected = selectedBlockId === questionIndex

    function handleOptionRedacted(index, text) {
        if (text.length < 1 && options.length > 1){
            handleDeleteOption(index)
            // cant create empty option unless its last one
            return
        }

        let buf = [...options]

        if (buf.find((option, i) => (option === text && i !== index))){ // similarity check
            handleDeleteOption(index) // cant create similar option
            return
        }

        buf[index] = text
        setOptions([...buf])
        handleOptionsChange(questionIndex, [...buf])
    }

    function handleDeleteOption(index) {
        let buf = [...options]
        buf.splice(index, 1)
        setOptions([...buf])
        handleOptionsChange(questionIndex, [...buf])
    }

    function handleAddOption() {
        let buf = [...options]
        buf.push("Option")
        setOptions([...buf])
        handleOptionsChange(questionIndex, [...buf])
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
                    {options.map((e, i) =>
                        <OptionInput
                            id={i}
                            key={i}
                            text={e}
                            type={"radio"}
                            disabled={!isSelected}
                            deletable={(options.length > 1)}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <div style={(isSelected && options.length < maxOptions) ? null : {display:"none"}}>
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
                    {options.map((e, i) =>
                        <OptionInput
                            id={i}
                            key={i}
                            text={e}
                            type={"checkbox"}
                            deletable={options.length > 1}
                            disabled={!isSelected}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <div style={(isSelected && options.length < maxOptions) ? null : {display:"none"}}>
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
                            id={index}
                            key={index}
                            type={"select"}
                            text={e}
                            deletable={options.length > 1}
                            disabled={!isSelected}
                            index={index+1}
                            handleOptionRedacted={handleOptionRedacted}
                            handleDeleteOption={handleDeleteOption}
                        />
                    )}
                    <div style={(isSelected && options.length < maxOptions) ? null : {display:"none"}}>
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

    let questionTypeOptions = [
        {value: "oneLineText", label: "Text (one line)"},
        {value: "paragraphText", label: "Text (Paragraph)"},
        {value: "radio", label: "Select one"},
        {value: "checkbox", label: "Select many"},
        {value: "select", label: "List"},
        {value: "date", label: "Date"},
        {value: "time", label: "Time"}
    ]

    return (
        <div
            className={(isSelected) ? styles.outerContainer : styles.outerContainerDisabled}
            onClick={(e) => setSelectedBlockId(e, questionIndex)}
        >
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    {
                        (isSelected) ? (
                            <>
                                <BlockInput
                                placeholder="Questions"
                                onBlur={(e) => handleQuestionChange(questionIndex, e.currentTarget.textContent)}
                                defaultValue={question.question}
                                maxLength={maxQuestionLength}
                                />
                                <div className={styles.selectContainer}>
                                    <SelectInput
                                        ariaLabel={"Select question type"}
                                        defaultValue={questionTypeOptions.find((e) => e.value === question.type)}
                                        onChange={(choice) => handleSelectChange(questionIndex, choice.value)}
                                        options={questionTypeOptions}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className={classNames(styles.unselectedText, (question.question.length > 0) && styles.unselectedPlaceholder)}>
                                {question.question || "Empty question"}
                            </div>
                        )
                    }

                </div>
                <div className={styles.blockInput}>
                    {component}
                </div>
                <div className={styles.blockFooter} style={(isSelected) ? null : {display:"none"}}>
                    <ToggleButton onClick={(e) => handleRequiredToggle(questionIndex, e.target.checked)} text={"Required"} checked={question.required}/>
                    <div className={styles.btnContainer}>
                        <SimpleButton onClick={() => handleDelete(questionIndex)} iconType={"xmark"} bgColor={"#d00c0c"} ariaLabel={"Delete question"}/>
                    </div>
                </div>
            </div>
            <div className={styles.addButtonColumn} style={(isSelected) ? null : {display:"none"}}>
                <div className={styles.addButton}>
                    <AddButton onClick={()=> handleAdd(questionIndex)} />
                </div>
            </div>
        </div>
    );
};

export default ConstructorBlock;