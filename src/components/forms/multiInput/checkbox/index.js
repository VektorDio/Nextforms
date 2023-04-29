import React from 'react';
import styles from "./checkbox.module.css";

const Checkbox = () => {
    return (
        <>
            <label className={styles.manyContainer}>One
                <input type="checkbox"/>
                <span className={styles.checkmark}></span>
            </label>
        </>
    );
};

export default Checkbox;