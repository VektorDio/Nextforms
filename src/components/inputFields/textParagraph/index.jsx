import React, {useRef} from 'react';
import styles from "./longText.module.css";

const TextParagraph = ({placeholder, defaultValue, onBlur, disabled, error, maxLength}) => {

    let inputRef = useRef('')

    const keyPressEvent = (e) => {
        if (e.keyCode !== 8 && inputRef.current.textContent.length >= maxLength) {
            e.preventDefault()
        }
    }

    return (
        <div className={(error) ? styles.containerError : styles.containerOutline}>
            <div className={styles.container}
                 onBlur={onBlur}
                 placeholder={placeholder}
                 contentEditable={!disabled}
                 suppressContentEditableWarning={true}

                 ref={inputRef}
                 onKeyDown={keyPressEvent}
            >
                {defaultValue}
            </div>
        </div>
    );
};

export default TextParagraph;