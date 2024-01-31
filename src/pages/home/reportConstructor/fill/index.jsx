import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import isValidIdObject from "@/utils/utils";
import axios from "axios";
import ReportFill from "@/components/pages/reportFill";

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

    const {formId, reportId} = context.query
    const userId = session.user.id
    let formListData, reportListData
    let answers = null
    let report = null

    try {
        if (isValidIdObject(formId)) {
            answers = (await axios.get(process.env.API_URL + '/api/form/answers', {
                params: {
                    formId: formId,
                    userId: userId
                },
                headers: {
                    Cookie: context.req.headers.cookie
                }
            })).data
        }

        if (isValidIdObject(reportId)){
            report = (await axios.get(process.env.API_URL + '/api/report', {
                params: {
                    reportId: reportId,
                    userId: userId
                },
                headers: {
                    Cookie: context.req.headers.cookie
                }
            })).data
        }

        formListData = (await axios.get(process.env.API_URL + '/api/form/formsByCreatorId', {
            params: {
                userId: userId,
                withNames: true
            },
            headers: {
                Cookie: context.req.headers.cookie
            }
        })).data

        reportListData = (await axios.get(process.env.API_URL + '/api/report/reportsByCreatorId', {
            params: {
                userId: userId,
                withNames: true
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

    if (report === null && answers === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    return { props: { formListData, reportListData, userId, report, answers } }
}

const ReportFillPage = (props) => {
    return <ReportFill {...props}/>
};

export default ReportFillPage;