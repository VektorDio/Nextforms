import React from 'react';
import Link from "next/link";
import styles from "./registerForm.module.css"
const RegisterForm = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.siteName}>
                <h1>
                    <Link href="/" rel="dofollow">ReportGenerator.js</Link>
                </h1>
            </div>
            <div className={styles.formBody}>
                <span className={styles.signInText}>Register your account</span>
                <form id="stripe-login">

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Confirm password</label>
                        <input type="password" name="password"/>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Organisation</label>
                        <input type="organisation" name="organisation"/>
                    </div>

                    <div className={styles.registerButton}>
                        <div className={styles.field}>
                            <input type="submit" name="submit" value="Register"/>
                        </div>
                    </div>

                    <div className={styles.ssolink}>
                        <Link href="#">Use Google instead</Link>
                    </div>
                </form>
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