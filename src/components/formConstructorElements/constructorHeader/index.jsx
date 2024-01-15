import styles from "./constructorHeader.module.css"
import Icon from "@/components/icon";
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";
// import SettingsButton from "@/components/buttons/settingsButton";

export default function ConstructorHeader({id, onFormSubmit}) {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>

            <div className={styles.centerBlock}>
                {
                    (id) ? (
                        <>
                            <Link href={`/home/formConstructor/redact/${id}`}>
                                <SimpleButton iconType={"redact"} bgColor={"#3a4556"}/>
                            </Link>
                            <Link href={`/home/formConstructor/statistics/${id}`}>
                                <SimpleButton iconType={"report"} bgColor={"#3a4556"}/>
                            </Link>
                        </>
                    ) : (
                        <>
                            <SimpleButton iconType={"redact"} bgColor={"#3a4556"}/>
                            <SimpleButton iconType={"report"} bgColor={"#3a4556"}/>
                        </>
                    )
                }
                {/*<Link href={'/home'}>*/}
                {/*    <SettingsButton></SettingsButton>*/}
                {/*</Link>*/}
            </div>

            <div className={styles.sideBlock}>
                {
                    (onFormSubmit) && <SimpleButton onClick={onFormSubmit} iconType={"check"} bgColor={"#399412"}/>
                }
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </div>
    )
}