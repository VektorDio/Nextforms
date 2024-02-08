import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import ReportsList from "@/components/pages/reports";
import {useSession} from "next-auth/react";
import * as Yup from "yup";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/`
            }
        }
    }

    const paramSchema = Yup.number().min(1).required()

    try {
        paramSchema.validateSync(context.query.page)
    } catch (e) {
        return {
            redirect: {
                destination: `/404`
            }
        }
    }

    return { props: { session }}
}

const ReportsListPage = () => {
    useSession({required: true})
    return <ReportsList/>
}

export default ReportsListPage;