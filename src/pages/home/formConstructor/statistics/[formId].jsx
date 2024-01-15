import React, {useEffect, useState} from "react";
import Head from "next/head";
import ConstructorHeader from "@/components/formConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import StatisticNameBlock from "@/components/statisticElements/statisticNameBlock";
import StatisticBlock from "@/components/statisticElements/statisticBlock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useGetAnswersByFormId} from "@/queries/forms";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import ConstructorColumn from "src/components/constructorColumn";
const FormConstructor = () => {
    const router = useRouter()
    const {formId} = router.query

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const [formObject, setFormObject] = useState()

    const {error, data, isLoading} = useGetAnswersByFormId({
        id: formId,
    })

    useEffect(() => {
        if(data) {
            setFormObject(data)
        }
    }, [data])

    const answersCount = formObject?.reduce((acc, val) => (acc + val.answers.length), 0)

    return (
        <>
            <Head>
                <title>Statistics | Report Generator</title>
                <meta name="description" content="Form statistics page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConstructorHeader id={formId} />
            <Main>
                <ConstructorColumn>
                    {
                        (isLoading) ? (
                            <LoadingMessage/>
                        ) : (error) ? (
                            <ErrorMessage error={error}/>
                        ) : (formObject) && (
                            <>
                                <StatisticNameBlock answersCount={answersCount}/>
                                {
                                    formObject?.map((question, index) => (
                                        <StatisticBlock
                                            key={index}
                                            question={question}
                                        />
                                    ))
                                }
                            </>
                        )
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default FormConstructor;