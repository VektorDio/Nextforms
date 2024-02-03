import styles from "./Header.module.css"
import Icon from "@/components/icon";
import classNames from "classnames";

export default function Header({children, movable=false, early=false}) {

    return (
        <div className={classNames(styles.header, (movable) && styles.movableHeader, (early) && styles.headerEarly)}>
            <div className={classNames(styles.iconBlock, (early) && styles.iconBlockEarly )}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>
            {children}
        </div>
    )
}