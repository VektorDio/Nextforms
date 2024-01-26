import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import styles from "./loginForm.module.css";
import Link from "next/link";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/forms/textInput";
import SubmitButton from "@/components/inputs/submitButton";

const Login = () => {
    const {status} = useSession()
    const router = useRouter()
    const [submissionError, setSubmissionError] = useState(null)
    const [ok, setOk] = useState(null)
    const [error, setError] = useState(null)

    if (status === "authenticated") {
        router.push("/home")
    }

    async function handleSubmit(values) {
        const {email, password} = values

        const {ok, error} = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })

        setError(error)
        setOk(ok)
    }

    useEffect(() => {
        if (ok) {
            router.push("/home")
        }
        else {
            setSubmissionError(error)
        }
    }, [ok, error, router])

    const loginSchema = Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .required('Required'),
        })

    const loginInitialValues = {
        email: '',
        password: '',
    }

    return (
        <>
            <Head>
                <title>Sign in | NextForms</title>
                <meta name="description" content="Sign in page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.mainContainer}>
                <div className={styles.siteName}>
                    <Link href="/" rel="dofollow">
                        <h1> NextForms </h1>
                    </Link>
                </div>
                <div className={styles.formBody}>
                    <span className={styles.signInText}>Log in to account</span>
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={loginSchema}
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
                                <div className={styles.passwordGrid}>
                                    <label htmlFor="password">Password</label>
                                    <div className={styles.resetPassText}>
                                        <Link href="/index">Forgot your password?</Link>
                                    </div>
                                </div>
                                <MyTextInput
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                />
                            </div>

                            <div className={styles.error} style={{display: (submissionError) ? "block" : "none"}}>
                                {submissionError}
                            </div>

                            <div className={styles.field}>
                                <SubmitButton
                                    type="submit"
                                    name="submit"
                                    value="Continue"
                                    disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                                />
                            </div>

                            {/*<div className={styles.ssolink}>*/}
                            {/*    <Link href="#">Use Google instead</Link>*/}
                            {/*</div>*/}
                        </Form>
                    )}
                    </Formik>
                </div>

                <div className={styles.footerLink}>
                    <span className={styles.footerText}>
                      Dont have an account? <Link className={styles.signUpLink} href="/register">Register</Link>
                    </span>
                    <div className={styles.copyRight}>
                        <span><Link href="#">©2023 TEST, Inc.</Link></span>
                        <span><Link href="#">Contact</Link></span>
                        <span><Link href="#">Privacy & Terms</Link></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;