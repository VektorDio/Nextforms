import React, {useEffect, useState} from "react";
import Head from "next/head";
import ConstructorHeader from "@/components/formConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import StatisticColumn from "@/components/statisticElements/statisticColumn";
import StatisticNameBlock from "@/components/statisticElements/statisticNameBlock";
import StatisticBlock from "@/components/statisticElements/statisticBlock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useGetAnswersByFormId} from "@/queries/forms";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
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

    if (isLoading) return ((
        <>
            <ConstructorHeader id={formObject?.id} />
            <Main>
                <StatisticColumn>
                    <LoadingMessage/>
                </StatisticColumn>
            </Main>
        </>
    ))
    if (error) return (<>
        <ConstructorHeader id={formObject?.id} />
        <Main>
            <StatisticColumn>
                <ErrorMessage error={error}/>
            </StatisticColumn>
        </Main>
    </>)

    const answersCount = formObject?.reduce((acc, val) => (acc + val.answers.length), 0)

    return ((formObject) &&
        <>
            <Head>
                <title>Statistics | Report Generator</title>
                <meta name="description" content="Form statistics page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConstructorHeader id={formId} />
            <Main>
                <StatisticColumn>
                    <StatisticNameBlock answersCount={answersCount}/>
                    {
                        formObject?.map((question, index) => (
                            <StatisticBlock
                                key={index}
                                question={question}
                            />
                        ))
                    }
                </StatisticColumn>
            </Main>
        </>
    );
};

export default FormConstructor;