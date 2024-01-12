import styles from "./Header.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
// import SettingsButton from "@/components/buttons/settingsButton";
import SignInButton from "@/components/buttons/signInButton";
import LogOutButton from "@/components/buttons/logOutButton";
import SignUpButton from "@/components/buttons/signUpButton";

export default function Header() {
    const {status} = useSession()

    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>
            {
                (status === "authenticated") ? (
                    <div className={styles.sideBlock}>
                        {/*<SettingsButton/>*/}
                        <LogOutButton onClick={signOut}/>
                    </div>
                ):(
                    <div className={styles.sideBlock}>
                        <Link href={"/login"}>
                            <SignInButton>Log In</SignInButton>
                        </Link>
                        <Link href={"/register"}>
                            <SignUpButton>Register</SignUpButton>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}