import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {v4 as uuidv4} from "uuid";
import Head from "next/head";
import ConstructorHeader from "@/components/reportConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import ConstructorColumn from "@/components/reportConstructorElements/constructorColumn";
import ConstructorNameBlock from "@/components/reportConstructorElements/constructorNameBlock";
import ConstructorBlock from "@/components/reportConstructorElements/constructorBlock";

const ReportConstructor = () => {
    const router = useRouter()
    const [selectedBlockId, setSelectedBlockId] = useState("head")
    const {repId} = router.query

    // const {mutateAsync} = useUpdateForm()

    // useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         router.push("/")
    //     },
    // })

    // const {error, data, isLoading} = useGetFormById({
    //     id: formId,
    // })

    const [reportObject, setReportObject] = useState({
        id: uuidv4(),
        blocks: [{
            id: uuidv4(),
            type: "oneLineText",
            name: ""
        }]
    })

    // useEffect(() => {
    //     if(data) {
    //         setFormObject(data.form)
    //     }
    // }, [data])

    // if (isLoading) return (<div>Loading...</div>)
    // if (error) return (<div>error</div>)

    async function handleReportSubmit() {
        // await mutateAsync({
        //     id: reportObject.id,
        //     description: reportObject.description,
        //     name: reportObject.name,
        //     active: reportObject.active,
        //     questions: reportObject.questions.map(e => ({
        //         type: e.type,
        //         required: e.required,
        //         question: e.question,
        //         options: e.options.map(e => (e.text)),
        //     })),
        // })
        console.log(reportObject)
        //router.push("/home")
    }

    const handleAddBlock = (id) => {
        let buf = [...reportObject.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            type: "radio",
            name:"",
        })
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleDelete = (id) => {
        let buf = [...reportObject.blocks]
        let index = buf.findIndex(e => e.id === id)
        if(buf.length > 1){
            buf.splice(index, 1)
        }
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleTypeChange = (id, value) => {
        let buf = [...reportObject.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf[index].type = value
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleBlockNameChange = (id, text) => {
        let buf = [...reportObject.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf[index].name = text
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    return (//(reportObject) &&
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ConstructorHeader id={reportObject.id} onReportSubmit={handleReportSubmit}/>

            <Main>
                <ConstructorColumn>
                    <ConstructorNameBlock
                        disabled={true}
                        setSelectedBlockId={setSelectedBlockId}
                    />
                    {
                        reportObject.blocks.map((q) => (
                            <ConstructorBlock
                                key={q.id}
                                block={q}
                                handleAdd={handleAddBlock}
                                handleDelete={handleDelete}
                                handleBlockTypeChange={handleTypeChange}
                                handleNameChange={handleBlockNameChange}
                                selectedBlockId={selectedBlockId}
                                setSelectedBlockId={setSelectedBlockId}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default ReportConstructor;