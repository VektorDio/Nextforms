import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import RedactButton from "@/components/buttons/redactButton";
import DeleteButton from "@/components/buttons/deleteButton";
import ConfirmButton from "@/components/buttons/confirmButton";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/forms/textInput";
import {signOut, useSession} from "next-auth/react";
import {useDeleteUserById, useGetUserById, useUpdateUser} from "@/queries/users";
import {useRouter} from "next/router";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";

const Profile = () => {
    const {data:session} = useSession({
        required: true,
    })

    const [editGeneral, setEditGeneral] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const router = useRouter()

    const {mutateAsync:updateUser, isLoading:isUpdating} = useUpdateUser()
    const {mutateAsync:deleteUser} = useDeleteUserById()
    
    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/

    const {id} = session.user

    const {error, data, isFetching} = useGetUserById({
        id: id,
    })

    if (isFetching || isUpdating) return (
        <div className={styles.container}>
            <LoadingMessage/>
        </div>
    )
    if (error) return (
        <div className={styles.container}>
            <ErrorMessage error={error}/>
        </div>
    )

    const {firstName, lastName, phoneNumber, email, organisation, password} = data.user
    
    async function handleUserDelete() {
        await router.push("/")
        await signOut()
        await deleteUser({
            id: id
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <div className={styles.generalBlock}>
                    <Formik initialValues={{
                        firstName: firstName ? firstName : "",
                        lastName: lastName ? lastName : "",
                        phone: phoneNumber ? phoneNumber : "",
                        organisation: organisation ? organisation : ""
                    }}
                            validationSchema={Yup.object({
                                firstName: Yup.string()
                                    .max(20),
                                lastName: Yup.string()
                                    .max(20),
                                phone: Yup.string()
                                    .matches(phoneRegex, "Wrong phone number")
                                    .max(20),
                                organisation: Yup.string()
                                    .max(20)
                            })}
                            onSubmit={async (values, {setSubmitting}) => {
                                const {firstName, lastName, phoneNumber, organisation} = values

                                await updateUser({
                                    id:id,
                                    firstName:firstName,
                                    lastName:lastName,
                                    phoneNumber:phoneNumber,
                                    organisation:organisation
                                })

                                setSubmitting(false);
                            }}
                            validateOnBlur={false}>
                        {(formik) => (
                            <Form>
                                <div className={styles.generalInfo}>
                                    <p>General info</p>
                                    {(editGeneral) ? (
                                            <div className={styles.buttonGroup}>
                                                <ConfirmButton onClick={() => {
                                                    formik.handleSubmit()
                                                    setEditGeneral(false)
                                                }}></ConfirmButton>
                                                <DeleteButton onClick={() => {
                                                    setEditGeneral(!editGeneral)
                                                    formik.resetForm()
                                                }}></DeleteButton>
                                            </div>
                                        ) : (
                                            <RedactButton onClick={() => {
                                                setEditGeneral(!editGeneral)
                                                formik.resetForm()
                                            }}></RedactButton>
                                        )
                                    }
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
                                                    name="phone"
                                                    type="phone"
                                                />
                                            ) : (
                                                <div className={styles.centeredText}>{phoneNumber}</div>
                                            )}
                                    </div>
                                </div>

                                <div className={styles.inputFieldsContainer}>
                                    <div className={styles.field}>
                                        <label>Organization</label>
                                        {(editGeneral) ? (
                                                <MyTextInput
                                                    name="organisation"
                                                    type="organisation"
                                                />
                                            ) : (
                                                <div className={styles.centeredText}>{organisation}</div>
                                            )}
                                    </div>
                                </div>
                            </Form>
                            )}
                    </Formik>
                </div>
                <div className={styles.generalBlock}>
                    <Formik initialValues={{
                        email: email ? email : "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email()
                    })}
                    onSubmit={async (values, {setSubmitting}) => {
                        const {email} = values

                        await updateUser({
                            id: id,
                            email:email,
                        })

                        setSubmitting(false);
                    }}
                    validateOnBlur={false}>
                        {(formik) => (
                            <Form>
                                <div className={styles.generalInfo}>
                                    <p>Email</p>
                                    {(editEmail) ? (
                                            <div className={styles.buttonGroup}>
                                                <ConfirmButton onClick={() => {
                                                    formik.handleSubmit()
                                                    setEditEmail(false)
                                                }}></ConfirmButton>
                                                <DeleteButton onClick={() => {
                                                    setEditEmail(!editEmail)
                                                    formik.resetForm()
                                                }}></DeleteButton>
                                            </div>
                                        ) : (
                                            <RedactButton onClick={() => {
                                                setEditEmail(!editEmail)
                                                formik.resetForm()
                                            }}></RedactButton>
                                        )}
                                </div>
                                <div className={styles.inputFieldsContainer}>
                                    <div className={styles.field}>
                                        <label>Email</label>
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
                    <Formik initialValues={{
                        currentPassword: '',
                        newPassword: '',
                    }}
                    validationSchema={Yup.object({
                        currentPassword: Yup.string()
                            .min(8, 'Password must be 8 characters long')
                            .matches(/[0-9]/, 'Password requires a number')
                            .matches(/[a-z]/, 'Password requires a lowercase letter')
                            .matches(/[A-Z]/, 'Password requires an uppercase letter')
                            .required('Required'),
                        newPassword: Yup.string()
                            .min(8, 'Password must be 8 characters long')
                            .matches(/[0-9]/, 'Password requires a number')
                            .matches(/[a-z]/, 'Password requires a lowercase letter')
                            .matches(/[A-Z]/, 'Password requires an uppercase letter')
                            .required('Required'),
                    })}
                    onSubmit={async (values, {setSubmitting}) => {
                        const {currentPassword, newPassword} = values

                        if (password === currentPassword) {
                            await updateUser({
                                id: id,
                                password: newPassword,
                            })
                        }

                        setSubmitting(false);
                    }}
                    validateOnBlur={false}>
                        {(formik) => (
                            <Form>
                                <div className={styles.generalInfo}>
                                    <p>Password</p>
                                    {(editPassword) ? (
                                            <div className={styles.buttonGroup}>
                                                <ConfirmButton onClick={()=>{
                                                    formik.handleSubmit()
                                                    setEditPassword(false)
                                                }}></ConfirmButton>
                                                <DeleteButton onClick={() => {
                                                    setEditPassword(!editPassword)
                                                    formik.resetForm()
                                                }}></DeleteButton>
                                            </div>
                                        ) : (
                                            <RedactButton onClick={() => {
                                                setEditPassword(!editPassword)
                                                formik.resetForm()
                                            }}></RedactButton>
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
                                    </>
                                ) : (
                                    <div className={styles.field}>
                                        <div className={styles.centeredText}>Forgot your password?</div>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={styles.buttonGroup}>
                    <DeleteButton onClick={handleUserDelete}></DeleteButton>
                </div>
            </div>
        </div>
    );
};

export default Profile;