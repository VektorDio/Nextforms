import React from 'react';
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ReportColumn from "src/components/pages/reports/reportColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";

const ReportsList = () => {
    return (
        <>
            <MetaHead title={"Reports | NextForms"} description={"Reports list page"}/>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"report"}/>
                <ReportColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default ReportsList;