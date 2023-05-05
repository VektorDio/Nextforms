import {useField} from "formik";
import React from "react";
import SelectInput from "@/components/inputs/selectInput";

const MySelect = ({children, ...props}) => {
    const [field, meta] = useField({ ...props, type: 'select' });
    return (
        <>
            <SelectInput {...field} {...props} error={(meta.touched && meta.error)}>
                {children}
            </SelectInput>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default MySelect