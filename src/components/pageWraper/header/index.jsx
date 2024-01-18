import styles from "./Header.module.css"
import Icon from "@/components/icon";

export default function Header({children, movable=false}) {
    return (
        <div className={(movable) ? styles.movableHeader : styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>
            {children}
        </div>
    )
}