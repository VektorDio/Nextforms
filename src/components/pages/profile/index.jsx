import React from 'react';
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ProfileColumn from "src/components/pages/profile/profileColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";

const Profile = () => {
    return (
        <>
            <MetaHead title={"Profile | NextForms"} description={"Profile page"}/>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"profile"}/>
                <ProfileColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    )
}

export default Profile;