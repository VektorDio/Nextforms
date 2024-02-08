import React from 'react';
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import HomeColumn from "src/components/pages/home/homeColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";

const Home = () => {
    return (
        <>
            <MetaHead title={"Home | NextForms"} description={"Home page"}/>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn/>
                <HomeColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    )
}

export default Home;