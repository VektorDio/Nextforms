import {useField} from "formik";
import styles from "./textInput.module.css";
import React from "react";

const MyTextInput = ({...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <input {...field} {...props} className={(meta.touched && meta.error) ? styles.inputInvalid : null} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyTextInput