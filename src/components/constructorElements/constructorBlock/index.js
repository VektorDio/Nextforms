import React, {useState} from 'react';
import styles from './constructorBlock.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import ToggleButton from "@/components/buttons/toggleButton";
import AddButton from "@/components/buttons/addButton";
import RedactableMultiInput from "@/components/forms/redactableMultiInput";
const ConstructorBlock = ({id, updater, array, idCounter, setIdCounter}) => {
    const [selectValue, setSelectValue] = useState("oneList");
    const handleSelectChange = (e) => {
        array.find(e => e.id === id).type = e.target.value
        setSelectValue(e.target.value);
    }

    const handleQuestionChange = (e) => {
        array.find(e => e.id === id).question = e.currentTarget.textContent
    }

    const handleRequiredToggle = (e) => {
        array.find(e => e.id === id).required = e.target.checked
    }

    const handleOptionsChanged = (options) => {
        array.find(e => e.id === id).options = options
    }

    const handleAddQuestionBlock = () => {
        let newId = idCounter + 1
        setIdCounter(newId)
        let buf = [...array]
        buf.splice((array.findIndex(e => e.id === id)+1), 0, {
            id: newId,
            required: false,
            type: "",
            question:"",
            options:[]
        })
        updater([...buf])
    }

    const handleDelete = () => {
        let buf = [...array]
        if(buf.length > 1){
            buf.splice(array.findIndex(e => e.id === id), 1)
        }
        updater([...buf])
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    <div className={styles.mainQuestion}
                         contentEditable={true}
                         placeholder="Question"
                         onBlur={handleQuestionChange}
                    >
                    </div>

                    <select className={styles.typeSelect} defaultValue={"oneList"} onChange={handleSelectChange}>
                        <option value="oneLineText">Text (One Line) </option>
                        <option value="paragraphText">Text (Paragraph) </option>
                        <option value="oneList">One from List </option>
                        <option value="manyList">Many from List </option>
                        <option value="selectList">Select List </option>
                        <option value="date">Date </option>
                        <option value="time">Time </option>
                    </select>
                </div>
                <div>
                    <RedactableMultiInput
                        type={selectValue}>
                        updater={handleOptionsChanged}
                    </RedactableMultiInput>
                </div>
                <div className={styles.blockFooter}>
                    <ToggleButton onClick={handleRequiredToggle} text={"Required Field"}></ToggleButton>
                    <DeleteButton onClick={handleDelete}></DeleteButton>
                </div>
            </div>
            <div className={styles.addButton}>
                <AddButton onClick={handleAddQuestionBlock}></AddButton>
            </div>
        </div>
    );
};

export default ConstructorBlock;