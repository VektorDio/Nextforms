import React from 'react';
import MenuColumn from "@/components/home/menuColumn";
import InfoColumn from "@/components/home/infoColumn";
import ColumnWrapper from "@/components/home/columnWraper";
import FormColumn from "@/components/home/formColumn";
import Head from "next/head";
import Header from "@/components/pageWraper/header";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import LogInGroup from "@/components/pageWraper/header/logInGroup";

const FormsHomePage = () => {
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
                <title>Forms | NextForms</title>
                <meta name="description" content="Forms list page" />
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
                            <MenuColumn centralColumn={"form"}/>
                            <FormColumn/>
                            <InfoColumn/>
                        </ColumnWrapper>
                    </>
                ) : (<Header/>)
            }
        </>
    );
};

export default FormsHomePage;