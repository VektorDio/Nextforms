import styles from "./Icon.module.css"
import Link from "next/link";
import Image from "next/image";

export default function Icon() {
    return (
        <Link href={"/"} className={styles.link}>
            <Image
                width={32}
                height={32}
                src="/favicon.ico"
                alt="test">
            </Image>
        </Link>
    )
}