import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ViewHeader from "@/components/viewElements/viewHeader";
import ViewColumn from "@/components/viewElements/viewColumn";
import ViewNameBlock from "@/components/viewElements/viewNameBlock";
import ViewBlock from "@/components/viewElements/viewBlock";
import {Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useCreateAnswers, useGetFormById} from "@/queries/forms";

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

    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>error</div>)

    async function handleFormSubmit(values) {
        if (formObject?.active) {
            let data = Object.entries(values).map(([k, v]) => ({
                questionId: k,
                answerData: v,
            }))
            await createAnswers({
                data: data
            })
            router.push("/answerSubmitted")
        }
    }

    const requiredField = Yup.string()
        .required("Обов'язкове поле")
    const checkboxRequired = Yup.array()
        .min(1,"Виберіть одне")
    const text = Yup.string()
        .max(300, "Забагато символів")
    const textRequired = Yup.string()
        .max(300, "Забагато символів")
        .required("Обов'язкове поле")
    const date = Yup.date()
        .max("9999-01-01", "Введіть правильну дату")
    const dateRequired = Yup.date()
        .max("9999-01-01", "Введіть правильну дату")
        .required("Обов'язкове поле")

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

    return ((formObject) &&
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
                        <ViewColumn>
                            <ViewNameBlock
                                formName={formObject?.name}
                                formDescription={formObject?.description}
                            />
                            {
                                formObject?.questions.map((question , index) => (
                                    <ViewBlock
                                        key={index}
                                        question={question}
                                    />
                                ))
                            }
                        </ViewColumn>
                    </Main>
                </>
            )}
        </Formik>
        </>
    );
};

export default FormView;
