import React, {useState} from 'react';
import * as Yup from "yup";
import Head from "next/head";
import styles from "./resetPassword.module.css";
import Link from "next/link";
import {Form, Formik} from "formik";
import MyTextInput from "@/components/formikFields/textInput";
import SubmitButton from "@/components/inputFields/submitButton";
import {useResetPassword} from "@/queries/users";

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
            <Head>
                <title>Reset password | NextForms</title>
                <meta name="description" content="Reset password page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#272e3a"/>
            </Head>
            <div className={styles.mainContainer}>
                <div className={styles.siteName}>
                    <Link href="/" rel="dofollow">
                        <h1>NextForms</h1>
                    </Link>
                </div>
                <div className={styles.formBody}>
                    <span className={styles.signInText}>Password reset</span>
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

                            <div className={styles.error}>
                                {submissionError}
                            </div>
                            <div className={styles.success}>
                                {successMessage}
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
                <div className={styles.footerLink}>
                    <div className={styles.copyRight}>
                        <span><Link href="#">RDD, Inc.</Link></span>
                        <span><Link href="#">Contact</Link></span>
                        <span><Link href="#">Privacy & Terms</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;