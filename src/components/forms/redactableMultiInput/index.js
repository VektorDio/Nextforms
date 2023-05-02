import React, {useState} from 'react';
import styles from './multiinput.module.css'
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
import DateInput from "@/components/inputs/dateInput";
import TimeInput from "@/components/inputs/timeInput";
import OptionInput from "@/components/inputs/optionInput";
import {v4 as uuidv4} from "uuid";

const RedactableMultiInput = ({type}) => {
    const [options, setOptions] = useState([{id: uuidv4(), text: ""}])

    function handleAddOption() {
        setOptions([...options, {
            id: uuidv4(),
            text: ""
        }])
    }

    function handleOptionRedacted(e, id) {
        options.find(e => e.id === id).text = e.currentTarget.textContent
    }

    let component
    switch (type){
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
        case "oneList":
            component = (
                <>
                    {options.map((e) =>
                            <OptionInput id={e.id} type={"radio"}/>
                        )}
                    <OptionInput type={"radio"} addOption={true} onAdd={handleAddOption}/>
                </>
            )
            break;
        case "manyList":
            component = (
                <>
                    {(options.length > 1) ? (
                            options.map(() =>
                                <OptionInput type={"checkbox"}/>
                            )
                        ) : (
                            <OptionInput type={"checkbox"} deletable={false}/>
                        )}
                    <OptionInput type={"checkbox"} addOption={true} onAdd={handleAddOption}/>
                </>
            )
            break;
        case "selectList":
            component = (
                <>
                    {(options.length > 1) ? (
                            options.map((e, index) =>
                                <OptionInput
                                    type={"select"}
                                    index={index+1}
                                    onBlur={handleOptionRedacted}/>
                            )
                        ) : (
                            <OptionInput
                                type={"select"}
                                deletable={false}
                                index={"1"}
                                onBlur={handleOptionRedacted}/>
                        )}
                    <OptionInput
                        type={"select"}
                        addOption={true}
                        onAdd={handleAddOption}
                        index={options.length+1}/>
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
        <div className={styles.container}>
            {component}
        </div>
    );
};

export default RedactableMultiInput;

