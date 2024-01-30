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
    const {mutateAsync: adduser} = useAddUser()

    if (status === "authenticated") {
        router.push("/home")
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    async function handleSubmit(values) {
        const { email, password } = values

        try {
            await adduser({
                email: email,
                password: password,
            })
        } catch (e){
            setSubmissionError(e.message)
        }

        const { ok, error } = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })

        if (ok) {
            router.push("/home")
        } else {
            setSubmissionError(error)
            values.setSubmitting(false);
        }
    }

    const registerSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .max(30, 'This email is too long'),
        password: Yup.string()
            .matches(/[^\s-]/, "No whitespaces allowed")
            .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Only english letters allowed")
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .min(8, 'Password must be 8 characters long')
            .max(150, "Password is too long")
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Must match "Password" field value')
            .required('Required'),
    })

    const registerInitialValues = {
        email: '',
        password: '',
        confirmPassword: '',
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
                        <h1>NextForms</h1>
                    </Link>
                </div>
                <div className={styles.formBody}>
                    <span className={styles.signInText}>Register new account</span>
                    <Formik
                        initialValues={registerInitialValues}
                        validationSchema={registerSchema}
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
                        </Form>
                    )}
                    </Formik>
                </div>
                <div className={styles.footerLink}>
                <span className={styles.footerText}>
                      Have an account? <Link className={styles.signUpLink} href="/login">Log In</Link>
                    </span>
                    <div className={styles.copyRight}>
                        <span><Link href="#">RDD, Inc.</Link></span>
                        <span><Link href="#">Contact</Link></span>
                        <span><Link href="#">Privacy & Terms</Link></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;