import styles from "./constructorHeader.module.css"
import Icon from "@/components/icon";
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";

export default function ConstructorHeader({onReportSubmit}) {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>

            <div className={styles.sideBlock}>
                {
                    (onReportSubmit) && <SimpleButton onClick={onReportSubmit} iconType={"check"} bgColor={"#399412"}/>
                }
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </div>
    )
}