import React, {useState} from 'react';
import styles from './constructorBlock.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import MultiInput from "@/components/forms/multiInput";
import ToggleButton from "@/components/buttons/toggleButton";
import AddButton from "@/components/buttons/addButton";
const ConstructorBlock = () => {
    const [selected, setSelected] = useState(true)
    const [selectValue, setSelectValue] = useState("oneList");

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.container}>
                {(selected) ? (
                    <>
                        <div className={styles.blockHeader}>
                            <div className={styles.mainQuestion}
                                 contentEditable={true}
                                 placeholder="Test">
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
                            <MultiInput type={selectValue}></MultiInput>
                        </div>
                        <div className={styles.blockFooter}>
                            <ToggleButton text={"Required Field"}></ToggleButton>
                            <DeleteButton></DeleteButton>
                        </div>
                    </>
                ) : (
                    <>
                        <label htmlFor="contactChoice1">2</label>
                        <input type="radio"
                               id="contactChoice1"
                               name="contact"
                               value="email"
                        />
                    </>
                )
                }
            </div>
            <div className={styles.addButton}>
                <AddButton></AddButton>
            </div>
        </div>
    );
};

export default ConstructorBlock;