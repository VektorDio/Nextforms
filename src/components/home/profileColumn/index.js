import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import RedactButton from "@/components/buttons/reductButton";
import DeleteButton from "@/components/buttons/deleteButton";
import ConfirmButton from "@/components/buttons/confirmButton";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "@/components/forms/textInput";
import {signOut} from "next-auth/react";

const ProfileColumn = ({session}) => {
    const [editGeneral, setEditGeneral] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/

    const {firstName, lastName, phoneNumber, organisation, email} = session.user

    return (
        <div className={styles.profileContainer}>
            <div className={styles.generalBlock}>
                <Formik initialValues={{
                    firstName: firstName,
                    lastName: lastName,
                    phone: phoneNumber,
                    organisation: organisation
                }}
                        validationSchema={Yup.object({
                            firstName: Yup.string()
                                .max(20),
                            lastName: Yup.string()
                                .max(20),
                            phone: Yup.string()
                                .matches(phoneRegex, "Invalid phone number")
                                .max(20),
                            organisation: Yup.string()
                                .max(20)
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const {firstName, lastName, phone, organization} = values
                            setSubmitting(false);
                        }}
                        validateOnBlur={false}>
                    {(formik) => (
                        <Form>
                            <div className={styles.generalInfo}>
                                <p>General Info</p>
                                {(editGeneral) ? (
                                        <div className={styles.buttonGroup}>
                                            <ConfirmButton onClick={() => {
                                                formik.handleSubmit()
                                                setEditGeneral(false)
                                            }
                                            }></ConfirmButton>
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
                                    <label>First Name</label>
                                    {(editGeneral) ? (
                                            <MyTextInput
                                                name="firstName"
                                                type="firstName"
                                            />
                                        ) : (
                                            <div className={styles.centeredText}>{lastName}</div>
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
                                    <label>Phone Number</label>
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
                                    <label>Organisation</label>
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
                    email: email,
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email()
                })}
                onSubmit={(values, { setSubmitting }) => {
                    const {email} = values
                    setSubmitting(false);
                }}
                validateOnBlur={false}>
                    {(formik) => (
                        <Form>
                            <div className={styles.generalInfo}>
                                <p>Email Address</p>
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
                onSubmit={(values, { setSubmitting }) => {
                    const {currentPassword, newPassword} = values
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
                                            <label>Current Password</label>
                                            <MyTextInput
                                                name="currentPassword"
                                                type="password"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputFieldsContainer}>
                                        <div className={styles.field}>
                                            <label>New Password</label>
                                            <MyTextInput
                                                name="newPassword"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.field}>
                                    <div className={styles.centeredText}>Forgot password?</div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>

            <div className={styles.buttonGroup}>
                <DeleteButton onClick={signOut}></DeleteButton>
            </div>
        </div>
    );
};

export default ProfileColumn;