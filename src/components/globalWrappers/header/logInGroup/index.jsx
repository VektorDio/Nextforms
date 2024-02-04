import React from 'react';
import styles from "./logInGroup.module.css";
import SimpleButton from "@/components/buttons/simpleButton";
import {signOut} from "next-auth/react";
import Link from "next/link";
import SignInButton from "@/components/buttons/signInButton";
import SignUpButton from "@/components/buttons/signUpButton";

const LogInGroup = ({authenticated}) => {
    return (authenticated) ? (
        <div className={styles.singleSideBlock}>
            {/*<SettingsButton/>*/}
            <SimpleButton onClick={() => signOut({ callbackUrl: "/" })} iconType={"arrowRight"} bgColor={"red"} ariaLabel={"Sign Out"}/>
        </div>
    ):(
        <>
            <div className={styles.sideBlock}>
                <Link href={"/login"}>
                    <SignInButton ariaLabel={"Sign In"}/>
                </Link>
                <Link href={"/register"}>
                    <SignUpButton ariaLabel={"Sign Up"}/>
                </Link>
            </div>
        </>
    )
};

export default LogInGroup;