import React from 'react';
import FormView from "@/components/pages/view/";
import axios from "axios";

export async function getServerSideProps(context) {
    const formId = context.params.formId
    let formData

    try {
        formData = (await axios.get(process.env.API_URL + '/api/form', {
            params: {
                formId: formId,
            }
        })).data.form
    } catch (e){
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/${e}`
            }
        }
    }

    if (formData === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    if (!formData.active) {
        return {
            redirect: {
                permanent: false,
                destination: `/closedForm`
            }
        }
    }

    return { props: { formData } }
}

const ViewPage = ({ formData }) => {
    return <FormView formData={ formData }/>
};

export default ViewPage;