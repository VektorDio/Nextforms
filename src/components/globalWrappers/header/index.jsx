import styles from "./Header.module.css"
import Icon from "@/components/icon";
import classNames from "classnames";

export default function Header({children, movable=false}) {

    return (
        <div className={classNames(styles.header, (movable) && styles.movableHeader)}>
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