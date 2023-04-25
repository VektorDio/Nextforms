import React, {useState} from 'react';
import styles from './columnWraper.module.css'
import LeftColumn from "@/components/home/columnWraper/leftColumn";
import CentralColumn from "@/components/home/columnWraper/centralColumn";
import RightColumn from "@/components/home/columnWraper/rightColumn";
//import {useSession} from "next-auth/react";

const ColumnWrapper = () => {
    const [centralColumnContent, setCentralColumnContent] = useState(true);
    //const { data: session, status } = useSession()

    return (
        <div className={styles.columnWrapper}>
            <LeftColumn setCentralColumnContent={setCentralColumnContent}></LeftColumn>
            <CentralColumn centralColumnContent={centralColumnContent}></CentralColumn>
            <RightColumn></RightColumn>
        </div>
    );
};

export default ColumnWrapper;