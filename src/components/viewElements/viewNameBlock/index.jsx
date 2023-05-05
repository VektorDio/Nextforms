import React from 'react';
import styles from './viewBlock.module.css'
const ViewNameBlock = ({formName, formDescription}) => {
    return (
        <div className={styles.container} >
            <div className={styles.formName}>
                {formName}
            </div>
            <div className={styles.formDescription}>
                {formDescription}
            </div>
        </div>
    );
};

export default ViewNameBlock;