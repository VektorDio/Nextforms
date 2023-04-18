import styles from "./Header.module.css"
import Icon from "@/components/icon";

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
                <button className={styles.signInBtn}>
                    Sign Up
                </button>
                <button className={styles.signInBtn}>
                    Sign In
                </button>
            </div>
        </div>
    )
}