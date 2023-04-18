import styles from "./Header.module.css"
import Icon from "@/components/icon";
import Link from "next/link";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon></Icon>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>
            <div className={styles.loginBlock}>
                <Link href={"/login"}>
                    <button className={styles.signInBtn}>
                        Sign In
                    </button>
                </Link>
                <Link href={"/register"}>
                    <button className={styles.signInBtn}>
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    )
}