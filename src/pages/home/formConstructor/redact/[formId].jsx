import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ConstructorHeader from "@/components/formConstructorElements/constructorHeader";
import ConstructorColumn from "@/components/formConstructorElements/constructorColumn";
import ConstructorNameBlock from "@/components/formConstructorElements/constructorNameBlock";
import ConstructorBlock from "@/components/formConstructorElements/constructorBlock";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useGetFormById, useUpdateForm} from "@/queries/forms";

const FormConstructor = () => {
    const router = useRouter()
    const {formId} = router.query
    const {mutateAsync} = useUpdateForm()
    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const {error, data, isLoading} = useGetFormById({
        id: formId,
    })

    const [formObject, setFormObject] = useState()
    const [selectedBlockId, setSelectedBlockId] = useState("head")

    useEffect(() => {
        if(data) {
            setFormObject(data.form)
        }
    }, [data])

    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>error</div>)

    async function handleFormSubmit() {

        if (!formObject?.questions.every((e) => e.question.length > 1)) {
            //display error
            return
        }

        if (!formObject?.questions.every((e) => e.options.length > 0)) {
            //display error
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
                options: e.options.map(e => (e.text)),
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

    const handleAddQuestionBlock = (id) => {
        let buf = [...formObject?.questions]
        let index = buf.findIndex(e => e.id === id)
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            required: false,
            type: "radio",
            question:"Question",
            options:[{
                id: uuidv4(),
                text: ""
            }]
        })
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleDelete = (id) => {
        let buf = [...formObject?.questions]
        let index = buf.findIndex(e => e.id === id)
        if(buf.length > 1){
            buf.splice(index, 1)
        }
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleSelectChange = (id, value) => {
        let buf = [...formObject?.questions]
        let index = buf.findIndex(e => e.id === id)
        buf[index].type = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleQuestionChange = (id, text) => {
        let buf = [...formObject?.questions]

        if (text.length < 1) {
            //display error
            return
        }

        let index = buf.findIndex(e => e.id === id)
        buf[index].question = (buf.some((e) => e.question === text)) ? "" : text
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    const handleRequiredToggle = (id, value) => {
        let buf = [...formObject?.questions]
        let index = buf.findIndex(e => e.id === id)
        buf[index].required = value
        setFormObject(prev => ({
            ...prev,
            questions: [...buf]
        }))
    }

    return ((formObject) ? (
        <>
            <Head>
                <title>{formObject?.name} | Report Generator</title>
                <meta name="description" content="Form redact page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConstructorHeader id={formObject?.id} onFormSubmit={handleFormSubmit}/>
            <Main>
                <ConstructorColumn>
                    <ConstructorNameBlock
                        formName={formObject?.name}
                        formDescription={formObject?.description}
                        acceptAnswers={formObject?.active}
                        handleNameChange={handleNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleAcceptChange={handleAcceptChange}
                        selectedBlockId={selectedBlockId}
                        setSelectedBlockId={setSelectedBlockId}
                    />
                    {
                        formObject?.questions.map((q) => (
                            <ConstructorBlock
                                key={q.id}
                                question={q}
                                handleAdd={handleAddQuestionBlock}
                                handleDelete={handleDelete}
                                handleSelectChange={handleSelectChange}
                                handleQuestionChange={handleQuestionChange}
                                handleRequiredToggle={handleRequiredToggle}
                                selectedBlockId={selectedBlockId}
                                setSelectedBlockId={setSelectedBlockId}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
        ) : null
    );
};

export default FormConstructor;