import React, {useState} from 'react';
import styles from './toggleButton.module.css'
const ToggleButton = ({onClick, text, checked}) => {
    const [checkedState, setChecked] = useState(checked)
    function handleChange(){
        setChecked(!checkedState)
    }

    return (
        <div className={styles.toggleContainer}>
            <label className={styles.toggleSwitch}>
                <input aria-label={text} type="checkbox" onClick={onClick} onChange={handleChange} checked={checkedState}/>
                <span className={styles.slider}/>
            </label>
            <div className={styles.text}>{text}</div>
        </div>
    )
}

export default ToggleButton;