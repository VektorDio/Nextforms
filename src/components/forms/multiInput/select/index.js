import React from 'react';
import styles from "./select.module.css"

const Select = () => {
    return (
        <div>
            <select className={styles.typeSelect}>
                <option value="oneLineText">Test</option>
                <option value="paragraphText">Test2</option>
            </select>
        </div>
    );
};

export default Select;