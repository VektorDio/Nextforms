import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import ReportsList from "@/components/pages/reports";
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

const ReportsListPage = () => {
    useSession({required: true})
    return <ReportsList/>
};

export default ReportsListPage;