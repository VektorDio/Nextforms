import styles from "./Footer.module.css"
export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.copyrightText}>
                ©2025 RDD, Inc.
            </div>
            <div className={styles.copyrightText}>
                Google
            </div>
            <div className={styles.copyrightText}>
                Facebook
            </div>
            <div className={styles.copyrightText}>
                Instagram
            </div>
            <div className={styles.copyrightText}>
                Twitter
            </div>
        </div>
    )
}