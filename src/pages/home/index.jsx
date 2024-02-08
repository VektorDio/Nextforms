import React from 'react';
import Home from "@/components/pages/home";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {useSession} from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        }
    } else return { props: { session }}
}

const HomePage = () => {
    useSession({required: true})
    return <Home/>
}

export default HomePage;