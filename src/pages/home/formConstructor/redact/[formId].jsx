import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ConstructorHeader from "@/components/formConstructorElements/constructorHeader";
import ConstructorColumn from "src/components/constructorColumn";
import ConstructorBlock from "@/components/formConstructorElements/constructorBlock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useUpdateForm} from "@/queries/forms";
import styles from "./formRedact.module.css"
import TextParagraph from "@/components/inputs/textParagraph";
import ToggleButton from "@/components/buttons/toggleButton";
import Header from "@/components/pageWraper/header";
import FormAlert from "@/components/messages/formAlert";
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

    return { props: { data } }
}

const FormConstructor = ({data}) => {
    const router = useRouter()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const {mutateAsync} = useUpdateForm()

    const [formObject, setFormObject] = useState(data.form)
    const [selectedBlockId, setSelectedBlockId] = useState("head")

    const [emptyQuestionCheck, setEmptyQuestionCheck] = useState(false)
    const [emptyOptionsCheck, setEmptyOptionsCheck] = useState(false)

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

    async function handleFormSubmit() {

        if (emptyQuestionCheck) {
            return
        }

        if (emptyOptionsCheck){
            return
        }

        await mutateAsync({
            id: formObject?.id,
            description: formObject?.description,
            name: formObject?.name,
            active: formObject?.active,
            questions: formObject?.questions.map(e => ({
                type: e.type,
                required: e.required,
                question: e.question,
                options: e.options,
            })),
        })

        router.push("/home")
    }

    function handleNameChange(text){
        if (text.length < 1){
            //display error
            return
        }
        setFormObject(prev => ({
            ...prev,
            name: text
        }))
    }
    function handleDescriptionChange(text){
        if (text.length < 1){
            //display error
            return
        }
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
        let buf = [...formObject?.questions]
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            required: false,
            type: "radio",
            question:"Question",
            options:["Option"]
        })
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleDelete = (index) => {
        if(formObject?.questions.length > 1){ //cant delete last question
            let buf = [...formObject?.questions]
            buf.splice(index, 1)
            setFormObject(prev => ({
                ...prev,
                questions: [...buf]
            }))
        }
    }

    const handleQuestionTypeChange = (index, value) => {
        let buf = [...formObject?.questions]
        buf[index].type = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleQuestionChange = (index, text) => {
        if (formObject?.questions.some((question, i) => question.question === text && i !== index)){
            console.log("Duplicate question")
            return
        }

        let buf = [...formObject?.questions]
        buf[index].question = text
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))

        setEmptyQuestionCheck(!formObject?.questions.every((e) => e.question.length > 1))
    }

    const handleRequiredToggle = (index, value) => {
        let buf = [...formObject?.questions]
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

    return (
        <>
            <Head>
                <title>{formObject?.name || "Form"} | NextForms</title>
                <meta name="description" content="Form redacting page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header movable={true}>
                <ConstructorHeader id={formObject?.id} onFormSubmit={formObject && handleFormSubmit}/>
            </Header>
            <Main onClick={(e) => setSelectedBlock(e, 'head')}>
                <ConstructorColumn>
                    <div className={styles.container} onClick={(e) => setSelectedBlock(e, 'head')}>
                        <div className={styles.formName}>
                            <TextParagraph
                                onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                                placeholder={"New form"}
                                defaultValue={formObject?.name}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <TextParagraph
                                onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                                placeholder={"Description"}
                                defaultValue={formObject?.description}
                            />
                        </div>
                        <div>
                            <ToggleButton
                                text={"Accept answers"}
                                onClick={(e) => handleAcceptChange(e.target.checked)}
                                checked={formObject?.active}
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
                        formObject?.questions.map((q, index) => (
                            <ConstructorBlock
                                key={q.id}
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

export default FormConstructor;