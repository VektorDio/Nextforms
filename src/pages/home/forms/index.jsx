import React from 'react';
import FormsList from "@/components/pages/forms";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
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

const FormsListPage = () => {
    useSession({required: true})
    return <FormsList/>
};

export default FormsListPage;