import React from 'react';
import styles from './statisticColumn.module.css'

const StatisticColumn = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default StatisticColumn;