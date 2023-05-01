import React from 'react';
import styles from './radio.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
const Radio = ({deletable, handleDelete, addNewOption, handleAdd}) => {
    return (
        <>
            <label className={styles.radioContainer}>
                {(addNewOption) ? (
                        <div className={styles.addText} onClick={handleAdd}>Add new option</div>
                    ) : (
                        <input className={styles.oneLineText}
                               type="text"
                               placeholder={"Answer"}
                        />
                    )
                }
                <div
                    className={styles.radioContainerInput}
                    disabled={true}/>
                <span className={styles.checkmark}></span>
                {
                    (deletable) && <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={handleDelete}/>
                }
            </label>
        </>
    );
};

export default Radio;