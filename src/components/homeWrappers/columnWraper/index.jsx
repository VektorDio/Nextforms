import React from 'react';
import styles from './columnWraper.module.css'

const ColumnWrapper = ({children}) => {
    return (
        <div className={styles.columnWrapper}>
            {children}
        </div>
    )
}

export default ColumnWrapper;