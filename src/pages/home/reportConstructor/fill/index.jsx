import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import ReportFill from "@/components/pages/reportFill";
import {useSession} from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/You must be logged in.`
            }
        }
    }

    const { formId, reportId } = context.query
    const userId = session.user.id

    let formList, reportList
    let answers = null
    let report = null

    try {
        ({answers, report, formList, reportList} = (await axios.get(process.env.API_URL + '/api/fill', {
            params: {
                formId: formId,
                reportId: reportId,
                userId: userId,
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data)
    } catch (e){
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/${e}`
            }
        }
    }

    if (report === null && answers === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    return { props: { formList, reportList, userId, report, answers, session } }
}

const ReportFillPage = (props) => {
    useSession({required: true})
    return <ReportFill {...props}/>
};

export default ReportFillPage;