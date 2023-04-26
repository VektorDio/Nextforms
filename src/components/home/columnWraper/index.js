import React, {useState} from 'react';
import styles from './columnWraper.module.css'
import LeftColumn from "@/components/home/columnWraper/leftColumn";
import CentralColumn from "@/components/home/columnWraper/centralColumn";
import RightColumn from "@/components/home/columnWraper/rightColumn";

const ColumnWrapper = ({session}) => {
    const [centralColumnContent, setCentralColumnContent] = useState(true);
    return (
        <div className={styles.columnWrapper}>
            <LeftColumn setCentralColumnContent={setCentralColumnContent}></LeftColumn>
            <CentralColumn centralColumnContent={centralColumnContent} session={session}></CentralColumn>
            <RightColumn></RightColumn>
        </div>
    );
};

export default ColumnWrapper;