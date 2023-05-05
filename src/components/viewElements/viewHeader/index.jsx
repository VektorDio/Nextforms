import styles from "./viewHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import ConfirmButton from "@/components/buttons/confirmButton";
import DeleteButton from "@/components/buttons/deleteButton";
import {useFormikContext} from "formik";
// import SettingsButton from "@/components/buttons/settingsButton";

export default function ViewHeader({id}) {

    const {submitForm} = useFormikContext();
    function handleFormSubmit() {
        submitForm()
        console.log(id)
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
                <ConfirmButton onClick={handleFormSubmit}></ConfirmButton>
                <Link href={"/home"}>
                    <DeleteButton></DeleteButton>
                </Link>
            </div>
        </div>
    )
}