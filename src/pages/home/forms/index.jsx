import React from 'react';
import FormsList from "@/components/pages/forms";
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

const FormsListPage = () => {
    useSession({required: true})
    return <FormsList/>
};

export default FormsListPage;