import React from 'react';
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import FormColumn from "src/components/pages/forms/formColumn";
import Header from "src/components/globalWrappers/header";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";

const FormsList = () => {
    return (
        <>
            <MetaHead title={"Forms | NextForms"} description={"Forms list page"}/>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"form"}/>
                <FormColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    )
}

export default FormsList;