import React from 'react';
import styles from './home.module.css'
import Link from "next/link";

const HomeColumn = () => {
    return (
        <div className={styles.mainColumn}>
            <div className={styles.textContainer}>
                <p className={styles.welcome}> Welcome to Nextforms! </p>
                <p> This app allows you to create and edit simple surveys online.
                    The collected information can be automatically entered into a report page and exported as PDF.
                </p>
                <p className={styles.headline}> Forms </p>
                <p> Add named blocks with different inputs and options to form suitable set of questions.
                    Use link to share this form with other people. Form should be enabled to accept answers.
                </p>
                <p className={styles.headline}> Statistics </p>
                <p> Statistics will show you amount of gathered answers per question and option. For text questions,
                    statistics will show whole submitted text. All answers are anonymous.
                </p>
                <p className={styles.headline}> Reports </p>
                <p> First, you need to create report template, just like form, then you fill it up with statistics and your own text.
                    You can save filled report as PDF or print it right away, bur you may need to adjust printing setting before this.
                </p>
                <p className={styles.headline}> Profile </p>
                <p> Use profile page to manage your account, select email for notifications or change your password. </p>
                <p className={styles.headline}> For more information check our <></>
                    <Link className={styles.link} href={"https://github.com/VektorDio/Nextforms"}>GitHub page.</Link>
                </p>
            </div>
        </div>
    );
};

export default HomeColumn;