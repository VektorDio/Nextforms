import styles from "./constructorHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";

export default function ConstructorHeader({onReportSubmit}) {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>

            <div className={styles.sideBlock}>
                <SimpleButton onClick={onReportSubmit} iconType={"check"} bgColor={"#399412"}/>
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </div>
    )
}