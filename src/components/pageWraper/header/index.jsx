import styles from "./Header.module.css"
import Icon from "@/components/icon";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
// import SettingsButton from "@/components/buttons/settingsButton";
import SignInButton from "@/components/buttons/signInButton";
import SignUpButton from "@/components/buttons/signUpButton";
import SimpleButton from "@/components/buttons/simpleButton";

export default function Header() {
    const {status} = useSession()

    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>
            {
                (status === "authenticated") ? (
                    <div className={styles.sideBlock}>
                        {/*<SettingsButton/>*/}
                        <SimpleButton onClick={signOut} iconType={"arrowRight"} bgColor={"red"}/>
                    </div>
                ):(
                    <div className={styles.sideBlock}>
                        <Link href={"/login"}>
                            <SignInButton/>
                        </Link>
                        <Link href={"/register"}>
                            <SignUpButton/>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}