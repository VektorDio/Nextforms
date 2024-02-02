import React, {useState} from 'react';
import * as Yup from "yup";
import Head from "next/head";
import styles from "./forgotPassword.module.css";
import Link from "next/link";
import {Form, Formik} from "formik";
import MyTextInput from "@/components/formikFields/textInput";
import SubmitButton from "@/components/inputFields/submitButton";
import {useRouter} from "next/router";
import {useResetPassword} from "@/queries/users";

const ForgotPassword = () => {
    const router = useRouter()
    const [submissionError, setSubmissionError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const {mutateAsync:passwordRequest} = useResetPassword()

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
            <Head>
                <title>Restore | NextForms</title>
                <meta name="description" content="Forgot password page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.mainContainer}>
                <div className={styles.siteName}>
                    <Link href="/" rel="dofollow">
                        <h1>NextForms</h1>
                    </Link>
                </div>
                <div className={styles.formBody}>
                    <span className={styles.signInText}>Password recovery request</span>
                    <Formik
                        initialValues={resetInitialValues}
                        validationSchema={resetSchema}
                        onSubmit={async (values) => await handleSubmit(values)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <MyTextInput
                                    name="email"
                                    type="email"
                                    placeholder="jane@formik.com"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">Secondary email (optional)</label>
                                <MyTextInput
                                    name="secondaryEmail"
                                    type="email"
                                    placeholder="janeSecond@formik.com"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">First Name (optional)</label>
                                <MyTextInput
                                    name="firstName"
                                    type="text"
                                    placeholder="Jane"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">Last name (optional)</label>
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

export default ForgotPassword;