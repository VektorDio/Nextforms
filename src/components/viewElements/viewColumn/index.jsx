import React from 'react';
import styles from './viewColumn.module.css'

const ViewColumn = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ViewColumn;