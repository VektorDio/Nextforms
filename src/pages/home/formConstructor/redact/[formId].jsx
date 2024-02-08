import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import FormRedact from "@/components/pages/formRedact";
import {useSession} from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const formId = context.params.formId
    let data

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/You must be logged in.`
            }
        }
    }

    try {
        data = (await axios.get(process.env.API_URL + '/api/form', {
            params: {
                formId: formId,
            },
        })).data
    } catch (e){
        return {
            redirect: {
                destination: `/errorPage/${e}`
            }
        }
    }

    if (data.form === null) {
        return {
            redirect: {
                destination: `/errorPage`
            }
        }
    }

    if (data.form.userId !== session.user.id){
        return {
            redirect: {
                destination: `/404`
            }
        }
    }

    return { props: { data, session } }
}

const FormRedactPage = ({ data }) => {
    useSession({required: true})
    return <FormRedact data={ data }/>
}

export default FormRedactPage;