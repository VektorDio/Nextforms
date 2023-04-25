import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import RedactButton from "@/components/buttons/reductButton";
import DeleteButton from "@/components/buttons/deleteButton";
import ConfirmButton from "@/components/buttons/confirmButton";

const ProfileColumn = () => {
    const [editGeneral, setEditGeneral] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const firstName = "TestName"
    const lastName = "TestLastName"
    const phone = "(+000) - 000 - 000 - 000"
    const organisation = "TestOrganization"
    const email = "TestEmail@google.com"

    function handleGeneralInfoConfirm(){
        setEditGeneral(false)
    }

    function handleGeneralInfoDiscard(){
        setEditGeneral(false)
    }

    function handleGeneralInfoRedact(){
        setEditGeneral(true)
    }

    function handleEmailConfirm(){
        setEditEmail(false)
    }

    function handleEmailDiscard(){
        setEditEmail(false)
    }

    function handleEmailRedact(){
        setEditEmail(true)
    }


    function handlePasswordConfirm(){
        setEditPassword(false)
    }

    function handlePasswordDiscard(){
        setEditPassword(false)
    }

    function handlePasswordRedact(){
        setEditPassword(true)
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>General Info</p>
                    {
                        (editGeneral) ? (
                            <div className={styles.buttonGroup}>
                                <ConfirmButton onClick={handleGeneralInfoConfirm}></ConfirmButton>
                                <DeleteButton onClick={handleGeneralInfoDiscard}></DeleteButton>
                            </div>
                        ) : (
                            <RedactButton onClick={handleGeneralInfoRedact}></RedactButton>
                        )
                    }
                </div>

                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>First Name</label>
                        {
                            (editGeneral) ? (
                                <input type="firstName" name="firstName" defaultValue={firstName}/>
                            ) : (
                                <div className={styles.centeredText}>{firstName}</div>
                            )
                        }
                    </div>

                    <div className={styles.field}>
                        <label>Last Name</label>
                        {
                            (editGeneral) ? (
                                <input type="lastName" name="lastName" defaultValue={lastName}/>
                            ) : (
                                <div className={styles.centeredText}>{lastName}</div>
                            )
                        }

                    </div>
                </div>

                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Phone</label>
                        {
                            (editGeneral) ? (
                                <input type="phone" name="phone" defaultValue={phone}/>
                            ) : (
                                <div className={styles.centeredText}>{phone}</div>
                            )
                        }

                    </div>
                </div>

                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Organisation</label>
                        {
                            (editGeneral) ? (
                                <input type="organisation" name="organisation" defaultValue={organisation}/>
                            ) : (
                                <div className={styles.centeredText}>{organisation}</div>
                            )
                        }
                    </div>
                </div>

            </div>

            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>Email Address</p>
                    {
                        (editEmail) ? (
                            <div className={styles.buttonGroup}>
                                <ConfirmButton onClick={handleEmailConfirm}></ConfirmButton>
                                <DeleteButton onClick={handleEmailDiscard}></DeleteButton>
                            </div>
                        ) : (
                            <RedactButton onClick={handleEmailRedact}></RedactButton>
                        )
                    }

                </div>
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Email</label>
                        {
                            (editEmail) ? (
                                <input type="email" name="email" defaultValue={email}/>
                            ) : (
                                <div className={styles.centeredText}>{email}</div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>Password</p>
                    {
                        (editPassword) ? (
                            <div className={styles.buttonGroup}>
                                <ConfirmButton onClick={handlePasswordConfirm}></ConfirmButton>
                                <DeleteButton onClick={handlePasswordDiscard}></DeleteButton>
                            </div>
                        ) : (
                            <RedactButton onClick={handlePasswordRedact}></RedactButton>
                        )
                    }
                </div>
                {
                    (editPassword) ? (
                        <>
                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>Current Password</label>
                                    <input type="password" name="password"/>
                                </div>
                            </div>

                            <div className={styles.inputFieldsContainer}>
                                <div className={styles.field}>
                                    <label>New Password</label>
                                    <input type="password" name="password"/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.field}>
                            <div className={styles.centeredText}>Forgot password?</div>
                        </div>
                    )
                }
            </div>

            <div className={styles.buttonGroup}>
                <DeleteButton></DeleteButton>
            </div>
        </div>
    );
};

export default ProfileColumn;