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
const ConstructorBlock = ({id, updater, questionsObject}) => {
    const [selectValue, setSelectValue] = useState("radio");
    const currentQuestion = questionsObject.find(e => e.id === id)
    const currentQuestionIndex = questionsObject.findIndex(e => e.id === id)
    const [options, setOptions] = useState([...currentQuestion.options])

    if(options.length < 1){
        setOptions([{
            id: uuidv4(),
            text: ""
        }])
    }
    const handleSelectChange = (e) => {
        currentQuestion.type = e.target.value
        setSelectValue(e.target.value);
    }

    const handleQuestionChange = (e) => {
        currentQuestion.question = e.currentTarget.textContent
    }

    const handleRequiredToggle = (e) => {
        currentQuestion.required = e.target.checked
    }

    const handleAddQuestionBlock = () => {
        let buf = [...questionsObject]
        buf.splice((currentQuestionIndex+1), 0, {
            id: uuidv4(),
            required: false,
            type: "radio",
            question:"",
            options:[]
        })
        updater([...buf])
    }

    const handleDelete = () => {
        let buf = [...questionsObject]
        if(buf.length > 1){
            buf.splice(currentQuestionIndex, 1)
        }
        updater([...buf])
    }



    let component
    switch (selectValue){
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
                            deletable={options.length > 1}
                            options={options}
                            setOptions={setOptions}
                        />
                    )}
                    <OptionInput type={"radio"}
                                 addOption={true}
                                 options={options}
                                 setOptions={setOptions}/>
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
                                deletable={options.length > 1}
                                options={options}
                                setOptions={setOptions}

                            />
                        )}
                    <OptionInput type={"checkbox"}
                                 addOption={true}
                                 options={options}
                                 setOptions={setOptions}
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
                            deletable={options.length > 1}
                            index={index+1}
                            options={options}
                            setOptions={setOptions}/>
                    )}
                    <OptionInput type={"select"}
                                 addOption={true}
                                 index={options.length+1}
                                 options={options}
                                 setOptions={setOptions}
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
                        onBlur={handleQuestionChange}
                    />

                    <Select defaultValue={"radio"} onChange={handleSelectChange}>
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
                    <ToggleButton onClick={handleRequiredToggle} text={"Required Field"} checked={false}/>
                    <DeleteButton onClick={handleDelete}/>
                </div>
            </div>
            <div className={styles.addButton}>
                <AddButton onClick={handleAddQuestionBlock}/>
            </div>
        </div>
    );
};

export default ConstructorBlock;