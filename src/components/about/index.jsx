import styles from "./About.module.css"

export default function About() {
    return (
        <div className={styles.about}>
            <h1>Про нас </h1>
            <p>Reports Generator - автоматична генерація звітів для благодійних організацій.</p>
            <p>Застосунок забезпечує збір інформації в реальному часі для подальшої генерації звітів,</p>
            <p>що використовуються благодійними організаціями в процесі імплементації проєктів.</p>
        </div>
    )
}