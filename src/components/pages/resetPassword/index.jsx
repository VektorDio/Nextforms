import React, {useState} from 'react';
import * as Yup from "yup";
import styles from "./resetPassword.module.css";
import {Form, Formik} from "formik";
import MyTextInput from "@/components/formikFields/textInput";
import SubmitButton from "@/components/inputFields/submitButton";
import {useResetPassword} from "@/queries/users";
import FooterLinks from "@/components/formPageElements/footerLinks";
import MetaHead from "@/components/metaHead";
import FormContainer from "@/components/formPageElements/containerWithSiteName";
import FormBody from "@/components/formPageElements/formBody";
import ErrorMessage from "@/components/formPageElements/errorMessage";
import SuccessMessage from "@/components/formPageElements/successMessage";
import FormName from "@/components/formPageElements/formName";

const ResetPassword = ({token}) => {
    const [submissionError, setSubmissionError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [showPassword, setShowPassword] = useState(true)

    const {mutateAsync:passwordReset} = useResetPassword()

    const passwordString = Yup.string()
        .matches(/[^\s-]/, "No whitespaces allowed")
        .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Only english letters allowed")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .min(8, 'Password must be 8 characters long')
        .max(150, "Password is too long")
        .required('Required')

    const passwordConfirmString = Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Must match "Password" field value')
        .required('Required')

    const resetSchema = Yup.object({
        newPassword: passwordString,
        newPasswordConfirm: passwordConfirmString
    })

    const resetInitialValues = {
        newPassword: '',
        newPasswordConfirm: ''
    }

    async function handleSubmit(values) {
        const { newPassword, newPasswordConfirm } = values

        await passwordReset({
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm,
            token: token
        }, {
            onSuccess() {
                setSuccessMessage("Success. Log in with new password.")
                setSubmissionError(null)
            },
            onError(error) {
                setSubmissionError(error.response.data.message)
                setSuccessMessage(null)
            }
        })

    }

    return (
        <>
            <MetaHead title={"Reset password | NextForms"} description={"Reset password page"}/>
            <FormContainer>
                <FormBody>
                    <FormName>Password reset</FormName>
                    <Formik
                        initialValues={resetInitialValues}
                        validationSchema={resetSchema}
                        onSubmit={async (values) => await handleSubmit(values)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.field}>
                                <div className={styles.passwordGrid}>
                                    <label htmlFor="new password">New password</label>
                                    <div className={styles.showText} onClick={() => setShowPassword(!showPassword)}>
                                        {(showPassword) ? "Show password" : "Hide password"}
                                    </div>
                                </div>
                                <MyTextInput
                                    name="newPassword"
                                    type={(showPassword) ? "password" : "text"}
                                    placeholder="********"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="new password confirm">New password confirmation</label>
                                <MyTextInput
                                    name="newPasswordConfirm"
                                    type={(showPassword) ? "password" : "text"}
                                    placeholder="********"
                                />
                            </div>

                            <div className={styles.field}>
                                <SubmitButton
                                    type="submit"
                                    name="submit"
                                    value="Confirm"
                                    disabled={!(formik.isValid && formik.dirty)||formik.isSubmitting}
                                />
                            </div>

                            <ErrorMessage>
                                {submissionError}
                            </ErrorMessage>
                            <SuccessMessage>
                                {successMessage}
                            </SuccessMessage>
                        </Form>
                    )}
                    </Formik>
                </FormBody>
                <FooterLinks/>
            </FormContainer>
        </>
    )
}

export default ResetPassword;