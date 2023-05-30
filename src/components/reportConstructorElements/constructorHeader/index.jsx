import styles from "./constructorHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import ConfirmButton from "@/components/buttons/confirmButton";
import DeleteButton from "@/components/buttons/deleteButton";

export default function ConstructorHeader({onReportSubmit}) {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon></Icon>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>

            <div className={styles.sideBlock}>
                <ConfirmButton onClick={onReportSubmit}></ConfirmButton>
                <Link href={"/home"}>
                    <DeleteButton></DeleteButton>
                </Link>
            </div>
        </div>
    )
}