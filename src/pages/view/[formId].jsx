import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ViewHeader from "@/components/viewElements/viewHeader";
import ViewBlock from "@/components/viewElements/viewBlock";
import {Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useCreateAnswers} from "@/queries/forms";
import ConstructorColumn from "src/components/constructorColumn";
import styles from "./formView.module.css";
import Header from "@/components/pageWraper/header";
import axios from "axios";

export async function getServerSideProps(context) {
    const id = context.params.formId
    let data

    try {
        data = (await axios.get('http://localhost:3000/api/form', {
            params: {
                id: id,
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

    if (data.form === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }
    
    if (!data.form.active) {
        return {
            redirect: {
                permanent: false,
                destination: `/closedForm`
            }
        }
    }

    return { props: { data } }
}

const FormView = ({data}) => {
    const router = useRouter()

    const {mutateAsync:createAnswers} = useCreateAnswers()

    const [formObject, setFormObject] = useState(data.form)

    useEffect(() => {
        const beforeunloadHandler = (e) => {
            e.preventDefault()
            e.returnValue = true
        }

        window.addEventListener("beforeunload", beforeunloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler)
        }
    }, [formObject])

    async function handleFormSubmit(values) {
        if (formObject.active) {
            let data = Object.entries(values).map(([key, value]) => ({
                questionId: key,
                answerData: value,
            }))

            try {
                await createAnswers({
                    data: data
                })
            } catch (e) {
                router.push(`/errorPage/${e}`)
                return
            }

            router.push("/answerSubmitted")
        }
    }

    const requiredField = Yup.string()
        .required("Required")
    const checkboxRequired = Yup.array()
        .min(1,"Select one")
    const text = Yup.string()
        .max(300, "Too many characters")
    const textRequired = Yup.string()
        .max(300, "Too many characters")
        .required("Required")
    const date = Yup.date()
        .max("9999-01-01", "Select correct date")
    const dateRequired = Yup.date()
        .max("9999-01-01", "Select correct date")
        .required("Required")

    const validationScheme = {}
    formObject?.questions.map((question)=> {
        let required = question.required
        switch (question.type){
            case "date":
                (required) ?
                    (validationScheme[question.id] = dateRequired) :
                    (validationScheme[question.id] = date)
                break;
            case "oneLineText":
            case "paragraphText":
                (required) ?
                    (validationScheme[question.id] = textRequired) :
                    (validationScheme[question.id] = text)
                break;
            case "checkbox":
                (required) && (validationScheme[question.id] = checkboxRequired)
                break;
            default:
                (required) && (validationScheme[question.id] = requiredField)
                break;
        }
    })

    let initialValues = {}
    formObject?.questions.map((e) => {
         initialValues[e.id] = (e.type === "checkbox") ? [] : ""
    })

    return (
        <>
            <Head>
                <title>{formObject.name || "Form Name"} | Report Generator</title>
                <meta name="description" content="Form view page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(validationScheme)}
                onSubmit={(values) => {handleFormSubmit(values)}}
            >{() => (
                <>
                    <Header movable={true}>
                        <ViewHeader/>
                    </Header>
                    <Main>
                        <ConstructorColumn>
                            <div className={styles.container} >
                                <div className={styles.formName}>
                                    {formObject?.name}
                                </div>
                                <div className={styles.formDescription}>
                                    {formObject?.description}
                                </div>
                            </div>
                            {
                                formObject?.questions.map((question , index) => (
                                    <ViewBlock
                                        key={index}
                                        question={question}
                                    />
                                ))
                            }
                        </ConstructorColumn>
                    </Main>
                </>
            )}
        </Formik>
        </>
    );
};

export default FormView;
