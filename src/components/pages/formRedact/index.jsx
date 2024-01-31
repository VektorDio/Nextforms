import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Main from "src/components/globalWrappers/main";
import ConstructorHeader from "src/components/pages/formRedact/constructorHeader";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import ConstructorBlock from "src/components/pages/formRedact/constructorBlock";
import {useRouter} from "next/router";
import {useUpdateForm} from "@/queries/forms";
import styles from "./formRedact.module.css"
import TextParagraph from "@/components/inputFields/textParagraph";
import ToggleButton from "@/components/buttons/toggleButton";
import Header from "src/components/globalWrappers/header";
import FormAlert from "@/components/messages/formAlert";

const FormRedact = ({ data }) => {
    const router = useRouter()
    const {mutateAsync} = useUpdateForm()

    const [formObject, setFormObject] = useState(data.form)
    const [selectedBlockId, setSelectedBlockId] = useState("head")

    const [emptyQuestionCheck, setEmptyQuestionCheck] = useState(false)
    const [emptyOptionsCheck, setEmptyOptionsCheck] = useState(false)
    const [duplicateQuestionsCheck, setDuplicateQuestionsCheck] = useState(false)
    const [emptyFormNameCheck, setEmptyFormNameCheck] = useState(false)

    async function handleFormSubmit() {

        let emptyQuestionCheck = !formObject.questions.every((e) => e.question.length > 0)
        setEmptyQuestionCheck(emptyQuestionCheck) //just to make sure

        if (emptyQuestionCheck || emptyOptionsCheck || duplicateQuestionsCheck || emptyFormNameCheck) {
            return
        }

        try {
            await mutateAsync({
                userId: formObject.userId,
                id: formObject.id,
                description: formObject.description,
                name: formObject.name,
                active: formObject.active,
                questions: formObject.questions.map(e => ({
                    type: e.type,
                    required: e.required,
                    question: e.question,
                    options: e.options,
                })),
            })
        } catch (e) {
            await router.push(`/errorPage/${e}`)
            return
        }

        router.back()
    }

    function handleNameChange(text){
        setFormObject(prev => ({
            ...prev,
            name: text
        }))
        setEmptyFormNameCheck(!text > 0)
    }

    function handleDescriptionChange(text){
        setFormObject(prev => ({
            ...prev,
            description: text
        }))
    }

    function handleAcceptChange(status) {
        setFormObject(prev => ({
            ...prev,
            active: status
        }))
    }

    const handleAddQuestionBlock = (index) => {

        if (formObject.questions.length >= 20) {
            return //cant create more than that questions per one form
        }

        let buf = [...formObject.questions]
        buf.splice((index + 1), 0, {
            required: false,
            type: "radio",
            question:"",
            options:["Option"]
        })
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleDelete = (index) => {
        if(formObject.questions.length > 1){ //cant delete last question
            let buf = [...formObject.questions]
            buf.splice(index, 1)
            setFormObject(prev => ({
                ...prev,
                questions: [...buf]
            }))
            setEmptyQuestionCheck(!formObject.questions.every((e) => e.question.length > 0))
        }
    }

    const handleQuestionTypeChange = (index, value) => {
        let buf = [...formObject.questions]
        buf[index].type = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleQuestionChange = (index, text) => {
        let buf = [...formObject.questions]
        buf[index].question = text
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))

        setDuplicateQuestionsCheck(formObject.questions.some((question, i) => question.question === text && i !== index))
        setEmptyQuestionCheck(!formObject.questions.every((e) => e.question.length > 0))
    }

    const handleRequiredToggle = (index, value) => {
        let buf = [...formObject.questions]
        buf[index].required = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleOptionsChange = (index, value) => {
        let buf = [...formObject?.questions]
        buf[index].options = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))

        setEmptyOptionsCheck(!buf[index].options.every((e) => e.length > 0))
    }

    function setSelectedBlock(e, id){
        e.stopPropagation()
        setSelectedBlockId(id)
    }

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

    return (
        <>
            <Head>
                <title>{`${formObject.name || "Form"} | NextForms`}</title>
                <meta name="description" content="Form redacting page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header movable={true}>
                <ConstructorHeader id={formObject.id} onFormSubmit={formObject && handleFormSubmit}/>
            </Header>
            <Main onClick={(e) => setSelectedBlock(e, 'head')} >
                <ConstructorColumn>
                    <div className={styles.container} onClick={(e) => setSelectedBlock(e, 'head')}>
                        <div className={styles.formName}>
                            <TextParagraph
                                onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                                placeholder={"New form"}
                                defaultValue={formObject.name}
                                maxLength={126}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <TextParagraph
                                onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                                placeholder={"Description"}
                                defaultValue={formObject.description}
                                maxLength={350}
                            />
                        </div>
                        <div>
                            <ToggleButton
                                text={"Accept answers"}
                                onClick={(e) => handleAcceptChange(e.target.checked)}
                                checked={formObject.active}
                            />
                        </div>
                    </div>
                    {
                        (emptyQuestionCheck) && (
                            <FormAlert>Form has empty questions!</FormAlert>
                        )
                    }
                    {
                        (emptyOptionsCheck) && (
                            <FormAlert>Form has empty options!</FormAlert>
                        )
                    }
                    {
                        (duplicateQuestionsCheck) && (
                            <FormAlert>Form has duplicated questions!</FormAlert>
                        )
                    }
                    {
                        (emptyFormNameCheck) && (
                            <FormAlert>Form has empty name!</FormAlert>
                        )
                    }
                    {
                        formObject.questions.map((q, index) => (
                            <ConstructorBlock
                                key={index}
                                question={q}
                                questionIndex={index}

                                handleAdd={handleAddQuestionBlock}
                                handleDelete={handleDelete}
                                handleQuestionChange={handleQuestionChange}
                                handleRequiredToggle={handleRequiredToggle}
                                handleOptionsChange={handleOptionsChange}
                                handleSelectChange={handleQuestionTypeChange}

                                selectedBlockId={selectedBlockId}
                                setSelectedBlockId={setSelectedBlock}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default FormRedact;