import styles from "./constructorHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import ConfirmButton from "@/components/buttons/confirmButton";
import DeleteButton from "@/components/buttons/deleteButton";
import ReductButton from "@/components/buttons/reductButton";
import ReportButton from "@/components/buttons/reportButton";
import SettingsButton from "@/components/buttons/settingsButton";

export default function ConstructorHeader({formObject}) {

    function submitForm(){
        console.log(formObject)
    }

    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon></Icon>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>

            <div className={styles.centerBlock}>
                <Link href={"/home"}>
                    <ReductButton></ReductButton>
                </Link>
                <Link href={"/home"}>
                    <ReportButton></ReportButton>
                </Link>
                <Link href={'/home'}>
                    <SettingsButton></SettingsButton>
                </Link>
            </div>

            <div className={styles.sideBlock}>
                <ConfirmButton onClick={submitForm}></ConfirmButton>
                <Link href={"/home"}>
                    <DeleteButton></DeleteButton>
                </Link>
            </div>
        </div>
    )
}