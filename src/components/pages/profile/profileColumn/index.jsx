import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/formikFields/textInput";
import {signOut, useSession} from "next-auth/react";
import {useDeleteUserById, useGetUserById, useUpdateUser} from "@/queries/users";
import {useRouter} from "next/router";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import SimpleButton from "@/components/buttons/simpleButton";
import DeleteAccountButton from "@/components/buttons/deleteAccountButton";
import SimpleMessage from "@/components/messages/simpleMessage";

const ProfileColumn = () => {
    const router = useRouter()
    const {data:session} = useSession()
    const {id: userId} = session.user

    const {mutateAsync:updateUser, isLoading:isUpdating, error:updatingError} = useUpdateUser()
    const {mutateAsync:deleteUser, error:deleteError} = useDeleteUserById()
    const {error:updateError, data, isLoading} = useGetUserById({
        userId: userId,
    })

    const [editGeneral, setEditGeneral] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [editDelete, setEditDelete] = useState(false)

    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/

    if (isLoading || isUpdating) return (
        <div className={styles.container}>
            <LoadingMessage/>
        </div>
    )

    if (updateError || updatingError || deleteError) return (
        <div className={styles.container}>
            <ErrorMessage error={updateError?.message || updatingError?.message || deleteError?.message}/>
        </div>
    )

    if (data.user === null) return (
        <div className={styles.container}>
            <SimpleMessage>There no such user.</SimpleMessage>
        </div>
    )

    const { firstName, lastName, phoneNumber, email, secondaryEmail } = data.user

    const generalSchema = Yup.object({
        firstName: Yup.string()
            .max(30, "This name is too long"),
        lastName: Yup.string()
            .max(30, "This name is too long"),
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
            id:userId,
            firstName:firstName,
            lastName:lastName,
            phoneNumber:phoneNumber,
        })

        setSubmitting(false)
    }

    const emailSchema = Yup.object({
        email: Yup.string().email('Not a valid email address'),
        secondaryEmail: Yup.string().email('Not a valid email address')
    })

    const emailInitialValues = {
        email: email ? email : "",
        secondaryEmail: secondaryEmail ? secondaryEmail : ""
    }

    async function onEmailSubmit(values, setSubmitting) {
        const {email, secondaryEmail} = values

        await updateUser({
            id: userId,
            email:email,
            secondaryEmail: secondaryEmail
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
        const {currentPassword, newPassword, confirmNewPassword} = values

        if (newPassword === confirmNewPassword) {
            await updateUser({
                id: userId,
                password: currentPassword,
                newPassword: newPassword
            })
        }

        setSubmitting(false)
    }

    const deleteSchema = Yup.object({
        password: passwordYup,
        email: Yup.string().email('Not a valid email address'),
    })

    const deleteInitialValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    async function onDeleteSubmit(values, setSubmitting) {
        const { email, password } = values

        await deleteUser({
            userId: userId,
            email: email,
            password: password
        }, {
            onSuccess() {
                router.push("/")
                signOut()
            }
        })

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
                                <p>Emails</p>
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
                                    <div className={styles.centeredText}>{email}</div>
                                </div>
                            </div>

                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Secondary Email</label>
                                    {(editEmail) ? (
                                        <MyTextInput
                                            type="email"
                                            name="secondaryEmail"
                                        />
                                    ) : (
                                        <div className={styles.centeredText}>{secondaryEmail}</div>
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
                                <p>Change your password</p>
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
                            ) : (<></>)}
                        </Form>
                    )}
                    </Formik>
                </div>

                <div className={styles.generalBlock}>
                    <Formik
                        initialValues={deleteInitialValues}
                        validationSchema={deleteSchema}
                        onSubmit={async (values, {setSubmitting}) => onDeleteSubmit(values, setSubmitting)}
                        validateOnBlur={false}
                    >{(formik) => (
                        <Form>
                            <div className={styles.deleteInfo}>
                                <p>Delete account</p>
                            </div>
                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Once you delete your account, there is no going back. Please be certain.</label>
                                    {
                                        (!editDelete) && (
                                            <DeleteAccountButton onClick={() => {
                                                setEditDelete(true)
                                                formik.resetForm()
                                            }} bgColor={""}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                                {
                                    (editDelete) && (
                                        <>
                                            <div className={styles.inputFieldsContainer}>
                                                <div className={styles.field}>
                                                    <label>Email</label>
                                                    <MyTextInput
                                                        name="email"
                                                        type="email"
                                                    />
                                                </div>
                                            </div>

                                            <div className={styles.inputFieldsContainer}>
                                                <div className={styles.field}>
                                                    <label>Password</label>
                                                    <MyTextInput
                                                        name="password"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>

                                            <div className={styles.inputFieldsContainer}>
                                                <div className={styles.field}>
                                                    <DeleteAccountButton onClick={() => {
                                                        if (formik.isValid) {
                                                            formik.handleSubmit()
                                                            setEditDelete(false)
                                                        }}} bgColor={""}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ProfileColumn;