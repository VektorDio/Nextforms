import {useField} from "formik";
import React from "react";
import CheckboxInput from "@/components/inputFields/checkboxInput";
import styles from "./checkbox.module.css"

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <CheckboxInput {...field} {...props} error={(meta.touched && meta.error)}/>
            { (meta.touched && meta.error) ? ( <div className={styles.error}>{meta.error}</div> ) : null }
        </>
    );
};

export default MyCheckbox