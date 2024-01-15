import React, {useState} from 'react';
import Head from "next/head";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import styles from "./registerForm.module.css";
import Link from "next/link";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/forms/textInput";
import SubmitButton from "@/components/inputs/submitButton";
import {useAddUser} from "@/queries/users";

const Register = () => {
    const {status} = useSession()
    const router = useRouter()
    const [submissionError, setSubmissionError] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const {mutateAsync} = useAddUser()

    if (status === "authenticated") {
        router.push("/home")
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
    }
    const handleSubmit = async (values) => {
        const {email, password, organisation} = values

        try {
            await mutateAsync({
                email: email,
                password: password,
                organisation: organisation
            })

            const {ok, error:logInError} = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            })

            if (ok) {
                router.push("/home")
            } else {
                setSubmissionError(logInError)
                values.setSubmitting(false);
            }
        } catch (e){
            setSubmissionError(e.response.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Sign up | NextForms</title>
                <meta name="description" content="Sign up page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.mainContainer}>
                <div className={styles.siteName}>
                    <Link href="/" rel="dofollow">
                        <h1>ReportGenerator.js</h1>
                    </Link>
                </div>
                <div className={styles.formBody}>
                    <span className={styles.signInText}>Register new account</span>
                    <Formik
                        initialValues={{
                            email: '',
                            organisation: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                            organisation: Yup.string()
                                .required('Required'),
                            password: Yup.string()
                                .min(8, 'Password must be 8 characters long')
                                .matches(/[0-9]/, 'Password requires a number')
                                .matches(/[a-z]/, 'Password requires a lowercase letter')
                                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                                .required('Required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Must match "Password" field value')
                                .required('Required'),
                        })}
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
                                <label htmlFor="organisation">Organization</label>
                                <MyTextInput
                                    name="organisation"
                                    type="text"
                                    placeholder="Organization"
                                />
                            </div>

                            <div className={styles.field}>
                                <div className={styles.passwordGrid}>
                                    <label htmlFor="password">Password</label>
                                    <div className={styles.showText} onClick={handleShowPassword}>
                                        {(showPassword) ? "Show password" : "Hide password"}
                                    </div>
                                </div>
                                <MyTextInput
                                    name="password"
                                    type={(showPassword) ? "password" : "text"}
                                    placeholder="********"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="password">Password confirmation</label>
                                <MyTextInput
                                    name="confirmPassword"
                                    type={(showPassword) ? "password" : "text"}
                                    placeholder="********"
                                />
                            </div>

                            <div className={styles.field}>
                                <SubmitButton
                                    type="submit"
                                    name="submit"
                                    value="Register"
                                    disabled={!(formik.isValid && formik.dirty)||formik.isSubmitting}
                                />
                            </div>

                            <div className={styles.error}>
                                {submissionError}
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
                      Have an account? <Link className={styles.signUpLink} href="/login">Log In</Link>
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

export default Register;