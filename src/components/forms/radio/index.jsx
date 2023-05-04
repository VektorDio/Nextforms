import {useField} from "formik";
import React from "react";
import RadioInput from "@/components/inputs/radioInput";

const MyRadio = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'radio' });
    return (
        <div>
            <RadioInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyRadio