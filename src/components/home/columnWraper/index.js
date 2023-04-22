import React, {useState} from 'react';
import styles from './columnWraper.module.css'
import LeftColumn from "@/components/home/leftColumn";
import CentralColumn from "@/components/home/centralColumn";
import RightColumn from "@/components/home/rightColumn";

const ColumnWrapper = () => {
    const [centralColumnContent, setCentralColumnContent] = useState(true);

    return (
        <div className={styles.columnWrapper}>
            <LeftColumn setCentralColumnContent={setCentralColumnContent}></LeftColumn>
            <CentralColumn centralColumnContent={centralColumnContent}></CentralColumn>
            <RightColumn></RightColumn>
        </div>
    );
};

export default ColumnWrapper;