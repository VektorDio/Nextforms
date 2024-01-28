import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/forms/textInput";
import {signOut, useSession} from "next-auth/react";
import {useDeleteUserById, useGetUserById, useUpdateUser} from "@/queries/users";
import {useRouter} from "next/router";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import SimpleButton from "@/components/buttons/simpleButton";

const ProfileColumn = () => {
    const {data:session} = useSession()
    const [editGeneral, setEditGeneral] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const router = useRouter()

    const {mutateAsync:updateUser, isLoading:isUpdating} = useUpdateUser()
    const {mutateAsync:deleteUser} = useDeleteUserById()
    
    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/

    const {id} = session.user

    const {error, data, isLoading} = useGetUserById({
        userId: id,
    })

    if (isLoading || isUpdating) return (
        <div className={styles.container}>
            <LoadingMessage/>
        </div>
    )
    if (error) return (
        <div className={styles.container}>
            <ErrorMessage error={error}/>
        </div>
    )

    const {firstName, lastName, phoneNumber, email, password} = data.user
    
    async function handleUserDelete() {
        router.push("/")
        await signOut()
        await deleteUser({
            userId: id
        })
    }

    const generalSchema = Yup.object({
        firstName: Yup.string()
            .max(30),
        lastName: Yup.string()
            .max(30),
        phoneNumber: Yup.string()
            .matches(phoneRegex, "Wrong phone number")
            .max(20),
    })

    const generalInitialValues = {
        firstName: firstName ? firstName : "",
        lastName: lastName ? lastName : "",
        phoneNumber: phoneNumber ? phoneNumber : "",
    }

    async function onGeneralSubmit(values, setSubmitting) {
        const { firstName, lastName, phoneNumber } = values

        await updateUser({
            id:id,
            firstName:firstName,
            lastName:lastName,
            phoneNumber:phoneNumber,
        })

        setSubmitting(false)
    }

    const emailSchema = Yup.object({
        email: Yup.string().email('Not a valid email address')
    })

    const emailInitialValues = {
        email: email ? email : "",
    }

    async function onEmailSubmit(values, setSubmitting) {
        const {email} = values

        await updateUser({
            id: id,
            email:email,
        })

        setSubmitting(false)
    }

    const passwordYup = Yup.string()
        .matches(/[^\s-]/, "No whitespaces allowed")
        .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Only english letters allowed")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .min(8, 'Password must be 8 characters long')
        .max(150, "Password is too long")
        .required('Required')

    const passwordSchema = Yup.object({
        currentPassword: passwordYup,
        newPassword: passwordYup,
        confirmNewPassword: passwordYup
    })

    const passwordInitialValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    async function onPasswordSubmit(values, setSubmitting) {
        const {currentPassword, newPassword} = values

        if (password === currentPassword) { //!??
            await updateUser({
                id: id,
                password: newPassword,
            })
        }

        setSubmitting(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <div className={styles.generalBlock}>
                    <Formik
                        initialValues={generalInitialValues}
                        validationSchema={generalSchema}
                        onSubmit={async (values, {setSubmitting}) => onGeneralSubmit(values, setSubmitting)}
                        validateOnBlur={false}
                    >
                    {(formik) => (
                        <Form>
                            <div className={styles.generalInfo}>
                                <p>General info</p>
                                {(editGeneral) ? (
                                    <div className={styles.buttonGroup}>
                                        <SimpleButton onClick={() => {
                                            if (formik.isValid) {
                                                formik.handleSubmit()
                                                setEditGeneral(false)
                                            }}}
                                            iconType={"check"}
                                            bgColor={"#399412"}
                                        />

                                        <SimpleButton onClick={() => {
                                            setEditGeneral(false)
                                            formik.resetForm()}}
                                            iconType={"xmark"}
                                            bgColor={"#d00c0c"}
                                        />
                                    </div>
                                ) : (
                                    <SimpleButton onClick={() => {
                                        setEditGeneral(true)
                                        formik.resetForm()}}
                                        iconType={"redact"}
                                        bgColor={"#3a4556"}
                                    />
                                )}
                            </div>

                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Name</label>
                                    {(editGeneral) ? (
                                        <MyTextInput
                                            name="firstName"
                                            type="firstName"
                                        />
                                    ) : (
                                        <div className={styles.centeredText}>{firstName}</div>
                                    )}
                                </div>
                                <div className={styles.field}>
                                    <label>Last Name</label>
                                    {(editGeneral) ? (
                                        <MyTextInput
                                            name="lastName"
                                            type="lastName"
                                        />
                                    ) : (
                                        <div className={styles.centeredText}>{lastName}</div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Phone</label>
                                    {(editGeneral) ? (
                                        <MyTextInput
                                            name="phoneNumber"
                                            type="phoneNumber"
                                        />
                                    ) : (
                                        <div className={styles.centeredText}>{phoneNumber}</div>
                                    )}
                                </div>
                            </div>

                        </Form>
                        )}
                    </Formik>
                </div>
                <div className={styles.generalBlock}>
                    <Formik
                        initialValues={emailInitialValues}
                        validationSchema={emailSchema}
                        onSubmit={async (values, {setSubmitting}) => onEmailSubmit(values, setSubmitting)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.generalInfo}>
                                <p>Credentials</p>
                                {(editEmail) ? (
                                    <div className={styles.buttonGroup}>
                                        <SimpleButton onClick={() => {
                                            if (formik.isValid) {
                                                formik.handleSubmit()
                                                setEditEmail(false)
                                            }}}
                                            iconType={"check"}
                                            bgColor={"#399412"}
                                        />

                                        <SimpleButton onClick={() => {
                                            setEditEmail(false)
                                            formik.resetForm()}}
                                            iconType={"xmark"}
                                            bgColor={"#d00c0c"}
                                        />
                                    </div>
                                ) : (
                                    <SimpleButton onClick={() => {
                                        setEditEmail(true)
                                        formik.resetForm()}}
                                        iconType={"redact"}
                                        bgColor={"#3a4556"}
                                    />
                                )}
                            </div>
                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Primary Email</label>
                                    {(editEmail) ? (
                                        <MyTextInput
                                            type="email"
                                            name="email"
                                        />
                                    ) : (
                                        <div className={styles.centeredText}>{email}</div>
                                    )}
                                </div>
                            </div>
                        </Form>
                        )}
                    </Formik>
                </div>

                <div className={styles.generalBlock}>
                    <Formik
                        initialValues={passwordInitialValues}
                        validationSchema={passwordSchema}
                        onSubmit={async (values, {setSubmitting}) => onPasswordSubmit(values, setSubmitting)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.generalInfo}>
                                <p>Password</p>
                                {(editPassword) ? (
                                    <div className={styles.buttonGroup}>
                                        <SimpleButton onClick={() => {
                                            if (formik.isValid) {
                                                formik.handleSubmit()
                                                setEditPassword(false)
                                            }}}
                                            iconType={"check"}
                                            bgColor={"#399412"}
                                        />

                                        <SimpleButton onClick={() => {
                                            setEditPassword(false)
                                            formik.resetForm()}}
                                            iconType={"xmark"}
                                            bgColor={"#d00c0c"}
                                        />
                                    </div>
                                ) : (
                                    <SimpleButton onClick={() => {
                                        setEditPassword(true)
                                        formik.resetForm()
                                    }}
                                    iconType={"redact"}
                                    bgColor={"#3a4556"}
                                    />
                                )}
                            </div>
                            {(editPassword) ? (
                                <>
                                    <div className={styles.inputFieldsContainer}>
                                        <div className={styles.field}>
                                            <label>Old password</label>
                                            <MyTextInput
                                                name="currentPassword"
                                                type="password"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputFieldsContainer}>
                                        <div className={styles.field}>
                                            <label>New password</label>
                                            <MyTextInput
                                                name="newPassword"
                                                type="password"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputFieldsContainer}>
                                        <div className={styles.field}>
                                            <label>Confirm new password</label>
                                            <MyTextInput
                                                name="confirmNewPassword"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.field}>
                                    <div className={styles.centeredText}>Change your password</div>
                                </div>
                            )}
                        </Form>
                    )}
                    </Formik>
                </div>

                <div className={styles.buttonGroup}>
                    <SimpleButton onClick={handleUserDelete} iconType={"xmark"} bgColor={"#d00c0c"}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileColumn;