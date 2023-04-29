import React from 'react';
import styles from './multiinput.module.css'
import Checkbox from "@/components/forms/multiInput/checkbox";
import Radio from "@/components/forms/multiInput/radio";
import Select from "@/components/forms/multiInput/select";
import Date from "@/components/forms/multiInput/date";
import Time from "@/components/forms/multiInput/time";

const MultiInput = ({type, disabled}) => {
    let component

    switch (type){
        case "oneLineText":
            component = (
                <input
                    className={styles.oneLineText}
                    type="text"
                />
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText} contentEditable={true}>
                    New Form
                </div>
            )
            break;
        case "oneList":
            component = (
                <>
                    <Radio></Radio>
                    <Radio></Radio>
                </>
            )
            break;
        case "manyList":
            component = (
                <>
                    <Checkbox></Checkbox>
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
            component = (
                <>
                    <Date></Date>
                </>
            )
            break;
        case "time":
            component = (
                <>
                    <Time></Time>
                </>
            )
            break;
        default:
            component = (
                <>

                </>
            )
            break;
    }

    return (
        <div className={styles.container}>
            {component}
        </div>
    );
};

export default MultiInput;