import React, {useState} from 'react';
import Link from "next/link";
import styles from "./registerForm.module.css"
import {Form, Formik, useField} from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <input {...field} {...props} className={(meta.touched && meta.error) ? styles.inputInvalid : null} />
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};
const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(true)
    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.siteName}>
                <h1>
                    <Link href="/" rel="dofollow">ReportGenerator.js</Link>
                </h1>
            </div>
            <div className={styles.formBody}>
                <span className={styles.signInText}>Register your account</span>
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
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                    validateOnBlur={false}
                >{(formik) => (
                    <Form>
                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="organisation">Organisation</label>
                            <MyTextInput
                                label="Organisation"
                                name="organisation"
                                type="text"
                                placeholder="My Organisation"
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
                                label="Password"
                                name="password"
                                type={(showPassword) ? "password" : "text"}
                                placeholder="********"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Confirm password</label>
                            <MyTextInput
                                label="confirmPassword"
                                name="confirmPassword"
                                type={(showPassword) ? "password" : "text"}
                                placeholder="********"
                            />
                        </div>


                        <div className={styles.field}>
                            <input type="submit" name="submit" value="Register" disabled={!(formik.isValid && formik.dirty)}/>
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
                      Have an account? <Link className={styles.signUpLink} href="/login">Sign in</Link>
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

export default RegisterForm;