import React from 'react';
import Error from "src/components/pages/error";
import {useRouter} from "next/router";

const ErrorPage = () => {
    const router = useRouter()
    const { error } = router.query

    return <Error error={error}/>
}

export default ErrorPage;