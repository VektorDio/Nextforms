import {useField} from "formik";
import React from "react";
import TimeInput from "@/components/inputs/timeInput";
import styles from "./time.module.css"
const MyTime = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'date' });
    return (
        <>
            <TimeInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyTime