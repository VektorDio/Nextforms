import React, {useState} from 'react';
import styles from './multiinput.module.css'
import Checkbox from "@/components/forms/redactableMultiInput/checkbox";
import Radio from "@/components/forms/redactableMultiInput/radio";
import InlineInput from "@/components/inputs/inlineInput";
import TextParagraph from "@/components/inputs/textParagraph";
import DateInput from "@/components/inputs/dateInput";
import TimeInput from "@/components/inputs/timeInput";
import Select from "@/components/inputs/selectInput";

const RedactableMultiInput = ({type, updater}) => {
    const [options, setOptions] = useState([])

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
                    <Radio deletable={false}></Radio>
                    {options.map(() =>
                        <Radio deletable={true}></Radio>
                    )}
                    <Radio deletable={false} addNewOption={true}></Radio>
                </>
            )
            break;
        case "manyList":
            component = (
                <>
                    <Checkbox/>
                </>
            )
            break;
        case "selectList":
            component = (
                <Select disabled={true}>
                    <option>Answer</option>
                </Select>
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

