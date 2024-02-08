import styles from "./constructorHeader.module.css"
import SimpleButton from "@/components/buttons/simpleButton";
import {useRouter} from "next/router";

export default function ConstructorHeader({onFormSubmit, children}) {
    const router = useRouter()

    return (
        <>
            <div className={styles.centerBlock}>
                {children}
            </div>

            <div className={styles.sideBlock}>
                {
                    (onFormSubmit) && <SimpleButton onClick={onFormSubmit}
                                                    iconType={"check"}
                                                    bgColor={"#399412"}
                                                    adaptive={true}
                                                    ariaLabel={"Confirm changes"}
                    />
                }
                <SimpleButton onClick={() => router.push("/home/forms?page=1")}
                              iconType={"xmark"}
                              bgColor={"#d00c0c"}
                              adaptive={true}
                              ariaLabel={"Cancel changes"}
                />
            </div>
        </>
    )
}