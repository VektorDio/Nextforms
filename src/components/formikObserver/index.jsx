import React from 'react';
import {useFormikContext} from "formik";
import useBeforeUnload from "@/hooks/useBeforeUnload";

const FormikObserver = () => {
    const { dirty, isSubmitting } = useFormikContext();
    useBeforeUnload(dirty && !isSubmitting)
    return null
}

export default FormikObserver;