import React, {useState} from 'react';
import styles from './constructorBlock.module.css'
import DeleteButton from "@/components/buttons/deleteButton";
import MultiInput from "@/components/forms/multiInput";
const ConstructorBlock = () => {
    const [selected, setSelected] = useState(true)
    const [selectValue, setSelectValue] = useState("oneList");

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    }

    return (
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
                        <div className={styles.blockBody}>
                            <MultiInput type={selectValue}></MultiInput>
                        </div>
                        <div className={styles.blockFooter}>
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
    );
};

export default ConstructorBlock;