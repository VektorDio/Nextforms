import styles from "./constructorHeader.module.css"
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";

export default function ConstructorHeader({onReportSubmit}) {
    return (
        <div className={styles.sideBlock}>
            {
                (onReportSubmit) && <SimpleButton onClick={onReportSubmit} iconType={"check"} bgColor={"#399412"}/>
            }
            <Link href={"/home"}>
                <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
            </Link>
        </div>
    )
}