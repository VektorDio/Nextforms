import styles from "./viewHeader.module.css"
import Icon from "@/components/icon";
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";
import {useFormikContext} from "formik";

export default function ViewHeader() {
    const {submitForm} = useFormikContext();

    function onSubmit() {
        submitForm()
    }

    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>

            <div className={styles.sideBlock}>
                <SimpleButton onClick={onSubmit} iconType={"check"} bgColor={"#399412"}/>
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </div>
    )
}