import React, {useState} from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import styles from './loginForm.module.css'
import Link from "next/link";
import MyTextInput from "@/components/forms/textInput";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

const LoginForm = () => {
    const router = useRouter()
    const [submissionError, setSubmissionError] = useState(null)
    return (
        <div className={styles.mainContainer}>
            <div className={styles.siteName}>
                <h1>
                    <Link href="/" rel="dofollow">ReportGenerator.js</Link>
                </h1>
            </div>
            <div className={styles.formBody}>
                <span className={styles.signInText}>Sign in to your account</span>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Password must be 8 characters long')
                        .matches(/[0-9]/, 'Password requires a number')
                        .matches(/[a-z]/, 'Password requires a lowercase letter')
                        .matches(/[A-Z]/, 'Password requires an uppercase letter')
                        .required('Required'),
                    //staySignedIn: Yup.boolean(),
                })}
                onSubmit={ async (values, { setSubmitting }) => {
                    const {email, password} = values
                    setSubmitting(false);
                    const {ok, error} = await signIn('credentials', {
                        email: email,
                        password: password,
                        redirect: false
                    })

                    if (ok){
                        await router.push('/home')
                    } else {
                        setSubmissionError(error)
                    }
                }}
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
                            <div className={styles.resetPass}>
                                <Link className={styles.resetPassText} href="/login">Forgot your password?</Link>
                            </div>
                        </div>
                        <MyTextInput
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    {/*<div className={styles.fieldCheckbox}>*/}
                    {/*    <MyCheckbox name="staySignedIn">*/}
                    {/*        Stay signed in*/}
                    {/*    </MyCheckbox>*/}
                    {/*</div>*/}

                    <div className={styles.error} style={{display: (submissionError) ? "block" : "none"}}>
                        {submissionError}
                    </div>

                    <div className={styles.field}>
                        <input type="submit" name="submit" value="Continue" disabled={!(formik.isValid && formik.dirty)}/>
                    </div>

                    <div className={styles.ssolink}>
                        <Link href="#">Use Google instead</Link>
                    </div>
                </Form>
            )}
            </Formik>
            </div>
            <div className={styles.footerLink}>
                    <span className={styles.footerText}>
                      Don`t have an account? <Link className={styles.signUpLink} href="/register">Sign up</Link>
                    </span>
                <div className={styles.copyRight}>
                    <span><Link href="#">©2023 TEST, Inc.</Link></span>
                    <span><Link href="#">Contact</Link></span>
                    <span><Link href="#">Privacy & terms</Link></span>
                </div>
            </div>
        </div>
    );
};

export default LoginForm