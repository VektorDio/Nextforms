import React from 'react';
import Login from "src/components/pages/login";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: `/home`
            }
        }
    } else return { props: { }}
}

const LoginPage = () => {
    return <Login/>
}

export default LoginPage;