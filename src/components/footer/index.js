import styles from "./Footer.module.css"
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.copyrightText}>
                ©2023 TEST, Inc.
            </div>
            <div className={styles.copyrightText}>
                Test
            </div>
            <div className={styles.copyrightText}>
                Test
            </div>
            <div className={styles.copyrightText}>
                Test
            </div>
            <div className={styles.copyrightText}>
                Test
            </div>
        </div>
    )
}