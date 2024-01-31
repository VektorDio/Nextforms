import React from 'react';
import Head from "next/head";
import Header from "src/components/globalWrappers/header";
import ColumnWrapper from "src/components/homeWrappers/columnWraper";
import MenuColumn from "src/components/homeWrappers/menuColumn";
import InfoColumn from "src/components/homeWrappers/infoColumn";
import ProfileColumn from "src/components/pages/profile/profileColumn";
import LogInGroup from "@/components/globalWrappers/header/logInGroup";

const Profile = () => {
    return (
        <>
            <Head>
                <title>Profile | NextForms</title>
                <meta name="description" content="Profile page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header>
                <LogInGroup authenticated={true}/>
            </Header>
            <ColumnWrapper>
                <MenuColumn centralColumn={"profile"}/>
                <ProfileColumn/>
                <InfoColumn/>
            </ColumnWrapper>
        </>
    );
};

export default Profile;