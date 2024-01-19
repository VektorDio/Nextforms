import React, {useState} from 'react';
import styles from './constructorBlock.module.css'
import ToggleButton from "@/components/buttons/toggleButton";
import AddButton from "@/components/buttons/addButton";
import SelectInput from "@/components/inputs/selectInput";
import BlockInput from "@/components/inputs/blockInput";
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
import OptionInput from "@/components/inputs/optionInput";
import DateInput from "@/components/inputs/dateInput";
import TimeInput from "@/components/inputs/timeInput";
import SimpleButton from "@/components/buttons/simpleButton";
const ConstructorBlock = ({question, handleDelete, handleAdd, handleSelectChange, handleQuestionChange,
                              handleRequiredToggle, selectedBlockId, setSelectedBlockId, handleOptionsChange, questionIndex}) => {
    const [options, setOptions] = useState(() => {
        return question.options !== undefined ? question.options : []
    })

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
    }

    function handleAddOption() {
        let buf = [...options]
        buf.push("Option")
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
            className={isSelected ? styles.outerContainer : styles.outerContainerDisabled}
            onClick={() => setSelectedBlockId(questionIndex)}
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
                                />
                                <div className={styles.selectContainer}>
                                    <SelectInput
                                        defaultValue={questionTypeOptions.find((e) => e.value === question.type)}
                                        onChange={(choice) => handleSelectChange(questionIndex, choice.value)}
                                        options={questionTypeOptions}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className={(question.question.length > 0) ? styles.unselectedText : styles.unselectedPlaceholder}>
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
                    <SimpleButton onClick={() => handleDelete(questionIndex)} iconType={"xmark"} bgColor={"#d00c0c"}/>
                </div>
            </div>
            <div className={styles.addButton} style={(isSelected) ? null : {display:"none"}}>
                <AddButton onClick={()=> handleAdd(questionIndex)}/>
            </div>
        </div>
    );
};

export default ConstructorBlock;