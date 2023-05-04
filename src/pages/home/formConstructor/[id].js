import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";
import Main from "@/components/pageWraper/main";
import ConstructorHeader from "@/components/constructorElements/constructorHeader";
import ConstructorColumn from "@/components/constructorElements/constructorColumn";
import ConstructorNameBlock from "@/components/constructorElements/constructorNameBlock";
import ConstructorBlock from "@/components/constructorElements/constructorBlock";
import {useRouter} from "next/router";

const FormConstructor = () => {
    const router = useRouter()
    const {formId} = router.query

    const [formObject, setFormObject] = useState({
        id: uuidv4(),
        creator: "test",
        active: true,
        formName: "New form",
        formDescription: "Description",
        questions: [{
            id: uuidv4(),
            required: false,
            type: "radio",
            question:"",
            options:[{
                id: uuidv4(),
                text: ""
            }]
        }]
    })

    if(formId === "new"){
        // continue
    } else {
        // find id in database and load its data into form
        // if none found, redirect to error page or somewhere else
        if (formId === '123'){
        setFormObject({
                id: "123",
                creator: "test",
                active: true,
                formName: "This name",
                formDescription: "That description",
                questions: [{
                    id: "197341823401234",
                    required: false,
                    type: "paragraphText",
                    question:"First question",
                    options:[{
                        id: "15245322",
                        text: "123123"
                    },
                    {
                        id: "61523422",
                        text: "123123"
                    },
                    {
                        id: "1344234232",
                        text: "123123"
                    }
                    ]
                },
                    {
                        id: "0519931423415",
                        required: true,
                        type: "radio",
                        question:"",
                        options:[{
                            id: "041512342",
                            text: "First answer"
                        },
                            {
                                id: "612341234234",
                                text: "Second answer"
                            },
                            {
                                id: "6614343525234",
                                text: "Third answer"
                            },]
                    },
                    {
                        id: "05112312323415",
                        required: true,
                        type: "select",
                        question:"",
                        options:[{
                            id: "041523422342",
                            text: "First answer"
                        },
                            {
                                id: "612324442234",
                                text: "Second answer"
                            },
                            {
                                id: "6614343525234",
                                text: "Third answer"
                            },]
                    }]
            })
        }
    }

    const [questions, setQuestions] = useState(formObject.questions)
    function handleFormSubmit(){
        //console.log(formObject)
        console.log(questions)
    }

    function handleNameChange(text){
        setFormObject(prev => ({
            ...prev,
            formName: text
        }))
    }
    function handleDescriptionChange(text){
        setFormObject(prev => ({
            ...prev,
            formDescription: text
        }))
    }

    function handleAcceptChange(status) {
        setFormObject(prev => ({
            ...prev,
            active: status
        }))
    }

    const handleAddQuestionBlock = (id) => {
        let buf = [...questions]
        let index = buf.findIndex(e => e.id === id)
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            required: false,
            type: "radio",
            question:"",
            options:[{
                id: uuidv4(),
                text: ""
            }]
        })
        setQuestions([...buf])
        // setFormObject(prev => ({
        //     ...prev,
        //     questions: [...buf]
        // }))
    }

    const handleDelete = (id) => {
        let buf = [...questions]
        let index = buf.findIndex(e => e.id === id)
        if(buf.length > 1){
            buf.splice(index, 1)
        }
        setQuestions([...buf])
        // setFormObject(prev => ({
        //     ...prev,
        //     questions: [...buf]
        // }))
    }

    const handleSelectChange = (id, value) => {
        let buf = [...questions]
        let index = buf.findIndex(e => e.id === id)
        buf[index].type = value
        setQuestions([...buf])
    }

    const handleQuestionChange = (id, text) => {
        let buf = [...questions]
        let index = buf.findIndex(e => e.id === id)
        buf[index].question = text
        setQuestions([...buf])
    }

    const handleRequiredToggle = (id, value) => {
        let buf = [...questions]
        let index = buf.findIndex(e => e.id === id)
        buf[index].required = value
        setQuestions([...buf])
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConstructorHeader onFormSubmit={handleFormSubmit}/>
            <Main>
                <ConstructorColumn>
                    <ConstructorNameBlock
                        formName={formObject.formName}
                        formDescription={formObject.formDescription}
                        handleNameChange={handleNameChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleAcceptChange={handleAcceptChange}
                    />
                    {
                        questions.map((q) => (
                            <ConstructorBlock
                                key={q.id}
                                question={q}
                                handleAdd={handleAddQuestionBlock}
                                handleDelete={handleDelete}
                                handleSelectChange={handleSelectChange}
                                handleQuestionChange={handleQuestionChange}
                                handleRequiredToggle={handleRequiredToggle}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default FormConstructor;