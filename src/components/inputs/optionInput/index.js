import React from 'react';
import styles from "./optionInput.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import TextParagraph from "@/components/inputs/textParagraph";

const OptionInput = ({id, type, deletable, onBlur, index, onDelete, addOption, onAdd}) => {

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
        <div>
            <label className={styles.radioContainer}>
                {checkmark}
                <div className={styles.text}>
                    {(addOption) ? (
                        <div className={styles.addOptionText} onClick={onAdd}> Add new option </div>
                    ) : (
                        <TextParagraph onBlur={() => onBlur} placeholder={"Option"}/>
                    )}
                </div>
                <div className={(deletable || addOption) && styles.disabled} onClick={onDelete}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </label>
        </div>
    );
};

export default OptionInput;