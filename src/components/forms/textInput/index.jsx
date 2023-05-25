import {useField} from "formik";
import styles from "./textInput.module.css";
import React from "react";
import InlineInput from "@/components/inputs/inlineInput";

const MyTextInput = ({children, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <InlineInput {...field} {...props} error={(meta.touched && meta.error)}/>
            {(meta.touched && meta.error) ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MyTextInput