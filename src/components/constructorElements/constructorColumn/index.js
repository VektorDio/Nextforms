import React from 'react';
import styles from './constructorColumn.module.css'

const ConstructorColumn = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default ConstructorColumn;