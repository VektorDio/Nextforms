import {useField} from "formik";
import styles from "./textInput.module.css";
import React from "react";
import TextParagraph from "@/components/inputFields/textParagraph";

const MyParagraphInput = ({children, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    return (
        <>
            <TextParagraph {...field} {...props}
                           error={(meta.touched && meta.error)}
                           defaultValue={children}
                           onBlur={(e)=> setValue(e.currentTarget.textContent)}/>
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

export default MyParagraphInput