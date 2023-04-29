import React from 'react';
import styles from './radio.module.css'
const Radio = () => {
    return (
        <>
            <label className={styles.radioContainer}>One
                <input type="radio" name="radio"/>
                <span className={styles.checkmark}></span>
            </label>
        </>
    );
};

export default Radio;