import React, {useState} from 'react';
import styles from './multiinput.module.css'
import Checkbox from "@/components/forms/redactableMultiInput/checkbox";
import Radio from "@/components/forms/redactableMultiInput/radio";
import Select from "@/components/forms/redactableMultiInput/select";
import Date from "@/components/forms/redactableMultiInput/date";
import Time from "@/components/forms/redactableMultiInput/time";

const RedactableMultiInput = ({type, updater}) => {
    const [options, setOptions] = useState([])
    let component
    switch (type){
        case "oneLineText":
            component = (<input className={styles.oneLineText}
                                type="text"
                                placeholder={"Answer"}
                                disabled={true}
            />)
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText} disabled={true}>
                    Answer
                </div>
            )
            break;
        case "oneList":
            component = (
                <>
                    <Radio deletable={false}></Radio>
                    {options.map(e =>
                        <Radio deletable={true}></Radio>
                    )}
                    <Radio deletable={false} addNewOption={true}></Radio>
                </>
            )
            break;
        case "manyList":
            component = (
                <>
                    <Checkbox></Checkbox>
                </>
            )
            break;
        case "selectList":
            component = (
                <>
                    <Select></Select>
                </>
            )
            break;
        case "date":
            component = (<><Date></Date></>)
            break;
        case "time":
            component = (<><Time></Time></>)
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

