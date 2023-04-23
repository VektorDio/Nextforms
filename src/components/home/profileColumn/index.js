import React, {useState} from 'react';
import styles from './profileColumn.module.css'
import ReductButton from "@/components/buttons/reductButton";
import DeleteButton from "@/components/buttons/deleteButton";

const ProfileColumn = () => {
    const [editLastName, setEditLastName] = useState(false)
    const firstName = "testName"

    return (
        <div className={styles.profileContainer}>
            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>General Info</p>
                    <ReductButton></ReductButton>
                </div>
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>First Name</label>
                        <input type="firstName" name="firstName"/>
                    </div>

                    <div className={styles.field}>
                        <label>Last Name</label>
                        <input type="lastName" name="lastName"/>
                    </div>
                </div>
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Phone</label>
                        <input type="lastName" name="lastName"/>
                    </div>
                </div>
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Organisation</label>
                        <input type="organisation" name="organisation"/>
                    </div>
                </div>
            </div>

            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>Email Address</p>
                    <ReductButton></ReductButton>
                </div>
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.field}>
                        <label>Email</label>
                        <input type="email" name="email"/>
                    </div>
                </div>
            </div>

            <div className={styles.generalBlock}>
                <div className={styles.generalInfo}>
                    <p>Password</p>
                    <ReductButton></ReductButton>
                </div>
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
            </div>

            <div className={styles.buttonGroup}>
                <DeleteButton></DeleteButton>
            </div>
        </div>
    );
};

export default ProfileColumn;