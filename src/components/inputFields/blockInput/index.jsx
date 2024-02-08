import React, {useRef} from 'react';
import styles from './blockInput.module.css'

const BlockInput = ({placeholder, onBlur, defaultValue, maxLength}) => {
    let inputRef = useRef('')

    const keyPressEvent = (e) => {
        if (e.keyCode !== 8 && inputRef.current.textContent.length >= maxLength) {
            e.preventDefault()
        }
    }

    return (
        <div className={styles.mainQuestion}
             contentEditable={true}
             placeholder={placeholder}
             onChange={onBlur}
             onBlur={onBlur}
             suppressContentEditableWarning={true}
             ref={inputRef}
             onKeyDown={keyPressEvent}
        >
            {defaultValue}
        </div>
    )
}

export default BlockInput;