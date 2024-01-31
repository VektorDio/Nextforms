import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import FormStatistics from "@/components/pages/formStatistics";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const formId = context.params.formId
    const userId = session.user.id
    let data

    try {
        data = (await axios.get(process.env.API_URL + '/api/form/answers', {
            params: {
                formId: formId,
                userId: userId
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data
    } catch (e){
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/${e}`
            }
        }
    }

    if (data === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    if (data.userId !== userId){
        return {
            redirect: {
                permanent: false,
                destination: `/404`
            }
        }
    }

    return { props: { data, formId } }
}

const FormStatisticsPage = ({ data, formId }) => {
    return <FormStatistics data={ data } formId={ formId }/>
};

export default FormStatisticsPage;