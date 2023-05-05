import {useField} from "formik";
import React from "react";
import TimeInput from "@/components/inputs/timeInput";

const MyTime = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'date' });
    return (
        <>
            <TimeInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {meta.touched && meta.error ? (
                <div className={"error"}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyTime