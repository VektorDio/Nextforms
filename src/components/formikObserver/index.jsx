import React from 'react';
import {useFormikContext} from "formik";
import useBeforeUnload from "@/hooks/useBeforeUnload";

const FormikObserver = () => {
    const { dirty } = useFormikContext();
    useBeforeUnload(dirty)
    return null
};

export default FormikObserver;