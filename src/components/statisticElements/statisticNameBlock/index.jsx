import React from 'react';
import styles from './statisticsNameBlock.module.css'
const StatisticNameBlock = ({answersCount}) => {
    return (
        <div className={styles.container}>
            <div className={styles.answersCount}>
                12 Answers
            </div>
            <div className={styles.formDescription}>

            </div>
        </div>
    );
};

export default StatisticNameBlock;