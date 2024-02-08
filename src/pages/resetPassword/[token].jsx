import React from 'react';
import ResetPassword from "@/components/pages/resetPassword";
import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
    const token = context.params.token

    if (jwt.decode(token) === null) {
        return {
            redirect: {
                destination: `/404`
            }
        }
    }

    return { props: { token }}
}

const ResetPasswordPage = ({token}) => {
    return <ResetPassword token={token}/>
}

export default ResetPasswordPage;