import React from "react";
import Head from "next/head";
import ConstructorHeader from "@/components/formConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import StatisticBlock from "@/components/statisticElements/statisticBlock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import ConstructorColumn from "src/components/constructorColumn";
import styles from "./statistics.module.css";
import Header from "@/components/pageWraper/header";
import axios from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

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

const StatisticsConstructor = ({data, formId}) => {
    const router = useRouter()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const answersCount = data.questions.reduce((acc, val) => (acc + val.answers.length), 0)

    return (
        <>
            <Head>
                <title>Statistics | NextForms</title>
                <meta name="description" content="Form statistics page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header movable={true}>
                <ConstructorHeader id={formId} />
            </Header>
            <Main>
                <ConstructorColumn>
                    <div className={styles.container}>
                        <div className={styles.answersCount}>
                            {answersCount} answers
                        </div>
                        <div className={styles.formDescription}>

                        </div>
                    </div>
                    {
                        data.questions.map((question, index) => (
                            <StatisticBlock
                                key={index}
                                question={question}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default StatisticsConstructor;