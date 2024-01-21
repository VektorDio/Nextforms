import styles from "./constructorHeader.module.css"
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";
import {useRouter} from "next/router";

export default function ConstructorHeader({onReportSubmit}) {
    const router = useRouter()
    return (
        <div className={styles.sideBlock}>
            {
                (onReportSubmit) && <SimpleButton onClick={onReportSubmit} iconType={"check"} bgColor={"#399412"}/>
            }
            <SimpleButton onClick={() => router.back()} iconType={"xmark"} bgColor={"#d00c0c"}/>
        </div>
    )
}