import React from 'react';
import styles from './central.module.css'
import FormEntry from "@/components/home/formEntry";
const CentralColumn = () => {
    return (
        <div className={styles.mainColumn}>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
            <FormEntry></FormEntry>
        </div>
    );
};

export default CentralColumn;