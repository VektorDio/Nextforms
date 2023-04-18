import React from 'react';
import Link from "next/link";
import styles from "./Login.module.css"
const LoginForm = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.siteName}>
                <h1>
                    <Link href="/" rel="dofollow">ReportGenerator.js</Link>
                </h1>
            </div>
            <div className={styles.formBody}>
                <span className={styles.signInText}>Sign in to your account</span>
                <form id="stripe-login">
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                    </div>
                    <div className={styles.field}>
                        <div className={styles.passwordGrid}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.resetPass}>
                                <Link className={styles.resetPassText} href="#">Forgot your password?</Link>
                            </div>
                        </div>
                        <input type="password" name="password"/>
                    </div>

                        <div className={styles.fieldCheckbox}>
                            <label htmlFor="checkbox">
                                <input type="checkbox" name="checkbox"/>
                                <div className={styles.checkBoxText}>Stay signed in</div>
                            </label>
                        </div>

                    <div className={styles.field}>
                        <input type="submit" name="submit" value="Continue"/>
                    </div>

                    <div className={styles.ssolink}>
                        <Link href="#">Use Google instead</Link>
                    </div>
                </form>
            </div>
            <div className={styles.footerLink}>
                    <span className={styles.footerText}>
                      Don`t have an account? <Link className={styles.signUpLink} href="">Sign up</Link>
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

export default LoginForm;