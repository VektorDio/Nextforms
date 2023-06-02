import React, {useState} from 'react';
import styles from './columnWraper.module.css'
import MenuColumn from "@/components/home/menuColumn";
import CentralColumn from "@/components/home/centralColumn";
import InfoColumn from "@/components/home/infoColumn";

const ColumnWrapper = () => {
    const [centralColumnContent, setCentralColumnContent] = useState(true);
    return (
        <div className={styles.columnWrapper}>
            <MenuColumn setCentralColumnContent={setCentralColumnContent}/>
            <CentralColumn centralColumnContent={centralColumnContent} />
            <InfoColumn/>
        </div>
    );
};

export default ColumnWrapper;