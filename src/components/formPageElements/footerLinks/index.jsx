import React from 'react';
import styles from "./footerLinks.module.css";
import Link from "next/link";

const FooterLinks = ({children}) => {
    return (
        <div className={styles.footerLink}>
            {children}
            <div className={styles.copyRight}>
                <span><Link href="#">RDD, Inc.</Link></span>
                <span><Link href="#">Contact</Link></span>
                <span><Link href="#">Privacy & Terms</Link></span>
            </div>
        </div>
    )
}

export default FooterLinks;