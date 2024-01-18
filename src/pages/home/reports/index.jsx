import React from 'react';
import {useSession} from "next-auth/react";
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import ColumnWrapper from "@/components/home/columnWraper";
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import ReportColumn from "@/components/home/reportColumn";
import {useRouter} from "next/router";
import LogInGroup from "@/components/pageWraper/header/logInGroup";

const ReportsHomePage = () => {
    const router = useRouter()
    const {status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    return (
        <>
            <Head>
                <title>Reports | NextForms</title>
                <meta name="description" content="Reports list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                (status !== "loading") ? (
                    <>
                        <Header>
                            <LogInGroup authenticated={(status === "authenticated")}/>
                        </Header>
                        <ColumnWrapper>
                            <MenuColumn centralColumn={"report"}/>
                            <ReportColumn/>
                            <InfoColumn/>
                        </ColumnWrapper>
                    </>
                ) : (<Header/>)
            }
        </>
    );
};

export default ReportsHomePage;