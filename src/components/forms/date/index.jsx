import {useField} from "formik";
import React from "react";
import Date from "@/components/inputs/dateInput";
import styles from "./date.module.css"
const MyDate = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'date' });
    return (
        <>
            <Date
                error={(meta.touched && meta.error)}
                {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyDate