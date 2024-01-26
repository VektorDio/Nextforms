import React, {useEffect} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ViewHeader from "@/components/viewElements/viewHeader";
import ViewBlock from "@/components/viewElements/viewBlock";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useCreateAnswers} from "@/queries/forms";
import ConstructorColumn from "src/components/constructorColumn";
import styles from "./formView.module.css";
import Header from "@/components/pageWraper/header";
import axios from "axios";

export async function getServerSideProps(context) {
    const formId = context.params.formId
    let data

    try {
        data = (await axios.get('http://localhost:3000/api/form', {
            params: {
                formId: formId,
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

    const formObject = data.form

    useEffect(() => {
        const beforeunloadHandler = (e) => {
            e.preventDefault()
            e.returnValue = true
        }

        window.addEventListener("beforeunload", beforeunloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler)
        }
    }, [])

    async function handleFormSubmit(values) {
        if (formObject.active) {
            let data = Object.entries(values).map(([key, value]) => {
                let parsedValue
                if (Array.isArray(value)) {
                    parsedValue = [...value]
                } else if (typeof value === "object") {
                    parsedValue = [value.value]
                } else {
                    parsedValue = [value]
                }

                return {
                    questionId: key,
                    answerData: parsedValue,
                }
            })

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
        .typeError('Enter valid text')
    const checkboxRequired = Yup.array()
        .min(1,"Select one")
        .typeError('Select one')
    const text = Yup.string()
        .max(300, "Too many characters")
        .typeError('Enter valid text')
    const textRequired = Yup.string()
        .max(300, "Too many characters")
        .required("Required")
        .typeError('Enter valid text')
    const date = Yup.date()
        .max("9999-01-01", "Select correct date")
        .typeError('You must specify a date')
    const dateRequired = Yup.date()
        .max("9999-01-01", "Select correct date")
        .required("Required")
        .typeError('You must specify a date')

    const validationScheme = {}
    formObject.questions.map((question)=> {
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
    formObject.questions.map((e) => {
         initialValues[e.id] = (e.type === "checkbox") ? [] : ""
    })

    return (
        <>
            <Head>
                <title>{`${formObject.name || 'Form Name'} | NextForms`}</title>
                <meta name="description" content="Form view page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape(validationScheme)}
                onSubmit={async (values) => await handleFormSubmit(values)}
            >{() => (
                <>
                    <Header movable={true}>
                        <ViewHeader/>
                    </Header>
                    <Main>
                        <ConstructorColumn>
                            <div className={styles.container} >
                                <div className={styles.formName}>
                                    {formObject.name}
                                </div>
                                <div className={styles.formDescription}>
                                    {formObject.description}
                                </div>
                            </div>
                            <Form>
                            {
                                formObject.questions.map((question , index) => (
                                    <ViewBlock
                                        key={index}
                                        question={question}
                                    />
                                ))
                            }
                            </Form>
                        </ConstructorColumn>
                    </Main>
                </>
            )}
        </Formik>
        </>
    );
};

export default FormView;
