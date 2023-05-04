import React from 'react';
import styles from "./optionInput.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import TextParagraph from "@/components/inputs/textParagraph";

const OptionInput = ({id, text, type, deletable, index, addOption, handleOptionRedacted, handleDeleteOption, handleAddOption}) => {
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
                    <TextParagraph
                        onBlur={(e) => handleOptionRedacted(id, e.currentTarget.textContent)}
                        placeholder={"Option"}
                        defaultValue={text}
                    />
                )}
            </div>
            <div className={(!deletable || addOption) ? styles.disabled : styles.enabled} onClick={()=> handleDeleteOption(id)}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
        </label>
    );
};

export default OptionInput;