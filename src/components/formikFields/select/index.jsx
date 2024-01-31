import {useField} from "formik";
import React from "react";
import SelectInput from "@/components/inputFields/selectInput";
import styles from "./select.module.css"

const MySelect = ({...props}) => {
    const [field, meta, helpers] = useField({ ...props, type: 'select' });
    return (
        <>
            <SelectInput {...field} {...props}
                         error={(meta.touched && meta.error)}
                         onChange={(option) => helpers.setValue(option)}
            />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null }
        </>
    );
};

export default MySelect
