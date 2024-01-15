import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ViewHeader from "@/components/viewElements/viewHeader";
import ViewBlock from "@/components/viewElements/viewBlock";
import {Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useCreateAnswers, useGetFormById} from "@/queries/forms";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import ConstructorColumn from "@/components/formConstructorElements/constructorColumn";
import styles from "./formView.module.css";

const FormView = () => {
    const router = useRouter()
    const {formId} = router.query

    const {error, data, isLoading} = useGetFormById({
        id: formId,
    })

    const {mutateAsync:createAnswers} = useCreateAnswers()

    const [formObject, setFormObject] = useState()

    useEffect(() => {
        if(data) {
            setFormObject(data.form)
        }
    }, [data])

    async function handleFormSubmit(values) {
        if (formObject?.active) {
            let data = Object.entries(values).map(([key, value]) => ({
                questionId: key,
                answerData: value,
            }))

            await createAnswers({
                data: data
            })

            router.push("/answerSubmitted")
        } else {
            console.log("Form is inactive")
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
    formObject?.questions.map(e => {
         initialValues[e.id] = (e.type === "checkbox") ?  [] : ""
    })

    return (
        <>
            <Head>
                <title>{formObject?.name} | Report Generator</title>
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
                    <ViewHeader/>
                    <Main>
                        <ConstructorColumn>
                            {
                                (isLoading) ? (
                                    <LoadingMessage/>
                                ) : (error) ? (
                                    <ErrorMessage error={error}/>
                                ) : (formObject) && (
                                    <>
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
                                    </>
                                )
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
