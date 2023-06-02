import React from 'react';
import styles from './central.module.css'
import ReportColumn from "@/components/home/reportColumn";
import FormColumn from "@/components/home/formColumn";
import ProfileColumn from "@/components/home/profileColumn";

const CentralColumn = ({centralColumnContent}) => {
    let columnToRender
    switch (centralColumnContent){
        case "form":
            columnToRender = <FormColumn/>
            break
        case "report":
            columnToRender = <ReportColumn/>
            break
        case "profile":
            columnToRender = <ProfileColumn/>
            break
        default:
            columnToRender = <FormColumn/>
    }

    return (
        <div className={styles.mainColumn}>
            {columnToRender}
        </div>
    );
};

export default CentralColumn;