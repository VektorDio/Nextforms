import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import MyTextInput from "@/components/formikFields/textInput";
import SubmitButton from "@/components/inputFields/submitButton";
import {useResetPasswordRequest} from "@/queries/users";
import FooterLinks from "@/components/formPageElements/footerLinks";
import FormContainer from "@/components/formPageElements/containerWithSiteName";
import FormBody from "@/components/formPageElements/formBody";
import ErrorMessage from "@/components/formPageElements/errorMessage";
import SuccessMessage from "@/components/formPageElements/successMessage";
import FormName from "@/components/formPageElements/formName";
import MetaHead from "@/components/metaHead";
import styles from "./forgotPassword.module.css";

const ForgotPassword = () => {
    const [submissionError, setSubmissionError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const {mutateAsync:passwordRequest} = useResetPasswordRequest()

    const resetSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .max(30, 'This email is too long'),
        secondaryEmail: Yup.string()
            .email('Invalid email address')
            .max(30, 'This email is too long'),
        firstName: Yup.string()
            .max(30, "This name is too long"),
        lastName: Yup.string()
            .max(30, "This name is too long"),
    })

    const resetInitialValues = {
        email: '',
        secondaryEmail: '',
        firstName: '',
        lastName: '',
    }

    async function handleSubmit(values) {
        const { email, secondaryEmail, firstName, lastName } = values

        await passwordRequest({
            email: email,
            secondaryEmail: secondaryEmail,
            firstName: firstName,
            lastName: lastName
        }, {
            onSuccess() {
                setSuccessMessage("Success. Check your email.")
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
            <MetaHead title={"Restore | NextForms"} description={"Forgot password page"}/>
            <FormContainer>
                <FormBody>
                    <FormName>Password recovery request</FormName>
                    <Formik
                        initialValues={resetInitialValues}
                        validationSchema={resetSchema}
                        onSubmit={async (values) => await handleSubmit(values)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.field}>
                                <label htmlFor="Email">Email</label>
                                <MyTextInput
                                    name="email"
                                    type="email"
                                    placeholder="jane@formik.com"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="Secondary email">Secondary email (optional)</label>
                                <MyTextInput
                                    name="secondaryEmail"
                                    type="email"
                                    placeholder="janeSecond@formik.com"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="First name">First Name (optional)</label>
                                <MyTextInput
                                    name="firstName"
                                    type="text"
                                    placeholder="Jane"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="last name">Last name (optional)</label>
                                <MyTextInput
                                    name="lastName"
                                    type="text"
                                    placeholder="Smith"
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

export default ForgotPassword;