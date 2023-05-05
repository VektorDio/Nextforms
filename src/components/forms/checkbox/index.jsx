import {useField} from "formik";
import React from "react";
import CheckboxInput from "@/components/inputs/checkboxInput";

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <CheckboxInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {(meta.touched && meta.error) ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyCheckbox