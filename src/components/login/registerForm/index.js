import React, {useState} from 'react';
import Link from "next/link";
import styles from "./registerForm.module.css"
const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(true)
    const [passwordValidity, setPasswordValidity] = useState(true)
    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    function handlePasswordValidity(e){
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        let inputValue = e.target.value
        setPasswordValidity(false)
        if(!inputValue.match(lowerCaseLetters)) {
            setPasswordValidity(true)
        }
        // Validate capital letters
        if(!inputValue.match(upperCaseLetters)) {
            setPasswordValidity(true)
        }
        // Validate numbers
        if(!inputValue.match(numbers)) {
            setPasswordValidity(true)
        }
        // Validate length
        if(inputValue.length < 8) {
            setPasswordValidity(true)
        }
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
                <form id="stripe-login">

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.passwordGrid}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.showText} onClick={handleShowPassword}>
                                {(showPassword) ? "Show password" : "Hide password"}
                            </div>
                        </div>
                        <input
                            type={(showPassword) ? "password" : "text"}
                            name="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            onChange={handlePasswordValidity}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Confirm password</label>
                        <input
                            type={(showPassword) ? "password" : "text"}
                            name="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Organisation</label>
                        <input type="organisation" name="organisation"/>
                    </div>

                    <div className={styles.registerButton}>
                        <div className={styles.field}>
                            <input type="submit" name="submit" value="Register" disabled={passwordValidity}/>
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