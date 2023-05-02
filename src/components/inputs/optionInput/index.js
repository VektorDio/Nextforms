import React from 'react';
import styles from "./optionInput.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import TextParagraph from "@/components/inputs/textParagraph";
import {v4 as uuidv4} from "uuid";

const OptionInput = ({id, type, deletable, index, addOption, options, setOptions}) => {
    function handleOptionRedacted(e) {
        options.find(q => q.id === id).text = e.currentTarget.textContent
        setOptions([...options])
    }

    function handleDeleteOption() {
        let buf = [...options]
        if(buf.length > 1){
            buf.splice(options.findIndex(e => e.id === id), 1)
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

    let checkmark
    switch (type){
        case "radio":
            checkmark = <span className={styles.radio}></span>
            break;
        case "checkbox":
            checkmark = <span className={styles.checkbox}></span>
            break;
        case "select":
            checkmark = <span className={styles.select}>{index}. </span>
            break;
        default:
            checkmark = <span className={styles.checkbox}></span>
    }

    return (
        <label className={styles.radioContainer}>
            {checkmark}
            <div className={styles.text}>
                {(addOption) ? (
                    <div className={styles.addOptionText} onClick={handleAddOption}> Add new option </div>
                ) : (
                    <TextParagraph onBlur={handleOptionRedacted} placeholder={"Option"}/>
                )}
            </div>
            <div className={(!deletable || addOption) ? styles.disabled : styles.enabled} onClick={handleDeleteOption}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </label>
    );
};

export default OptionInput;