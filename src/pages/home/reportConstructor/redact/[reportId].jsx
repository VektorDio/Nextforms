import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import ReportRedact from "@/components/pages/reportRedact";
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

    const reportId = context.params.reportId
    const userId = session.user.id
    let data

    try {
        data = (await axios.get(process.env.API_URL + '/api/report', {
            params: {
                reportId: reportId,
                userId: userId
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data
    } catch (e){
        return {
            redirect: {
                destination: `/errorPage/${e}`
            }
        }
    }

    if (data.report === null) {
        return {
            redirect: {
                destination: `/errorPage`
            }
        }
    }

    if (data.report.userId !== userId){
        return {
            redirect: {
                destination: `/404`
            }
        }
    }

    return { props: { data, session } }
}

const ReportRedactPage = ({ data }) => {
    useSession({required: true})
    return <ReportRedact data={data}/>
}

export default ReportRedactPage;