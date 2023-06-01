import React from 'react';
import styles from './fillColumn.module.css'

const ViewColumn = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ViewColumn;