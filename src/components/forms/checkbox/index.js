import {useField} from "formik";
import React from "react";
import CheckboxInput from "@/components/inputs/checkboxInput";

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <CheckboxInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyCheckbox