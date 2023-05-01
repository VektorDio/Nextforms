import React from 'react';
import styles from "./checkbox.module.css";

const Checkbox = ({onBlur}) => {
    return (
        <>
            <label className={styles.manyContainer}>One
                <input type="checkbox" onBlur={onBlur}/>
                <span className={styles.checkmark}></span>
            </label>
        </>
    );
};

export default Checkbox;