import styles from "./constructorHeader.module.css"
import Link from "next/link";
import SimpleButton from "@/components/buttons/simpleButton";
import {useRouter} from "next/router";

export default function ConstructorHeader({id, onFormSubmit}) {
    const router = useRouter()

    return (
        <>
            <div className={styles.centerBlock}>
                <Link href={(id) ? `/home/formConstructor/redact/${id}` : "#"} replace={true}>
                    <SimpleButton iconType={"redact"} bgColor={"#3a4556"}/>
                </Link>
                <Link href={(id) ? `/home/formConstructor/statistics/${id}` : "#"} replace={true}>
                    <SimpleButton iconType={"report"} bgColor={"#3a4556"}/>
                </Link>
            </div>

            <div className={styles.sideBlock}>
                {
                    (onFormSubmit) && <SimpleButton onClick={onFormSubmit} iconType={"check"} bgColor={"#399412"}/>
                }
                <SimpleButton onClick={() => router.back()} iconType={"xmark"} bgColor={"#d00c0c"}/>
            </div>
        </>
    )
}