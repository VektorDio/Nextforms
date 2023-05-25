import {useField} from "formik";
import React from "react";
import SelectInput from "@/components/inputs/selectInput";
import styles from "./select.module.css"

const MySelect = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'select' });
    return (
        <>
            <SelectInput {...field} {...props} error={(meta.touched && meta.error)} >
                {children}
            </SelectInput>
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default MySelect