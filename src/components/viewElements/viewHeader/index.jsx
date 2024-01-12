import styles from "./viewHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import ConfirmButton from "@/components/buttons/confirmButton";
import DeleteButton from "@/components/buttons/deleteButton";
import {useFormikContext} from "formik";

export default function ViewHeader() {
    const {submitForm} = useFormikContext();
    function onSubmit() {
        submitForm()
    }

    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon></Icon>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>

            <div className={styles.sideBlock}>
                <ConfirmButton onClick={onSubmit}></ConfirmButton>
                <Link href={"/home"}>
                    <DeleteButton/>
                </Link>
            </div>
        </div>
    )
}