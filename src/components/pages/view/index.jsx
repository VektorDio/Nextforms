import React from 'react';
import Main from "src/components/globalWrappers/main";
import ViewHeader from "src/components/pages/view/viewHeader";
import ViewBlock from "src/components/pages/view/viewBlock";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useCreateAnswers} from "@/queries/forms";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import styles from "./formView.module.css";
import Header from "src/components/globalWrappers/header";
import FormikObserver from "@/components/formikObserver";
import MetaHead from "@/components/metaHead";

const FormView = ({ formData }) => {
    const router = useRouter()
    const {mutateAsync:createAnswers} = useCreateAnswers()
    const formObject = formData //IDE bug?

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
                await router.push(`/errorPage/${e.response.data.message}`)
                return
            }

            await router.push("/answerSubmitted")
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
            <MetaHead title={`${formObject.name || 'Form Name'} | NextForms`} description={"Form view page"}/>
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
                                <FormikObserver/>
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
