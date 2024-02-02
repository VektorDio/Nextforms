import React from 'react';
import styles from "./logInGroup.module.css";
import SimpleButton from "@/components/buttons/simpleButton";
import {signOut} from "next-auth/react";
import Link from "next/link";
import SignInButton from "@/components/buttons/signInButton";
import SignUpButton from "@/components/buttons/signUpButton";

const LogInGroup = ({authenticated}) => {
    return (authenticated) ? (
        <div className={styles.sideBlock}>
            {/*<SettingsButton/>*/}
            <SimpleButton onClick={() => signOut({ callbackUrl: "/" })} iconType={"arrowRight"} bgColor={"red"}/>
        </div>
    ):(
        <>
            <div className={styles.sideBlock}>
                <Link href={"/login"}>
                    <SignInButton/>
                </Link>
                <Link href={"/register"}>
                    <SignUpButton/>
                </Link>
            </div>
        </>
    )
};

export default LogInGroup;