import React, {useState} from 'react';
import styles from './columnWraper.module.css'
import MenuColumn from "@/components/home/menuColumn";
import CentralColumn from "@/components/home/centralColumn";
import InfoColumn from "@/components/home/infoColumn";

const ColumnWrapper = ({session}) => {
    const [centralColumnContent, setCentralColumnContent] = useState(true);
    return (
        <div className={styles.columnWrapper}>
            <MenuColumn setCentralColumnContent={setCentralColumnContent}></MenuColumn>
            <CentralColumn centralColumnContent={centralColumnContent} session={session}></CentralColumn>
            <InfoColumn></InfoColumn>
        </div>
    );
};

export default ColumnWrapper;