import React, {useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import styles from "./registerForm.module.css";
import Link from "next/link";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/formikFields/textInput";
import SubmitButton from "@/components/inputFields/submitButton";
import {useAddUser} from "@/queries/users";
import FooterLinks from "@/components/formPageElements/footerLinks";
import FormContainer from "@/components/formPageElements/containerWithSiteName";
import ErrorMessage from "@/components/formPageElements/errorMessage";
import FormBody from "@/components/formPageElements/formBody";
import FormName from "@/components/formPageElements/formName";
import MetaHead from "@/components/metaHead";

const Register = () => {
    const router = useRouter()
    const [submissionError, setSubmissionError] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const {mutateAsync: adduser} = useAddUser()

    async function handleSubmit(values) {
        const { email, password } = values

        try {
            await adduser({
                email: email,
                password: password,
            })
        } catch (e){
            setSubmissionError(e.response.data.message)
        }

        const { ok, error } = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })

        if (ok) {
            await router.push("/home")
        } else {
            setSubmissionError(error)
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
            <MetaHead title={"Sign up | NextForms"} description={"Sign up page"}></MetaHead>
            <FormContainer>
                <FormBody>
                    <FormName>Register new account</FormName>
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
                                    <div className={styles.showText} onClick={() => setShowPassword(!showPassword)}>
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
                                <label htmlFor="password confirmation">Password confirmation</label>
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

                            <ErrorMessage>
                                {submissionError}
                            </ErrorMessage>
                        </Form>
                    )}
                    </Formik>
                </FormBody>
                <FooterLinks>
                    <span className={styles.footerText}>
                      Have an account? <Link className={styles.signUpLink} href="/login">Log In</Link>
                    </span>
                </FooterLinks>
            </FormContainer>
        </>
    )
}

export default Register