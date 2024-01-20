import styles from "./Main.module.css"

export default function Main({children, onClick}) {
    return (
        <div className={styles.main} onDoubleClick={onClick}>
            {children}
        </div>
    )
}
